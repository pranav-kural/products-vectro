import { Form, FormLayout, TextField, Button, Select } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import {
  type ElasticKnnEngine,
  ElasticKnnEngineOptions,
  type ElasticSimilarity,
  ElasticSimilarityOptions,
  type VectorStoreConfig,
  VectorStoreProvider,
} from "~/types/core-types";

export type ElasticsearchConfigFormProps = {
  setVectorStoreConfig: (config: VectorStoreConfig) => void;
};

export function ElasticsearchConfigForm(props: ElasticsearchConfigFormProps) {
  // Set or load initial/default values from a database if needed
  // Useful if saving configurations remotely

  // Elasticsearch default configs
  const INITIAL_API_KEY = "";
  const INITIAL_URL = "";
  const INITIAL_INDEX_NAME = "";
  const INITIAL_KNN_ENGINE: ElasticKnnEngine = "hnsw";
  const INITIAL_SIMILARITY_METRIC: ElasticSimilarity = "cosine";

  // Elasticsearch configs
  const [apiKey, setApiKey] = useState(INITIAL_API_KEY);
  const [apiKeyError, setApiKeyError] = useState(INITIAL_API_KEY);

  const [url, setUrl] = useState(INITIAL_URL);
  const [urlError, setUrlError] = useState(INITIAL_URL);

  const [indexName, setIndexName] = useState(INITIAL_INDEX_NAME);
  const [indexNameError, setIndexNameError] = useState("");

  const [knnEngine, setKnnEngine] =
    useState<ElasticKnnEngine>(INITIAL_KNN_ENGINE);

  const [similarityMetric, setSimilarityMetric] = useState<ElasticSimilarity>(
    INITIAL_SIMILARITY_METRIC,
  );

  // Control submission
  const [enableSubmit, setEnableSubmit] = useState(false);

  useMemo(() => {
    // check if values have changed from initial values
    // and that string values for required fields are not empty
    // Elasticsearch configs
    const isApiKeyChanged = apiKey !== INITIAL_API_KEY && apiKey !== "";
    const isUrlChanged = url !== INITIAL_URL && url !== "";
    const isIndexNameChanged =
      indexName !== INITIAL_INDEX_NAME && indexName !== "";

    // Enable submit button if provider is valid and a required field has been changed
    setEnableSubmit(isApiKeyChanged || isUrlChanged || isIndexNameChanged);
  }, [
    apiKey,
    url,
    indexName,
    INITIAL_API_KEY,
    INITIAL_URL,
    INITIAL_INDEX_NAME,
  ]);

  const handleSimilaritySelectChange = useCallback(
    (value: string) => {
      setSimilarityMetric(value as ElasticSimilarity);
    },
    [setSimilarityMetric],
  );

  const handleKnnEngineSelectChange = useCallback(
    (value: string) => {
      setKnnEngine(value as ElasticKnnEngine);
    },
    [setKnnEngine],
  );

  const handleSubmit = useCallback(() => {
    // Validate form
    if (!apiKey) {
      setApiKeyError("API Key is required.");
      return;
    } else {
      setApiKeyError("");
    }

    if (!url) {
      setUrlError("URL is required.");
      return;
    } else {
      setUrlError("");
    }

    if (!indexName) {
      setIndexNameError("Index Name is required.");
      return;
    } else {
      setIndexNameError("");
    }

    // If form is valid, set the vector store config
    props.setVectorStoreConfig({
      provider: VectorStoreProvider.Elasticsearch,
      apiKey: apiKey,
      url: url,
      indexName: indexName,
    });
  }, [apiKey, url, indexName, props]);

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
            helpText="URL of the Elasticsearch vector store"
          />
          <TextField
            value={indexName}
            error={indexNameError}
            type="text"
            label="URL"
            onChange={setIndexName}
            autoComplete="off"
            requiredIndicator
            helpText="Name of the index in the Elasticsearch vector store"
          />
          <TextField
            value={apiKey}
            error={apiKeyError}
            type="password"
            label="API Key"
            onChange={setApiKey}
            autoComplete="off"
            requiredIndicator
            helpText="API key for accessing the Elasticsearch vector store"
          />

          <Select
            label="KNN Engine"
            options={ElasticKnnEngineOptions}
            value={knnEngine}
            onChange={handleKnnEngineSelectChange}
            placeholder="Optional, select KNN engine"
            helpText="KNN Engine for Elasticsearch"
          />

          <Select
            label="Similarity Metric"
            options={ElasticSimilarityOptions}
            value={similarityMetric}
            onChange={handleSimilaritySelectChange}
            placeholder="Optional, select similarity metric"
            helpText="Similarity metric for Elasticsearch"
          />
        </FormLayout.Group>
        <Button submit disabled={!enableSubmit}>
          Save
        </Button>
      </FormLayout>
    </Form>
  );
}
