import { Text, Button, Box, InlineGrid, BlockStack } from "@shopify/polaris";
import type {
  EmbeddingModelConfig,
  VectorStoreConfig,
} from "~/types/core-types";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useMemo, useState } from "react";
import { ingestProducts } from "~/core/data-ingestion";

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
    // if we have the products data now and dataIngestionInProgress is true (i.e. the start data ingestion button was clicked)
    // and we have the vector store and embedding model configured (submit button is disabled otherwise)
    // then start the data ingestion process
    if (
      dataIngestionInProgress &&
      productsData &&
      props.vectorStoreConfig &&
      props.embeddingModelConfig
    ) {
      shopify.toast.show("Data ingestion started");
      ingestProducts({
        vectorStoreConfig: props.vectorStoreConfig,
        embeddingModelConfig: props.embeddingModelConfig,
        products: productsData,
      });
    }
  }, [
    dataIngestionInProgress,
    productsData,
    props.vectorStoreConfig,
    props.embeddingModelConfig,
    shopify,
  ]);

  const startDataIngestion = async () => {
    // hide model
    shopify.modal.hide(MODAL_ID);
    // disable start data ingestion button and show loading spinner
    setDataIngestionInProgress(true);
    // load products data from shopify
    props.loadProducts();
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
      <Box>
        <Button
          variant="primary"
          tone="success"
          size="large"
          onClick={() => shopify.modal.show(MODAL_ID)}
          loading={dataIngestionInProgress}
          disabled={
            props.vectorStoreConfig === undefined ||
            props.embeddingModelConfig === undefined
          }
        >
          Start Data Ingestion
        </Button>
        {dataIngestionInProgress && !productsData ? (
          <Box paddingBlockStart="400">
            <Text as="p" variant="bodyMd">
              Waiting for products data to be loaded...
            </Text>
          </Box>
        ) : dataIngestionInProgress && productsData ? (
          <Box paddingBlockStart="400">
            <Text as="p" variant="bodySm" tone="subdued">
              Data ingestion in progress. This may take some time.
            </Text>
          </Box>
        ) : null}
        {props.vectorStoreConfig === undefined ||
        props.embeddingModelConfig === undefined ? (
          <Box paddingBlockStart="400">
            <Text as="p" variant="bodyMd" tone="critical">
              Please configure the vector store and embedding model before
              starting data ingestion.
            </Text>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
