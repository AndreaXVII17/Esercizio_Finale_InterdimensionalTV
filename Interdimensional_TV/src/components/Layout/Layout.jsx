import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-root">
      <NavBar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
