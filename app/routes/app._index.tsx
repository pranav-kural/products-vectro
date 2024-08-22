import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Box,
  Button,
  Link,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function Index() {
  return (
    <Page>
      <TitleBar title="Products Vectro"></TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <Text as="h1" variant="heading2xl">
                  Products Vectro
                </Text>

                <Text as="p" variant="bodyMd">
                  Shopify app enabling merchants to load products data into a
                  vector database.
                </Text>

                <Text as="h3" variant="headingLg">
                  <strong>Features:</strong>
                </Text>

                <List gap="loose">
                  <List.Item>
                    <strong>Full Data Ingestion Cycle</strong>. Handles full
                    data ingestion pipeline from collecting data from GraphQL
                    Admin API, pre-processing data, and generating embeddings to
                    storing embedding vectors in vector database.
                  </List.Item>
                  <List.Item>
                    <strong>Vector Store Providers</strong>. Supports multiple
                    high-performance vector store providers like Pinecone,
                    AstraDB, and Elasticsearch out of the box, giving you the
                    flexibility to choose the best provider for your use case.
                  </List.Item>
                  <List.Item>
                    <strong>Embedding Model Providers</strong>. Supports
                    multiple state-of-the-art embedding model providers like
                    OpenAI, Google Generative AI, and Hugging Face out of the
                    box, giving you the flexibility to choose the best provider
                    for your use case.
                  </List.Item>
                </List>

                <Box>
                  <Link url="/app/ingestion">
                    <Button variant="primary" size="large">
                      Get Started
                    </Button>
                  </Link>
                </Box>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
