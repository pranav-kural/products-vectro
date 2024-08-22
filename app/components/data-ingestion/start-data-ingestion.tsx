import {
  Card,
  Layout,
  Link,
  List,
  Text,
  BlockStack,
  Button,
  Box,
  InlineGrid,
} from "@shopify/polaris";
import type {
  EmbeddingModelConfig,
  VectorStoreConfig,
} from "~/types/core-types";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useMemo, useState } from "react";

export type StartDataIngestionProps = {
  loadProducts: () => void;
  productsFetcher: any;
  vectorStoreConfig?: VectorStoreConfig;
  embeddingModelConfig?: EmbeddingModelConfig;
};

export const StartDataIngestion = (props: StartDataIngestionProps) => {
  const shopify = useAppBridge();
  const MODAL_ID = "start-data-ingestion-modal";
  const productsData = props.productsFetcher.data;

  const [dataIngestionInProgress, setDataIngestionInProgress] = useState(false);

  useMemo(() => {
    if (productsData) {
      shopify.toast.show("Products loaded successfully");
    }
  }, [productsData, shopify]);

  const startDataIngestion = async () => {
    // hide model
    shopify.modal.hide(MODAL_ID);
    // disable start data ingestion button and show loading spinner
    setDataIngestionInProgress(true);
    // load products data from shopify
    props.loadProducts();
    // load data into Document objects

    // chunking the data into smaller parts
    // setup vector store with embedding model
    // add data to vector store - will generate and store embeddings
  };
  return (
    <>
      <Modal id={MODAL_ID} variant="base">
        <TitleBar title="Are you sure you want to start data ingestion?"></TitleBar>
        <Box padding="400">
          <BlockStack gap="200">
            <Text as="p">
              This action will start the data ingestion process. Are you sure
              you want to proceed?
            </Text>
            <Text as="p">
              This process may take some time to complete as it involves
              preprocessing the data, generating embeddings, and storing them in
              the vector store.
            </Text>
            <Text as="p">
              Please note that this action cannot be undone or cancelled.
              Generation of embeddings and storage in vector store will likely
              incur charges, please consider these before proceeding.
            </Text>
          </BlockStack>
        </Box>
        <Box paddingInline="400" paddingBlockEnd="400">
          <InlineGrid columns={2} gap="1000">
            <Button
              variant="primary"
              tone="success"
              size="large"
              onClick={() => startDataIngestion()}
            >
              Start Data Ingestion
            </Button>
            <Button
              variant="primary"
              tone="critical"
              size="large"
              onClick={() => shopify.modal.hide(MODAL_ID)}
            >
              Cancel
            </Button>
          </InlineGrid>
        </Box>
      </Modal>
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
              <Box>
                <Button
                  variant="primary"
                  tone="success"
                  size="large"
                  onClick={() => shopify.modal.show(MODAL_ID)}
                  loading={dataIngestionInProgress}
                >
                  Start Data Ingestion
                </Button>
                {dataIngestionInProgress && (
                  <Box paddingBlockStart="400">
                    <Text as="p" variant="bodySm" tone="subdued">
                      Data ingestion in progress. This may take some time.
                    </Text>
                  </Box>
                )}
              </Box>
              <Box>
                {props.productsFetcher.data && (
                  <Text as="p" variant="bodyMd">
                    Product generated:{" "}
                    {JSON.stringify(props.productsFetcher.data)}
                  </Text>
                )}
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Data Ingestion Steps
              </Text>
              <Text as="p" variant="bodyMd">
                <List>
                  <List.Item>
                    <Text as="span" fontWeight="bold">
                      1. Data Collection:
                    </Text>{" "}
                    Collected data from source and store it locally.
                  </List.Item>
                  <List.Item>
                    <Text as="span" fontWeight="bold">
                      2. Data Loading:
                    </Text>{" "}
                    Load file, or multiple files, into Document objects.
                  </List.Item>
                  <List.Item>
                    <Text as="span" fontWeight="bold">
                      3. Data Chunking:
                    </Text>{" "}
                    Chunking the data into smaller parts.
                  </List.Item>
                  <List.Item>
                    <Text as="span" fontWeight="bold">
                      4. Embedding Generation:
                    </Text>{" "}
                    Generate embeddings for each chunk of data.
                  </List.Item>
                  <List.Item>
                    <Text as="span" fontWeight="bold">
                      5. Storage:
                    </Text>{" "}
                    Store the generated vector embeddings in a vector store.
                  </List.Item>
                </List>
              </Text>
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
    </>
  );
};
