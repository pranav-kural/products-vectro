import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { login } from "../../shopify.server";

import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({ showForm: Boolean(login) });
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Products Vectro</h1>
        <p className={styles.text}>
          Shopify app enabling merchants to load products data into a vector
          database.
        </p>
        {showForm && (
          <Form className={styles.form} method="post" action="/auth/login">
            <label className={styles.label}>
              <span>Shop domain</span>
              <input className={styles.input} type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className={styles.button} type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className={styles.list}>
          <li>
            <strong>Full Data Ingestion Cycle</strong>. Handles full data
            ingestion pipeline from collecting data from GraphQL Admin API,
            pre-processing data, and generating embeddings to storing embedding
            vectors in vector database.
          </li>
          <li>
            <strong>Vector Store Providers</strong>. Supports multiple
            high-performance vector store providers like Pinecone, AstraDB, and
            Elasticsearch out of the box, giving you the flexibility to choose
            the best provider for your use case.
          </li>
          <li>
            <strong>Embedding Model Providers</strong>. Supports multiple
            state-of-the-art embedding model providers like OpenAI, Google
            Generative AI, and Hugging Face out of the box, giving you the
            flexibility to choose the best provider for your use case.
          </li>
        </ul>
      </div>
    </div>
  );
}
