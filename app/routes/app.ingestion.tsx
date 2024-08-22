import { useFetcher } from "@remix-run/react";
import { Page, BlockStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import type {
  EmbeddingModelConfig,
  VectorStoreConfig,
} from "~/types/core-types";
import { SetupVectorStore } from "~/components/vector-stores/setup-vector-store";
import { HowItWorks } from "~/components/data-ingestion/how-it-works";
import { SetupEmbeddingModel } from "~/components/embedding-model/setup-embedding-model";
import { getProductsAction } from "~/core/shopify-api.server";
import { DataIngestion } from "~/components/data-ingestion/data-ingestion";

export const action = getProductsAction;

export default function Index() {
  const fetcher = useFetcher<typeof action>();

  const loadProducts = () => fetcher.submit({}, { method: "POST" });

  const [vectorStoreConfig, setVectorStoreConfig] = useState<
    VectorStoreConfig | undefined
  >(undefined);

  const [embeddingModelConfig, setEmbeddingModelConfig] = useState<
    EmbeddingModelConfig | undefined
  >(undefined);

  return (
    <Page>
      <TitleBar title="Data Ingestion" />
      <BlockStack gap="500">
        <HowItWorks />
        <SetupVectorStore setVectorStoreConfig={setVectorStoreConfig} />
        <SetupEmbeddingModel
          setEmbeddingModelConfig={setEmbeddingModelConfig}
        />
        <DataIngestion
          loadProducts={loadProducts}
          productsFetcher={fetcher}
          vectorStoreConfig={vectorStoreConfig}
          embeddingModelConfig={embeddingModelConfig}
        />
      </BlockStack>
    </Page>
  );
}
