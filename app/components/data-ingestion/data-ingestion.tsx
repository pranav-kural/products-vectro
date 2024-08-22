import { Card, Layout, Link, List, Text, BlockStack } from "@shopify/polaris";
import type {
  EmbeddingModelConfig,
  VectorStoreConfig,
} from "~/types/core-types";
import { StartDataIngestion } from "./start-data-ingestion";

export type DataIngestionProps = {
  loadProducts: () => void;
  productsFetcher: any;
  vectorStoreConfig?: VectorStoreConfig;
  embeddingModelConfig?: EmbeddingModelConfig;
};

export const DataIngestion = (props: DataIngestionProps) => {
  return (
    <>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingXl" as="h4">
                Start Data Ingestion
              </Text>
              <Text as="p" variant="bodyMd">
                Below you can configure the vector store where you want to load
                the products data. Select the vector store provider, and provide
                the URL of the hosted vector store index/collection you want to
                use, and the required credentials to access it.
              </Text>
              <StartDataIngestion
                loadProducts={props.loadProducts}
                productsFetcher={props.productsFetcher}
                vectorStoreConfig={props.vectorStoreConfig}
                embeddingModelConfig={props.embeddingModelConfig}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                More Info
              </Text>
              <Text as="p" variant="bodyMd">
                Refer to the below links to learn more about how data is handled
                when using a vector store or database.
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://www.pinecone.io/learn/vector-embeddings/"
                    accessibilityLabel="Article on What are Vector Embeddings"
                    target="_blank"
                    removeUnderline
                  >
                    What are Vector Embeddings
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://www.pinecone.io/learn/vector-similarity/"
                    accessibilityLabel="Article on Vector Similarity Explained"
                    target="_blank"
                    removeUnderline
                  >
                    Vector Similarity Explained
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://www.pinecone.io/learn/vector-database"
                    accessibilityLabel="Article on What is a Vector Database & How Does it Work?"
                    target="_blank"
                    removeUnderline
                  >
                    What is a Vector Database & How Does it Work?
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </>
  );
};
