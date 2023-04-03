import React from 'react';
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const MainLayouts = () => {
  return (
    <div>
      <Header />
      <div className='page_content'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;