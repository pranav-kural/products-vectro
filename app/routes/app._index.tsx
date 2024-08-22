import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { getProductsAction } from "~/core/shopify-api.server";

export const action = getProductsAction;

export default function Index() {
  const fetcher = useFetcher<typeof action>();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const loadProducts = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page>
      <TitleBar title="Remix app template">
        <button variant="primary" onClick={loadProducts}>
          Load products
        </button>
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={loadProducts}>
                    Load products
                  </Button>
                  {fetcher.data && (
                    <Box>
                      <Text as="p" variant="bodyMd">
                        Product generated: {JSON.stringify(fetcher.data)}
                      </Text>
                    </Box>
                  )}
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
