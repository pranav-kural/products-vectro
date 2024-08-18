export enum VectorStoreProvider {
  Milvus = "Milvus",
  Pinecone = "Pinecone",
}

export type VectorStoreCredentials = {
  apiKey: string;
  url: string;
};
