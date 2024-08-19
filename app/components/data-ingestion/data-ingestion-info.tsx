import { List, Text, BlockStack } from "@shopify/polaris";

export const DataIngestionInfo = () => {
  return (
    <BlockStack gap="200">
      <Text as="p" variant="bodyMd">
        The data ingestion process involves the following steps:
      </Text>
      <Text as="p" variant="bodyMd">
        <List type="number">
          <List.Item>
            <Text as="span" fontWeight="bold">
              Data Collection:
            </Text>{" "}
            Gather the products data that needs to be ingested into the vector
            store.
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Data Chunking:
            </Text>{" "}
            Chunk the data into smaller parts. This is important for two
            reasons: (1) it makes it easier to index data, and (2) it makes it
            easier to query data.
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Embedding Generation:
            </Text>{" "}
            Generate embeddings for each chunk of data. An embedding model
            converts text data into a numerical representation, and the distance
            between these numerical representations is used to determine the
            similarity between two pieces of text.
          </List.Item>
          <List.Item>
            <Text as="span" fontWeight="bold">
              Storage:
            </Text>{" "}
            The generate vector embeddings are then stored in an efficient
            vector store.
          </List.Item>
        </List>
      </Text>
    </BlockStack>
  );
};
