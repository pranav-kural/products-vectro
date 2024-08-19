import { BlockStack, Card, Layout, Link, List, Text } from "@shopify/polaris";
import { DataIngestionInfo } from "./data-ingestion-info";

export const HowItWorks = () => {
  return (
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="300">
            <Text variant="headingXl" as="h4">
              How it works
            </Text>
            <DataIngestionInfo />
          </BlockStack>
        </Card>
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <Card>
          <BlockStack gap="200">
            Refer to the below links to learn more about how data is handled
            when using a vector store or database.
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
  );
};
