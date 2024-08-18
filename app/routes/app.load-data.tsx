import {
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { VectorStoreCredentialsForm } from "~/components/vector-store-credentials-form";
import { useState } from "react";
import type { VectorStoreCredentials } from "~/types/vector-store";

export default function LoadDataPage() {
  const [vectorStoreCredentials, setVectorStoreCredentials] = useState<
    VectorStoreCredentials | undefined
  >();

  return (
    <Page>
      <TitleBar title="Load Data page" />
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
                setVectorStoreCredentials={setVectorStoreCredentials}
              />

              {vectorStoreCredentials && (
                <Text as="p" variant="bodyMd">
                  Credentials submitted:{" "}
                  {JSON.stringify(vectorStoreCredentials)}
                </Text>
              )}
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
                    url="https://zilliz.com/"
                    target="_blank"
                    removeUnderline
                  >
                    Zilliz Milvus
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
    </Page>
  );
}
