import "bootstrap/dist/css/bootstrap.css";
import { AppProps, AppContext } from "next/app";
import { NextPage, NextPageContext } from "next";
import { ICurrentUser } from "../app/models/User";
import { createAxiosInstance, createAgent, Agent } from "../app/api/createCustomAxios";
import App from "next/app";
import {
  AppType,
  NextComponentType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils";
import Header from "../components/Header";
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
      <Component {...pageProps}></Component>
    </div>
  );
};

interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
  agent: Agent;
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const axiosInstance = createAxiosInstance(appContext.ctx.req);
  const agent = createAgent(axiosInstance);

  const appProps = await App.getInitialProps(appContext);
  const customContext: Context = { ...appContext.ctx, agent };
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(customContext)
    : {};
  appProps.pageProps = pageProps;


  //pass down agent to store creation
  console.log("in app init");
  try {
    const currentUser = await agent.User.fetchCurrentUser();
    console.log(currentUser.currentUser);

    return { ...appProps, currentUser };
  } catch (error) {
    const currentUser = await Promise.resolve<ICurrentUser>({
      currentUser: null,
    });
    return { ...appProps, currentUser };
  }
};

export default MyApp;
