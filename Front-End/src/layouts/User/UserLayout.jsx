import React from 'react';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import BaseLayout from '../shared/BaseLayout';

const UserLayout = ({ children }) => {
  return (
    <BaseLayout
      header={<UserHeader />}
      sidebar={<UserSidebar />}
      children={children}
    />
  );
};

export default UserLayout;
