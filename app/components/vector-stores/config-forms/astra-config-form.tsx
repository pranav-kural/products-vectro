import {
  Form,
  FormLayout,
  TextField,
  Button,
  Select,
  Box,
  InlineGrid,
  Text,
} from "@shopify/polaris";
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

  const PROVIDER: VectorStoreProvider = VectorStoreProvider.Datastax;

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
    // none of the required fields are empty
    const areRequiredFieldsFilled =
      token !== "" && endpoint !== "" && collection !== "";

    // Atleast one of the fields have been changed
    const isAnyFieldChanged =
      token !== INITIAL_TOKEN ||
      endpoint !== INITIAL_ENDPOINT ||
      collection !== INITIAL_COLLECTION ||
      dimensions !== INITIAL_DIMENSIONS ||
      metric !== INITIAL_METRIC;

    // Enable submit button if all required fields are filled and a field has been changed
    setEnableSubmit(isAnyFieldChanged && areRequiredFieldsFilled);
  }, [
    token,
    endpoint,
    collection,
    dimensions,
    metric,
    INITIAL_TOKEN,
    INITIAL_ENDPOINT,
    INITIAL_COLLECTION,
    INITIAL_DIMENSIONS,
    INITIAL_METRIC,
  ]);

  // validate dimensions value
  const handleDimensionsChange = useCallback((value: string) => {
    shopify.toast.show(`Dimensions changed to ${value}`);
    try {
      const dimInt = parseInt(value);
      if (isNaN(dimInt) || dimInt <= 0 || dimInt > 5000) {
        setDimensionsError(
          "Dimensions must be a positive integer less than 5000.",
        );
      } else {
        setDimensionsError("");
        setDimensions(value);
      }
    } catch (e) {
      setDimensionsError(
        "Dimensions must be a positive integer less than 5000.",
      );
    }
  }, []);

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

    const getDimensions = (dim: string) => {
      try {
        const dimInt = parseInt(dim);
        if (dim === "" || isNaN(dimInt) || dimInt <= 0 || dimInt > 5000) {
          return undefined;
        }
        return dimInt;
      } catch (e) {
        return undefined;
      }
    };

    // If form is valid, set the vector store config
    props.setVectorStoreConfig({
      provider: PROVIDER,
      token: token,
      endpoint: endpoint,
      collection: collection,
      dimensions: getDimensions(dimensions),
      similarityMetric: metric as "cosine" | "euclidean" | "dot_product",
    });
  }, [PROVIDER, token, endpoint, collection, dimensions, metric, props]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
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
          <InlineGrid gap="400" columns={2}>
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
          </InlineGrid>
          <Box>
            <Text as="p" variant="bodySm">
              Use the below optional configuration options to configure advanced
              settings.
            </Text>
          </Box>
          <InlineGrid gap="400" columns={2}>
            <TextField
              value={dimensions}
              error={dimensionsError}
              type="number"
              label="Dimensions"
              max={5000}
              onChange={(value: string) => handleDimensionsChange(value)}
              autoComplete="off"
              helpText="Dimension of the vectors stored in the collection."
            />
            <Select
              label="Metric"
              options={AstraDBMetricOptions}
              value={metric}
              error={metricError}
              placeholder="Select metric"
              onChange={handleMetricChange}
              helpText="Metric used for computing similarity"
            />
          </InlineGrid>
          <Button submit disabled={!enableSubmit}>
            Save
          </Button>
        </FormLayout>
      </Form>
    </>
  );
}
