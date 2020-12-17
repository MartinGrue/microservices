import React from "react";
import { ICurrentUser } from "../app/models/User";
import Link from "next/link";
interface HeaderProps {
  currentUser: ICurrentUser;
}
const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const links = [
    !currentUser.currentUser && { label: "sign Up", href: "/auth/signup" },
    !currentUser.currentUser && { label: "sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser.currentUser && { label: "sign Out", href: "/auth/signout" },
  ]
    .filter((t) => t)
    .map(({ href, label }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link"> {label}</a>
          </Link>
        </li>
      );
    });
  return (
    <nav className="nav navbar-light bg-light">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: "5rem" }}>
          <Link href="/">
            <a className="navbar-brand">TicketsDev</a>
          </Link>
        </div>
        <p>{currentUser.currentUser.email}</p>
        <div style={{ marginRight: "5rem" }}>
          <ul className="nav d-flex align-items-center">{links} </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
