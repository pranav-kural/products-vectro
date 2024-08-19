import { Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { useCallback, useState } from "react";
import {
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";

export type VectorStoreCredentialsFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
  initialVectorStoreConfig?: VectorStoreConfig;
};

export function VectorStoreCredentialsForm(
  props: VectorStoreCredentialsFormProps,
) {
  const INITIAL_PROVIDER =
    props.initialVectorStoreConfig?.provider || undefined;
  const INITIAL_URL = props.initialVectorStoreConfig?.url || "";
  const INITIAL_API_KEY = props.initialVectorStoreConfig?.apiKey || "";

  const [provider, setProvider] = useState<VectorStoreProvider | undefined>(
    INITIAL_PROVIDER,
  );
  const [providerError, setProviderError] = useState("");

  const [url, setUrl] = useState(INITIAL_URL);
  const [urlError, setUrlError] = useState("");

  const [apiKey, setApiKey] = useState(INITIAL_API_KEY);
  const [apiKeyError, setApiKeyError] = useState("");

  const handleSelectChange = useCallback((value: string) => {
    setProvider(value as VectorStoreProvider);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!provider) {
      setProviderError("Provider is required.");
      return;
    }

    if (!url) {
      setUrlError("URL is required.");
      return;
    } else {
      setUrlError("");
    }

    if (!apiKey) {
      setApiKeyError("API Key is required.");
      return;
    } else {
      setApiKeyError("");
    }

    props.setVectorStoreConfig({
      provider,
      url,
      apiKey,
    });
  }, [url, apiKey, provider, props]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <FormLayout.Group>
          <Select
            label="Provider"
            options={Object.values(VectorStoreProvider)}
            value={provider}
            placeholder="Select vector store provider"
            onChange={handleSelectChange}
            requiredIndicator
            error={providerError}
          />
          <TextField
            value={url}
            error={urlError}
            type="text"
            label="URL"
            onChange={setUrl}
            autoComplete="off"
            requiredIndicator
            helpText="URL of the hosted vector store instance."
          />
          <TextField
            value={apiKey}
            error={apiKeyError}
            type="password"
            label="API Key"
            onChange={setApiKey}
            autoComplete="off"
            requiredIndicator
            helpText="The API key for accessing the vector store."
          />
        </FormLayout.Group>
        <Button
          submit
          disabled={
            (provider === INITIAL_PROVIDER &&
              url === INITIAL_URL &&
              apiKey === INITIAL_API_KEY) ||
            !provider ||
            !url ||
            !apiKey
          }
        >
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
