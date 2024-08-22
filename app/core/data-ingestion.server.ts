/**
 *
 * Require:
 * 1. Vector store config
 * 2. Embedding model config
 * 3. Products data from Shopify API
 *
 * Steps:
 * 1. Prepare GraphQL query to load products data from Shopify API
 * 2. Use LangChain to start data ingestion process
 */

import { TaskType } from "@google/generative-ai";
import {
  AstraDBVectorStore,
  type AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import type { Document } from "langchain/document";
import {
  EmbeddingModelProvider,
  type EmbeddingModelConfig,
  type VectorStoreConfig,
} from "~/types/core-types";

/**
 * Retrieves the embedding model based on the provided configuration.
 *
 * @param {EmbeddingModelConfig} embeddingModelConfig - The configuration for the embedding model.
 * @returns {OpenAIEmbeddings | GoogleGenerativeAIEmbeddings} - The embedding model instance.
 * @throws {Error} - If the embedding model provider is invalid.
 */
function getEmbeddingModel(
  embeddingModelConfig: EmbeddingModelConfig,
): OpenAIEmbeddings | GoogleGenerativeAIEmbeddings {
  // Load the embedding model
  switch (embeddingModelConfig.provider) {
    case EmbeddingModelProvider.OpenAI:
      return new OpenAIEmbeddings({
        apiKey: embeddingModelConfig.apiKey,
        model: embeddingModelConfig.modelName,
        dimensions: embeddingModelConfig.dimensions,
      });
    case EmbeddingModelProvider.Google:
      return new GoogleGenerativeAIEmbeddings({
        apiKey: embeddingModelConfig.apiKey,
        model: embeddingModelConfig.modelName,
        taskType: TaskType.RETRIEVAL_DOCUMENT,
      });
    default:
      throw new Error("Invalid embedding model provider");
  }
}

/**
 * Retrieves the vector store instance based on the provided configuration.
 *
 * @param {VectorStoreConfig} vectorStoreConfig - The configuration for the vector store.
 * @returns {any} - The vector store instance.
 * @throws {Error} - If the vector store provider is invalid.
 */
async function ingestDocumentsToVectorStore(
  vectorStoreConfig: VectorStoreConfig,
  embeddingModel: OpenAIEmbeddings | GoogleGenerativeAIEmbeddings,
  products: Document[],
): Promise<void> {
  if (vectorStoreConfig.provider === "Pinecone") {
    // instantiate the Pinecone client
    const pinecone = new PineconeClient({
      apiKey: vectorStoreConfig.apiKey,
    });
    // instantiate pinecone index
    const pineconeIndex = pinecone.Index(vectorStoreConfig.indexName);
    // ingest the products data
    await PineconeStore.fromDocuments(products, embeddingModel, {
      pineconeIndex,
    });
  } else if (vectorStoreConfig.provider === "Astra") {
    // Astra configurations
    const astraConfig: AstraLibArgs = {
      token: vectorStoreConfig.token,
      endpoint: vectorStoreConfig.endpoint,
      collection: vectorStoreConfig.collection,
      collectionOptions: {
        vector: {
          dimension: vectorStoreConfig.dimensions,
          metric: vectorStoreConfig.metric,
        },
      },
    };
    // load documents
    AstraDBVectorStore.fromDocuments(products, embeddingModel, astraConfig);
  } else {
    throw new Error("Invalid vector store provider");
  }
}

/**
 * Ingests the products data to the vector store.
 *
 * @param {VectorStoreConfig} vectorStoreConfig - The configuration for the vector store.
 * @param {EmbeddingModelConfig} embeddingModelConfig - The configuration for the embedding model.
 * @param {string} products - The products data.
 * @returns {Promise<void>} - A promise that resolves when the ingestion is complete.
 */
export async function ingestProducts({
  vectorStoreConfig,
  embeddingModelConfig,
  products,
}: {
  vectorStoreConfig: VectorStoreConfig;
  embeddingModelConfig: EmbeddingModelConfig;
  products: string;
}): Promise<void> {
  // Get the embedding model
  const embeddingModel = getEmbeddingModel(embeddingModelConfig);
  // process data into documents for ingestion
  const loader = new JSONLoader(products);
  const docs = await loader.load();
  // Ingest the products data to the vector store
  ingestDocumentsToVectorStore(vectorStoreConfig, embeddingModel, docs);
}
