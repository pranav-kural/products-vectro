import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";

export type PineconeConfigFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function PineconeConfigForm(props: PineconeConfigFormProps) {
  // Set or load initial/default values from a database if needed
  // Useful if saving configurations remotely

  // Pinecone default configs
  const INITIAL_API_KEY = "";
  const INITIAL_INDEX_NAME = "";

  // Pinecone configs
  const [apiKey, setApiKey] = useState(INITIAL_API_KEY);
  const [apiKeyError, setApiKeyError] = useState(INITIAL_API_KEY);

  const [indexName, setIndexName] = useState(INITIAL_INDEX_NAME);
  const [indexNameError, setIndexNameError] = useState("");

  // Control submission
  const [enableSubmit, setEnableSubmit] = useState(false);

  useMemo(() => {
    // check if values have changed from initial values
    // and that string values for required fields are not empty
    // Pinecone configs
    const isApiKeyChanged = apiKey !== INITIAL_API_KEY && apiKey !== "";
    const isIndexNameChanged =
      indexName !== INITIAL_INDEX_NAME && indexName !== "";

    // Enable submit button if provider is valid and a required field has been changed
    setEnableSubmit(isApiKeyChanged || isIndexNameChanged);
  }, [apiKey, indexName, INITIAL_API_KEY, INITIAL_INDEX_NAME]);

  const handleSubmit = useCallback(() => {
    // Validate form
    if (!apiKey) {
      setApiKeyError("API Key is required.");
      return;
    } else {
      setApiKeyError("");
    }

    if (!indexName) {
      setIndexNameError("Index Name is required.");
      return;
    } else {
      setIndexNameError("");
    }

    // If form is valid, set the vector store config
    props.setVectorStoreConfig({
      provider: VectorStoreProvider.Pinecone,
      apiKey: apiKey,
      indexName: indexName,
    });
  }, [apiKey, indexName, props]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            value={indexName}
            error={indexNameError}
            type="text"
            label="URL"
            onChange={setIndexName}
            autoComplete="off"
            requiredIndicator
            helpText="Name of the index in the Pinecone vector store"
          />
          <TextField
            value={apiKey}
            error={apiKeyError}
            type="password"
            label="API Key"
            onChange={setApiKey}
            autoComplete="off"
            requiredIndicator
            helpText="API key for accessing the Pinecone vector store"
          />
        </FormLayout.Group>
        <Button submit disabled={!enableSubmit}>
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
