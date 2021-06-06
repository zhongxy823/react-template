import React from 'react';
import Header from './Header';
import './index.less';

const WindowLayout: React.FC = ({ children }) => {
  return (
    <div className="g-window-layout">
      <div className="g-window-layout-header-wrapper">
        <Header />
      </div>
      <div className="g-window-layout-content-wrapper">
        <div className="g-window-layout-content">{children}</div>
      </div>
    </div>
  );
};

export default WindowLayout;
