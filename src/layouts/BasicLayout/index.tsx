import React from 'react';
import { history, Link } from 'umi';
import { QuestionOutlined } from '@ant-design/icons';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/header';
import imgLogo from '@/assets/images/logo.png';
import User from '@/components/User';
import Breadcrumb from './Breadcrumb';
import './index.less';

const BasicLayout: React.FC = ({ children, ...rest }) => {
  const logo = <img src={imgLogo} alt="" />;

  const iconMap = {
    QuestionOutlined: <QuestionOutlined />,
  };

  // 带子菜单的一级导航
  const renderSubMenuItem = (itemProps: MenuDataItem): React.ReactNode => {
    return (
      <>
        {itemProps.icon && iconMap[itemProps.icon as string]}
        <span>{itemProps.name}</span>
      </>
    );
  };

  // 不带子菜单的导航
  const renderMenuItem = (itemProps: MenuDataItem): React.ReactNode => {
    return itemProps.isUrl || !itemProps.path ? (
      <>
        {itemProps.icon && iconMap[itemProps.icon as string]}
        <span>{itemProps.name}</span>
      </>
    ) : (
      <Link to={itemProps.path}>
        {itemProps.icon && iconMap[itemProps.icon as string]}
        <span>{itemProps.name}</span>
      </Link>
    );
  };

  // 面包屑
  const renderHeaderContent: (
    props: HeaderViewProps,
  ) => React.ReactNode = props => {
    // 匹配到到路由和面包屑信息
    const { matchMenuKeys, breadcrumb } = props as any;
    const matchRoutes = matchMenuKeys.map((item: any) => breadcrumb[item]);
    return (
      <div className="g-basic-layout-header">
        <Breadcrumb routes={matchRoutes} />
      </div>
    );
  };

  // 用户信息
  const renderUserAvatar = () => <User />;

  return (
    <ProLayout
      className="g-basic-layout"
      logo={logo}
      title="易只小燕儿"
      siderWidth={180}
      fixedHeader
      fixSiderbar
      onMenuHeaderClick={() => history.push('/')}
      subMenuItemRender={renderSubMenuItem}
      menuItemRender={renderMenuItem}
      headerContentRender={renderHeaderContent}
      rightContentRender={renderUserAvatar}
      {...rest}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;
