import { Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  type AstraDBMetric,
  AstraDBMetricOptions,
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";

export type VectorStoreCredentialsFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function VectorStoreCredentialsForm(
  props: VectorStoreCredentialsFormProps,
) {
  // Set or load initial/default values from a database if needed
  // Useful if saving configurations remotely
  const INITIAL_PROVIDER = undefined;

  // Pinecone default configs
  const INITIAL_API_KEY = "";
  const INITIAL_INDEX_NAME = "";

  // Astra default configs
  const INITIAL_TOKEN = "";
  const INITIAL_ENDPOINT = "";
  const INITIAL_COLLECTION = "";
  const INITIAL_DIMENSIONS = "";
  const INITIAL_METRIC: AstraDBMetric = "cosine";

  const [provider, setProvider] = useState<VectorStoreProvider | undefined>(
    INITIAL_PROVIDER,
  );
  const [providerError, setProviderError] = useState("");

  // Pinecone configs
  const [apiKey, setApiKey] = useState(INITIAL_API_KEY);
  const [apiKeyError, setApiKeyError] = useState(INITIAL_API_KEY);

  const [indexName, setIndexName] = useState(INITIAL_INDEX_NAME);
  const [indexNameError, setIndexNameError] = useState("");

  // Astra configs
  const [token, setToken] = useState(INITIAL_TOKEN);
  const [tokenError, setTokenError] = useState("");

  const [endpoint, setEndpoint] = useState(INITIAL_ENDPOINT);
  const [endpointError, setEndpointError] = useState("");

  const [collection, setCollection] = useState(INITIAL_COLLECTION);
  const [collectionError, setCollectionError] = useState("");

  const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);
  const [dimensionsError, setDimensionsError] = useState("");

  const [metric, setMetric] = useState<AstraDBMetric>(INITIAL_METRIC);
  const [metricError, setMetricError] = useState("");

  // Control submission
  const [enableSubmit, setEnableSubmit] = useState(false);

  useMemo(() => {
    // check if values have changed from initial values
    // and that string values for required fields are not empty
    const isProviderValid = provider !== INITIAL_PROVIDER;
    // Pinecone configs
    const isApiKeyChanged = apiKey !== INITIAL_API_KEY && apiKey !== "";
    const isIndexNameChanged =
      indexName !== INITIAL_INDEX_NAME && indexName !== "";
    // Astra configs
    const isTokenChanged = token !== INITIAL_TOKEN && token !== "";
    const isEndpointChanged = endpoint !== INITIAL_ENDPOINT && endpoint !== "";
    const isCollectionChanged =
      collection !== INITIAL_COLLECTION && collection !== "";

    // Enable submit button if provider is valid and a required field has been changed
    setEnableSubmit(
      (provider === VectorStoreProvider.Pinecone &&
        isProviderValid &&
        (isApiKeyChanged || isIndexNameChanged)) ||
        (provider === VectorStoreProvider.Astra &&
          isProviderValid &&
          (isTokenChanged || isEndpointChanged || isCollectionChanged)),
    );
  }, [
    provider,
    apiKey,
    indexName,
    token,
    endpoint,
    collection,
    INITIAL_PROVIDER,
    INITIAL_API_KEY,
    INITIAL_INDEX_NAME,
    INITIAL_TOKEN,
    INITIAL_ENDPOINT,
    INITIAL_COLLECTION,
  ]);

  const handleSelectChange = useCallback(
    (value: string) => {
      setProvider(value as VectorStoreProvider);
    },
    [setProvider],
  );

  const handleMetricChange = useCallback(
    (value: string) => {
      setMetric(value as AstraDBMetric);
    },
    [setMetric],
  );

  const handleSubmit = useCallback(() => {
    // Validate form
    if (!provider) {
      setProviderError("Provider is required.");
      return;
    } else {
      setProviderError("");
    }

    if (provider === VectorStoreProvider.Pinecone) {
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
    } else if (provider === VectorStoreProvider.Astra) {
      if (!token) {
        setTokenError("Token is required.");
        return;
      } else {
        setTokenError("");
      }

      if (!endpoint) {
        setEndpointError("Endpoint is required.");
        return;
      } else {
        setEndpointError("");
      }

      if (!collection) {
        setCollectionError("Collection is required.");
        return;
      } else {
        setCollectionError("");
      }

      if (!dimensions) {
        setDimensionsError("Dimensions is required.");
        return;
      } else {
        setDimensionsError("");
      }

      if (!metric) {
        setMetricError("Metric is required.");
        return;
      } else {
        setMetricError("");
      }
    }

    // If form is valid, set the vector store config
    props.setVectorStoreConfig(
      provider === VectorStoreProvider.Pinecone
        ? {
            provider: "Pinecone",
            apiKey: apiKey,
            indexName: indexName,
          }
        : {
            provider: "Astra",
            token: token,
            endpoint: endpoint,
            collection: collection,
            dimensions: parseInt(dimensions),
            metric: metric as "cosine" | "euclidean" | "dot_product",
          },
    );
  }, [
    provider,
    apiKey,
    indexName,
    token,
    endpoint,
    collection,
    dimensions,
    metric,
    props,
  ]);

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
          {provider === VectorStoreProvider.Pinecone && (
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
          )}

          {provider === VectorStoreProvider.Astra && (
            <FormLayout.Group>
              <TextField
                value={token}
                error={tokenError}
                type="text"
                label="Token"
                onChange={setToken}
                autoComplete="off"
                requiredIndicator
                helpText="Token for accessing the Astra vector store"
              />
              <TextField
                value={endpoint}
                error={endpointError}
                type="text"
                label="Endpoint"
                onChange={setEndpoint}
                autoComplete="off"
                requiredIndicator
                helpText="Endpoint for the Astra vector store"
              />
              <TextField
                value={collection}
                error={collectionError}
                type="text"
                label="Collection"
                onChange={setCollection}
                autoComplete="off"
                requiredIndicator
                helpText="Collection name in the Astra vector store"
              />
              <TextField
                value={dimensions}
                error={dimensionsError}
                type="number"
                label="Dimensions"
                max={5000}
                min={1}
                onChange={setDimensions}
                autoComplete="off"
                requiredIndicator
                helpText="Number of dimensions in the vectors stored in the Astra vector store"
              />
              <Select
                label="Metric"
                options={AstraDBMetricOptions}
                value={metric}
                error={metricError}
                placeholder="Select metric"
                onChange={handleMetricChange}
                helpText="Metric used for computing similarity in the Astra vector store"
              />
            </FormLayout.Group>
          )}
        </FormLayout.Group>
        <Button submit disabled={!enableSubmit}>
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
