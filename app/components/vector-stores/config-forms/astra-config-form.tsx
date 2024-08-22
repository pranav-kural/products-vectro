import { Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  type AstraDBMetric,
  AstraDBMetricOptions,
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";

export type AstraConfigFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function AstraConfigForm(props: AstraConfigFormProps) {
  // Set or load initial/default values from a database if needed
  // Useful if saving configurations remotely

  // Astra default configs
  const INITIAL_TOKEN = "";
  const INITIAL_ENDPOINT = "";
  const INITIAL_COLLECTION = "";
  const INITIAL_DIMENSIONS = "";
  const INITIAL_METRIC: AstraDBMetric = "cosine";

  const PROVIDER: VectorStoreProvider = VectorStoreProvider.Astra;

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
    // Astra configs
    const isTokenChanged = token !== INITIAL_TOKEN && token !== "";
    const isEndpointChanged = endpoint !== INITIAL_ENDPOINT && endpoint !== "";
    const isCollectionChanged =
      collection !== INITIAL_COLLECTION && collection !== "";

    // Enable submit button if provider is valid and a required field has been changed
    setEnableSubmit(isTokenChanged || isEndpointChanged || isCollectionChanged);
  }, [
    token,
    endpoint,
    collection,
    INITIAL_TOKEN,
    INITIAL_ENDPOINT,
    INITIAL_COLLECTION,
  ]);

  const handleMetricChange = useCallback(
    (value: string) => {
      setMetric(value as AstraDBMetric);
    },
    [setMetric],
  );

  const handleSubmit = useCallback(() => {
    // Validate form
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

    // If form is valid, set the vector store config
    props.setVectorStoreConfig({
      provider: PROVIDER,
      token: token,
      endpoint: endpoint,
      collection: collection,
      dimensions: parseInt(dimensions),
      similarityMetric: metric as "cosine" | "euclidean" | "dot_product",
    });
  }, [PROVIDER, token, endpoint, collection, dimensions, metric, props]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
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
        <Button submit disabled={!enableSubmit}>
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
