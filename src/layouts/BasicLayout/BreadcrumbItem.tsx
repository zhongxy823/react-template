import React from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import classnames from 'classnames';
import './index.less';

interface BreadcrumbItemProps extends ButtonProps {
  path: string;
}

const BreadcrumbItem = ({
  path,
  children,
  className,
  ...rest
}: BreadcrumbItemProps): JSX.Element => {
  return (
    <Button
      className={classnames('g-basic-layout-header-breadcrumb-item', className)}
      type="text"
      onClick={() => history.push(path)}
      {...rest}
    >
      {children}
    </Button>
  );
};

const RootItem: React.FC<ButtonProps> = ({ className, ...rest }) => (
  <Button
    className={classnames(
      'g-basic-layout-header-breadcrumb-item',
      'g-basic-layout-header-breadcrumb-item-root',
      className,
    )}
    type="text"
    onClick={() => history.push('/')}
    {...rest}
  >
  </Button>
);

BreadcrumbItem.Root = RootItem;

export default BreadcrumbItem;
