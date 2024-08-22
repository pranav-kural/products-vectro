import { Box, Form, FormLayout, Select } from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";
import { PineconeConfigForm } from "./config-forms/pinecone-config-form";
import { AstraConfigForm } from "./config-forms/astra-config-form";
import { ElasticsearchConfigForm } from "./config-forms/elasticsearch-config-form";

export type VectorStoreCredentialsFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function VectorStoreCredentialsForm(
  props: VectorStoreCredentialsFormProps,
) {
  // Set or load initial/default value from a database if needed
  // Useful if saving configurations remotely
  const INITIAL_PROVIDER: VectorStoreProvider | undefined =
    VectorStoreProvider.Datastax;

  const [provider, setProvider] = useState<VectorStoreProvider | undefined>(
    INITIAL_PROVIDER,
  );

  const handleSelectChange = useCallback((value: string) => {
    setProvider(value as VectorStoreProvider);
  }, []);

  return (
    <Box>
      <Form onSubmit={() => {}}>
        <FormLayout>
          <FormLayout.Group>
            <Select
              label="Provider"
              options={Object.values(VectorStoreProvider)}
              value={provider}
              placeholder="Select vector store provider"
              onChange={handleSelectChange}
              requiredIndicator
            />
          </FormLayout.Group>
        </FormLayout>
      </Form>
      <Box paddingBlockStart="400">
        {provider === VectorStoreProvider.Pinecone && (
          <PineconeConfigForm
            setVectorStoreConfig={props.setVectorStoreConfig}
          />
        )}

        {provider === VectorStoreProvider.Datastax && (
          <AstraConfigForm setVectorStoreConfig={props.setVectorStoreConfig} />
        )}

        {provider === VectorStoreProvider.Elasticsearch && (
          <ElasticsearchConfigForm
            setVectorStoreConfig={props.setVectorStoreConfig}
          />
        )}
      </Box>
    </Box>
  );
}
