import { Box, Select } from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";
import { PineconeConfigForm } from "./config-forms/pinecone-config-form";
import { AstraConfigForm } from "./config-forms/astra-config-form";

export type VectorStoreCredentialsFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function VectorStoreCredentialsForm(
  props: VectorStoreCredentialsFormProps,
) {
  // Set or load initial/default value from a database if needed
  // Useful if saving configurations remotely
  const INITIAL_PROVIDER = undefined;

  const [provider, setProvider] = useState<VectorStoreProvider | undefined>(
    INITIAL_PROVIDER,
  );

  const handleSelectChange = useCallback(
    (value: string) => {
      setProvider(value as VectorStoreProvider);
    },
    [setProvider],
  );

  return (
    <Box>
      <Select
        label="Provider"
        options={Object.values(VectorStoreProvider)}
        value={provider}
        placeholder="Select vector store provider"
        onChange={handleSelectChange}
        requiredIndicator
      />

      {provider === VectorStoreProvider.Pinecone && (
        <PineconeConfigForm setVectorStoreConfig={props.setVectorStoreConfig} />
      )}

      {provider === VectorStoreProvider.Astra && (
        <AstraConfigForm setVectorStoreConfig={props.setVectorStoreConfig} />
      )}
    </Box>
  );
}
