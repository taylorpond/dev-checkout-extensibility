import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import PrePurchase from "../components/PrePurchase";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";

export default function HomePage() {
  return (
    <Page >
      <TitleBar title="TP Checkout Extensibility" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <PrePurchase />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
