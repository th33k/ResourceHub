import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import BaseLayout from '../shared/BaseLayout';

const AdminLayout = ({ children }) => {
  return (
    <BaseLayout
      header={<AdminHeader />}
      sidebar={<AdminSidebar />}
      children={children}
    />
  );
};

export default AdminLayout;
