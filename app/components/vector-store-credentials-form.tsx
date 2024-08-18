import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { useCallback, useState } from "react";
import type { VectorStoreCredentials } from "~/types/vector-store";

export type VectorStoreCredentialsFormProps = {
  setVectorStoreCredentials: (credentials: VectorStoreCredentials) => void;
};

export function VectorStoreCredentialsForm(
  props: VectorStoreCredentialsFormProps,
) {
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [urlError, setUrlError] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");

  const handleSubmit = useCallback(() => {
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

    props.setVectorStoreCredentials({
      url,
      apiKey,
    });
  }, [url, apiKey, props]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <FormLayout.Group>
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
        <Button submit>Save</Button>
      </FormLayout>
    </Form>
  );
}
