import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import "styles/globals.css";
import {Layout} from "ui";
import { Routes } from "constants/routes";

export default function App({ Component, pageProps }: AppProps) {
  /**
   * pageProps.user is automatically set by children pages that use a combination
   * of `withpageAuthRequired` and `getServerSideProps`.
   */
  const { user } = pageProps;

  return (
    <>
      <UserProvider user={user}>
        <Layout routes={Routes}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
