import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        {/* Navbar */}
        <Header />
        <div class="panel-header"></div>
        {/* End Navbar */}
        <div className="content">
          {/* end row */}
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout