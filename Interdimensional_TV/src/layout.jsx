import Navbar from "./components/Navbar/NavBar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
