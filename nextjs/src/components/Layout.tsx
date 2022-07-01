import React, { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren<{}> {}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="site">
      <header className="site__header d-lg-block d-none">
        <div style={{ height: "100px", backgroundColor:"red" }}></div>
      </header>

      <div className="site__body">
        <div style={{ height: "100px" }}>{children}</div>
      </div>

      <footer className="site__footer">
        <div style={{ height: "100px" }}></div>
      </footer>
    </div>
  );
};

export default Layout;
