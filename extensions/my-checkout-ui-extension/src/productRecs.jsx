import React, { useEffect, useState } from "react";
import {
    render,
    Divider,
    Image,
    Banner,
    Heading,
    Button,
    InlineLayout,
    BlockStack,
    Text,
    SkeletonText,
    SkeletonImage,
    useCartLines,
    useApplyCartLinesChange,
    useExtensionApi,
  } from "@shopify/checkout-ui-extensions-react";

const ProductRecs = () => {
// Use `query` for fetching product data from the Storefront API, and use `i18n` to format
  // currencies, numbers, and translate strings
  const { query, i18n } = useExtensionApi();
  // Get a reference to the function that will apply changes to the cart lines from the imported hook
  const applyCartLinesChange = useApplyCartLinesChange();
  // Set up the states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);
  const {shop} = useExtensionApi();
  // On initial load, fetch the product variants
  useEffect(() => {
    // Set the loading state to show some UI if you're waiting
    setLoading(true);
    // Use `query` api method to send graphql queries to the Storefront API
    query(
      `query ($first: Int!) {
        products(first: $first, query: "tag:GWP") {
          nodes {
            id
            title
            images(first:1){
              nodes {
                url
              }
            }
            variants(first: 1) {
              nodes {
                id
                price {
                  amount
                }
              }
            }
          }
        }
      }`,
      {
        variables: {first: 5},
      },
    )
    .then(({data}) => {
      // Set the `products` array so that you can reference the array items
      setProducts(data.products.nodes);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  // If an offer is added and an error occurs, then show some error feedback using a banner
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  // Access the current cart lines and subscribe to changes
  const lines = useCartLines();

  // Show a loading UI if you're waiting for product variant data
  // Use Skeleton components to keep placement from shifting when content loads
  if (loading) {
    return (
      <BlockStack spacing="loose">
        <Divider />
        <Heading level={2}>You might also like</Heading>
        <Text>{shop.collection}</Text>
        <BlockStack spacing="loose">
          <InlineLayout
            spacing="base"
            columns={[64, "fill", "auto"]}
            blockAlignment="center"
          >
            <SkeletonImage aspectRatio={1} />
            <BlockStack spacing="none">
              <SkeletonText inlineSize="large" />
              <SkeletonText inlineSize="small" />
          
            </BlockStack>
            <Button kind="secondary" disabled={true}>
              Add
            </Button>
          </InlineLayout>
        </BlockStack>
      </BlockStack>
    );
  }
  // If product variants can't be loaded, then show nothing
  if (!loading && products.length === 0) {
    return null;
  }

  // Get the IDs of all product variants in the cart
  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);
  // Filter out any products on offer that are already in the cart
  const productsOnOffer = products.filter(
    (product) => {
      const isProductVariantInCart = product.variants.nodes.some(
        ({id}) => cartLineProductVariantIds.includes(id)
      );
      return !isProductVariantInCart;
    }
  );

  // If all of the products are in the cart, then don't show the offer
  if (!productsOnOffer.length) {
    return null;
  }

  // So you have to create a whole new function for the product rendering logic
  const renderProduct = (product) => {
    const { images, title, variants } = product;
    const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount);
    const imageUrl = images.nodes[0]?.url ?? "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";

    return (
      <InlineLayout
        spacing="base"
        columns={[64, "fill", "auto"]}
        blockAlignment="center"
      >
        <Image
          border="base"
          borderWidth="base"
          borderRadius="loose"
          source={imageUrl}
          description={title}
          aspectRatio={1}
        />
        <BlockStack spacing="none">
          <Text size="medium" emphasis="strong">
            {title}
          </Text>
          <Text appearance="subdued">{renderPrice}</Text>
        </BlockStack>
        <Button
          kind="secondary"
          loading={adding}
          accessibilityLabel={`Add ${title} to cart`}
          onPress={async () => {
            setAdding(true);
            const result = await applyCartLinesChange({
              type: "addCartLine",
              merchandiseId: variants.nodes[0].id,
              quantity: 1,
            });
            setAdding(false);
            if (result.type === "error") {
              setShowError(true);
              console.error(result.message);
            }
          }}
        >
          Add
        </Button>
      </InlineLayout>
    );
  };

 return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>You might also like</Heading>
      <BlockStack spacing="loose">
        {/* 0 is the start of the index when looking at the slice() */}
        {productsOnOffer.slice(0, 3).map((product) => (
          <React.Fragment key={product.id}>{renderProduct(product)}</React.Fragment>
        ))}
      </BlockStack>
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}

export default ProductRecs