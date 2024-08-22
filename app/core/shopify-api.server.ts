import type { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";

export const getProductsAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }`,
  );

  const responseJson = await response.json();

  return json({
    products: responseJson!.data!.products,
  });
};
