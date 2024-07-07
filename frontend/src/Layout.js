import SideBar from "./wrapper/MainSideBar";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <SideBar />
      <div className="content">{children}</div>
    </div>
  );
}
