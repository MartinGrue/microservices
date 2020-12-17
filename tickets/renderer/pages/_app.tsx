import "bootstrap/dist/css/bootstrap.css";
import { AppProps, AppContext } from "next/app";
import { NextPage, NextPageContext } from "next";
import { ICurrentUser } from "../app/models/User";
import {
  createAxiosInstance,
  createAgent,
  Agent,
} from "../app/api/createCustomAxios";
import App from "next/app";
import {
  AppType,
  NextComponentType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.css";

interface InitProps {
  currentUser: ICurrentUser;
}
interface MyProps extends AppProps {
  currentUser: ICurrentUser;
}

const MyApp: NextComponentType<AppContext, AppInitialProps, MyProps> = ({
  Component,
  pageProps,
  currentUser,
}) => {
  // console.log("currentUser:", currentUser);
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <div className="container">
        <Component {...pageProps}></Component>
      </div>
    </div>
  );
};

export interface InjectionProps {
  agent: Agent;
  currentUser: ICurrentUser;
}
export interface Context extends NextPageContext, InjectionProps {
  // any modifications to the default context, e.g. query types
}
MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & InjectionProps> => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  console.log("in app");
  const axiosInstance = createAxiosInstance(appContext.ctx.req);
  const agent = createAgent(axiosInstance);

  //pass down agent to store creation
  console.log("in app init");
  try {
    const currentUser = await agent.User.fetchCurrentUser();
    // console.log("current user: ", currentUser);
    const customContext: Context = { ...appContext.ctx, agent, currentUser };

    // const pageProps = appContext.Component.getInitialProps
    //   ? await appContext.Component.getInitialProps(customContext)
    //   : {};
    // const appProps = await App.getInitialProps(appContext);
    const appProps: AppInitialProps = { pageProps: null };
    appProps.pageProps = appContext.Component.getInitialProps
      ? await appContext.Component.getInitialProps(customContext)
      : {};

    return { ...appProps, currentUser, agent };
  } catch (error) {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps, currentUser: undefined, agent };
  }
};

export default MyApp;
