// react
import { ComponentType, useEffect, useMemo, Fragment } from "react";
// third-party
import type { AppProps } from "next/app";
import {
  NextComponentType,
  NextPageContext,
} from "next/dist/next-server/lib/utils";

// application
import Layout from "../components/Layout";
// styles
import "../scss/index.scss";

export type RendererAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any> & {
    Layout: ComponentType;
  };
};

function MyApp({ Component, pageProps }: RendererAppProps) {
  const content = useMemo(() => {
    const PageLayout = Component.Layout || Fragment;

    return (
      <Layout>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </Layout>
    );
  }, [Component, pageProps]);
  return <div>{content}</div>;
}

export default MyApp;
