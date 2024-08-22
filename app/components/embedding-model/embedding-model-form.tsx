import { Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  type EmbeddingModelConfig,
  type EmbeddingModelName,
  EmbeddingModelProvider,
  GoogleEmbeddingModelName,
  HuggingFaceEmbeddingModelName,
  OpenAIEmbeddingModelName,
} from "~/types/core-types";

export type EmbeddingModelConfigFormProps = {
  setEmbeddingModelConfig: (config: EmbeddingModelConfig) => void;
  initialEmbeddingModelConfig?: EmbeddingModelConfig;
};

export function EmbeddingModelConfigForm(props: EmbeddingModelConfigFormProps) {
  const INITIAL_PROVIDER =
    props.initialEmbeddingModelConfig?.provider || undefined;
  const INITIAL_MODEL_NAME =
    props.initialEmbeddingModelConfig?.modelName || undefined;
  const INITIAL_API_KEY = props.initialEmbeddingModelConfig?.provider || "";

  const [provider, setProvider] = useState<EmbeddingModelProvider | undefined>(
    INITIAL_PROVIDER,
  );
  const [providerError, setProviderError] = useState("");

  const [modelName, setModelName] = useState<EmbeddingModelName | undefined>(
    INITIAL_MODEL_NAME,
  );
  const [modelError, setModelError] = useState("");

  const [apiKey, setApiKey] = useState(INITIAL_API_KEY);
  const [apiKeyError, setApiKeyError] = useState("");

  const [enableSubmit, setEnableSubmit] = useState(false);

  useMemo(() => {
    const areRequiredFieldsFilled =
      provider !== undefined && modelName !== undefined && apiKey !== "";

    const isAnyFieldChanged =
      provider !== INITIAL_PROVIDER ||
      modelName !== INITIAL_MODEL_NAME ||
      apiKey !== INITIAL_API_KEY;

    setEnableSubmit(isAnyFieldChanged && areRequiredFieldsFilled);
  }, [
    provider,
    modelName,
    apiKey,
    INITIAL_PROVIDER,
    INITIAL_MODEL_NAME,
    INITIAL_API_KEY,
  ]);

  const getEmbeddingModelNameOptions = useCallback(() => {
    switch (provider) {
      case EmbeddingModelProvider.Google:
        return Object.values(GoogleEmbeddingModelName);
      case EmbeddingModelProvider.OpenAI:
        return Object.values(OpenAIEmbeddingModelName);
      case EmbeddingModelProvider.HuggingFace:
        return Object.values(HuggingFaceEmbeddingModelName);
      default:
        return [];
    }
  }, [provider]);

  const handleSelectChange = useCallback((value: string) => {
    setProvider(value as EmbeddingModelProvider);
  }, []);

  const handleModelChange = useCallback((value: string) => {
    setModelName(value as EmbeddingModelName);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!provider) {
      setProviderError("Provider is required.");
      return;
    }

    if (!modelName) {
      setModelError("Model name is required.");
      return;
    } else {
      setModelError("");
    }

    if (!apiKey) {
      setApiKeyError("API Key is required.");
      return;
    } else {
      setApiKeyError("");
    }

    props.setEmbeddingModelConfig({
      provider,
      modelName,
      apiKey,
    });

    // show toast
    shopify.toast.show("Success! Embedding model configurations saved");

    // disable submit button
    setEnableSubmit(false);
  }, [modelName, apiKey, provider, props]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <FormLayout.Group>
          <Select
            label="Provider"
            options={Object.values(EmbeddingModelProvider)}
            value={provider}
            placeholder="Select vector store provider"
            onChange={handleSelectChange}
            requiredIndicator
            error={providerError}
            helpText="Provider of the embedding model."
          />
          <Select
            label="Embedding Model"
            options={getEmbeddingModelNameOptions()}
            value={modelName}
            placeholder="Select embedding model"
            onChange={handleModelChange}
            requiredIndicator
            error={modelError}
            helpText="Embedding model to use for generating embeddings."
          />
          <TextField
            value={apiKey}
            error={apiKeyError}
            type="password"
            label="API Key"
            onChange={setApiKey}
            autoComplete="off"
            requiredIndicator
            helpText="The API key for accessing the embedding model."
          />
        </FormLayout.Group>
        <Button submit disabled={!enableSubmit}>
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
