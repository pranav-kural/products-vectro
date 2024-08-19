import { Card, Layout, Link, List, Text, BlockStack } from "@shopify/polaris";
import type { EmbeddingModelConfig } from "~/types/core-types";
import { EmbeddingModelConfigForm } from "./embedding-model-form";

export type SetupEmbeddingModelProps = {
  setEmbeddingModelConfig: (config: EmbeddingModelConfig) => void;
  initialEmbeddingModelConfig?: EmbeddingModelConfig;
};

export const SetupEmbeddingModel = (props: SetupEmbeddingModelProps) => {
  return (
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="300">
            <Text variant="headingXl" as="h4">
              Setup Embedding Model
            </Text>
            <Text as="p" variant="bodyMd">
              Embeddings are essentially numerical representations that help AI
              systems understand complex relationships in data. Data related to
              all products are converted into embeddings and stored in a vector
              store. This vector store can then be used for retrieval to empower
              applications like product search, recommendation, personalization,
              and more.
            </Text>
            <Text as="p">
              To learn more about embeddings, refer to:
              <Link
                url="https://aws.amazon.com/what-is/embeddings-in-machine-learning/"
                accessibilityLabel="Article on What are Embeddings in Machine Learning"
                target="_blank"
                removeUnderline
              >
                What are Embeddings in Machine Learning?
              </Link>
            </Text>
            <EmbeddingModelConfigForm
              setEmbeddingModelConfig={props.setEmbeddingModelConfig}
              initialEmbeddingModelConfig={props.initialEmbeddingModelConfig}
            />
          </BlockStack>
        </Card>
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <Card>
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Supported Embedding Model Providers
            </Text>
            <List>
              <List.Item>
                <Link
                  url="https://platform.openai.com/docs/guides/embeddings/embedding-models"
                  target="_blank"
                  removeUnderline
                >
                  OpenAI API
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  url="https://ai.google.dev/gemini-api/docs/embeddings"
                  target="_blank"
                  removeUnderline
                >
                  Google Gemini API
                </Link>
              </List.Item>
              <List.Item>
                <Link
                  url="https://huggingface.co/models?other=embeddings"
                  target="_blank"
                  removeUnderline
                >
                  Hugging Face Inference API
                </Link>
              </List.Item>
            </List>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  );
};
