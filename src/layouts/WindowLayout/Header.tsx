import { history } from 'umi';
import { Image, Divider } from 'antd';
import User from '@/components/User';
import './index.less';

const Header = () => {
  return (
    <div className="g-window-layout-header">
      <div
        className="g-window-layout-header-logo"
        onClick={() => history.push('/')}
      >
        <Divider
          type="vertical"
          className="g-window-layout-header-logo-divider"
        />
        <span className="g-window-layout-header-logo-text">react</span>
      </div>
      <div className="g-window-layout-header-actions">
        <User />
      </div>
    </div>
  );
};

export default Header;
