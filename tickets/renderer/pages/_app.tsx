import "bootstrap/dist/css/bootstrap.css";
import { AppProps, AppContext } from "next/app";
import { NextPage, NextPageContext } from "next";
import { ICurrentUser } from "../app/models/User";
import { createAxiosInstance, createAgent } from "../app/api/createCustomAxios";
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const pageProps = appContext.Component.getInitialProps
    ? await appContext.Component.getInitialProps(appContext.ctx)
    : {};
  appProps.pageProps = pageProps;
  const axiosInstance = createAxiosInstance(appContext.ctx.req);
  const agent = createAgent(axiosInstance);

  //pass down agent to store creation
  console.log("in app init")
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
