import { useFetcher } from "@remix-run/react";
import { Page, Button, BlockStack, InlineStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import type {
  EmbeddingModelConfig,
  EmbeddingModelName,
  EmbeddingModelProvider,
  VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";
import { SetupVectorStore } from "~/components/vector-stores/setup-vector-store";
import { StartDataIngestion } from "~/components/data-ingestion/start-data-ingestion";
import { HowItWorks } from "~/components/data-ingestion/how-it-works";
import { SetupEmbeddingModel } from "~/components/embedding-model/setup-embedding-model";
import { getProductsAction } from "~/core/shopify-api.server";

export const action = getProductsAction;

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const loadProducts = () => fetcher.submit({}, { method: "POST" });

  // pull initial data from database for the user
  const INITIAL_PROVIDER: VectorStoreProvider | undefined = undefined;
  const INITIAL_URL = "";
  const INITIAL_API_KEY = "";

  const INITIAL_MODEL_PROVIDER: EmbeddingModelProvider | undefined = undefined;
  const INITIAL_MODEL_NAME: EmbeddingModelName | undefined = undefined;
  const INITIAL_MODEL_API_KEY = "";

  // default vector store config
  const INITIAL_VECTOR_STORE_CONFIG: VectorStoreConfig | undefined =
    INITIAL_PROVIDER
      ? {
          provider: INITIAL_PROVIDER,
          url: INITIAL_URL,
          apiKey: INITIAL_API_KEY,
        }
      : undefined;

  // default embedding model config
  const INITIAL_EMBEDDING_MODEL_CONFIG: EmbeddingModelConfig | undefined =
    INITIAL_MODEL_PROVIDER && INITIAL_MODEL_NAME
      ? {
          provider: INITIAL_MODEL_PROVIDER,
          modelName: INITIAL_MODEL_NAME,
          apiKey: INITIAL_MODEL_API_KEY,
        }
      : undefined;

  const [vectorStoreConfig, setVectorStoreConfig] = useState<
    VectorStoreConfig | undefined
  >(INITIAL_VECTOR_STORE_CONFIG);

  const [embeddingModelConfig, setEmbeddingModelConfig] = useState<
    EmbeddingModelConfig | undefined
  >(INITIAL_EMBEDDING_MODEL_CONFIG);

  return (
    <Page>
      <TitleBar title="Data Ingestion" />
      <BlockStack gap="500">
        <HowItWorks />
        <SetupVectorStore
          setVectorStoreConfig={setVectorStoreConfig}
          initialVectorStoreConfig={INITIAL_VECTOR_STORE_CONFIG}
        />
        <SetupEmbeddingModel
          setEmbeddingModelConfig={setEmbeddingModelConfig}
          initialEmbeddingModelConfig={INITIAL_EMBEDDING_MODEL_CONFIG}
        />
        <StartDataIngestion
          loadProducts={loadProducts}
          productsFetcher={fetcher}
          vectorStoreConfig={vectorStoreConfig}
          embeddingModelConfig={embeddingModelConfig}
        />
      </BlockStack>
      <BlockStack gap="500">
        <InlineStack gap="300">
          <Button loading={isLoading} onClick={loadProducts}>
            Load products
          </Button>
        </InlineStack>
      </BlockStack>
    </Page>
  );
}
