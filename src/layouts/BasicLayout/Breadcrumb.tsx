import React from 'react';
import classnames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import './index.less';

interface BreadcrumbProps {
  routes: any[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {
  const validRoutes = routes.filter(item => !!item);

  return (
    <div className="g-basic-layout-header-breadcrumb">
      <BreadcrumbItem.Root
        className={classnames({
          'g-basic-layout-header-breadcrumb-item-active': !validRoutes.length,
        })}
      />
      {validRoutes.map(
        (item: any, index) =>
          item && (
            <span key={item.key}>
              <span className="g-basic-layout-header-breadcrumb-divider">
                /
              </span>
              <BreadcrumbItem
                path={item.path}
                className={classnames({
                  'g-basic-layout-header-breadcrumb-item-active':
                    index === validRoutes.length - 1,
                })}
                disabled={index === validRoutes.length - 1}
              >
                {item.name}
              </BreadcrumbItem>
            </span>
          ),
      )}
    </div>
  );
};

export default Breadcrumb;
