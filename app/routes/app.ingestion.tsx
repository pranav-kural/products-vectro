import { useFetcher } from "@remix-run/react";
import { Page, Button, BlockStack, InlineStack } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import type {
  EmbeddingModelConfig,
  VectorStoreConfig,
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
