export enum EmbeddingModelProvider {
  OpenAI = "OpenAI",
  Google = "Google",
  HuggingFace = "HuggingFace",
}

export enum GoogleEmbeddingModelName {
  textEmbedding004 = "text-embedding-004",
}

export enum OpenAIEmbeddingModelName {
  textEmbedding003 = "text-embedding-003",
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

export type EmbeddingModelConfig = {
  provider: EmbeddingModelProvider;
  modelName: EmbeddingModelName;
  apiKey: string;
};

export enum VectorStoreProvider {
  Milvus = "Milvus",
  Pinecone = "Pinecone",
}

export type VectorStoreConfig = {
  provider: VectorStoreProvider;
  apiKey: string;
  url: string;
};
