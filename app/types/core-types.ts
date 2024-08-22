export enum EmbeddingModelProvider {
  OpenAI = "OpenAI",
  Google = "Google",
  HuggingFace = "HuggingFace",
}

export enum GoogleEmbeddingModelName {
  textEmbedding004 = "text-embedding-004",
}

export enum OpenAIEmbeddingModelName {
  textEmbeddingAda002 = "text-embedding-ada-002",
  textEmbedding3Small = "text-embedding-3-small",
  textEmbedding3Large = "text-embedding-3-large",
}

export enum HuggingFaceEmbeddingModelName {
  distilbertBaseNliMeanTokens = "sentence-transformers/distilbert-base-nli-mean-tokens",
  allMiniLmL6V2 = "sentence-transformers/all-MiniLM-L6-v2",
  paraphraseMultilingualMiniLmL12V2 = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
  bgem3 = "BAAI/bge-m3",
  multilingualE5Large = "intfloat/multilingual-e5-large",
  jinaEmbeddingsV2BaseEn = "jinaai/jina-embeddings-v2-base-en",
  mxbaiEmbedLargeV1 = "mixedbread-ai/mxbai-embed-large-v1",
  codebertBase = "microsoft/codebert-base",
}

export type EmbeddingModelName =
  | GoogleEmbeddingModelName
  | OpenAIEmbeddingModelName
  | HuggingFaceEmbeddingModelName;

export const EmbeddingModelNamesList = [
  ...Object.values(GoogleEmbeddingModelName),
  ...Object.values(OpenAIEmbeddingModelName),
  ...Object.values(HuggingFaceEmbeddingModelName),
];

export type EmbeddingModelConfig = {
  provider: EmbeddingModelProvider;
  modelName: EmbeddingModelName;
  apiKey: string;
  dimensions?: number;
};

export enum VectorStoreProvider {
  Astra = "Astra",
  Pinecone = "Pinecone",
  Elasticsearch = "Elasticsearch",
}

export type PineconeConfig = {
  provider: "Pinecone";
  apiKey: string;
  indexName: string;
};

export const AstraDBMetricOptions = ["cosine", "euclidean", "dot_product"];
export type AstraDBMetric = "cosine" | "euclidean" | "dot_product";

export type AstraConfig = {
  provider: "Astra";
  token: string;
  endpoint: string;
  collection: string;
  dimensions?: number;
  similarityMetric?: AstraDBMetric;
};

export const ElasticSimilarityOptions = ["l2_norm", "dot_product", "cosine"];
export type ElasticSimilarity = "l2_norm" | "dot_product" | "cosine";

export const ElasticKnnEngineOptions = ["hnsw"];
export type ElasticKnnEngine = "hnsw";

export type ElasticsearchConfig = {
  provider: "Elasticsearch";
  url: string;
  indexName: string;
  apiKey: string;
  engine?: ElasticKnnEngine;
  similarityMetric?: ElasticSimilarity;
};

export type VectorStoreConfig =
  | PineconeConfig
  | AstraConfig
  | ElasticsearchConfig;
