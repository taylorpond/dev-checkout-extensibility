import React, { useEffect, useState } from "react";
import CustomBanner from "./banner.jsx";
import ProductRecs from "./productRecs.jsx";
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
  useSettings,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const {title, description, banner_title} = useSettings();
  return(
    <BlockStack>
      <CustomBanner title={title} description={description}/>
      <ProductRecs />
    </BlockStack>
  )
}
