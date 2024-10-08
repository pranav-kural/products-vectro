import { Card, Layout, Link, List, Text, BlockStack } from "@shopify/polaris";
import { VectorStoreCredentialsForm } from "./vector-store-setup-form";
import type { VectorStoreConfig } from "~/types/core-types";

export type SetupVectorStoreProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
  initialVectorStoreConfig?: VectorStoreConfig;
};

export const SetupVectorStore = (props: SetupVectorStoreProps) => {
  return (
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="300">
            <Text variant="headingXl" as="h4">
              Setup Vector Store
            </Text>
            <Text as="p" variant="bodyMd">
              Below you can configure the vector store where you want to load
              the products data. Select the vector store provider, and provide
              the URL of the hosted vector store index/collection you want to
              use, and the required credentials to access it.
            </Text>
            <VectorStoreCredentialsForm
              setVectorStoreConfig={props.setVectorStoreConfig}
            />
          </BlockStack>
        </Card>
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Recommended Vector Store Providers
            </Text>
            <List>
              <List.Item>
                <Link
                  url="https://www.datastax.com/products/datastax-astra"
                  target="_blank"
                  removeUnderline
                >
                  Datastax (AstraDB)
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  url="https://www.elastic.co/elasticsearch"
                  target="_blank"
                  removeUnderline
                >
                  Elastcic (Elasticsearch)
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  url="https://www.pinecone.io/"
                  target="_blank"
                  removeUnderline
                >
                  Pinecone
                </Link>
              </List.Item>
            </List>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  );
};
