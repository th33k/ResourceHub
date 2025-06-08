import React from 'react';
import AppHeader from '../shared/AppHeader';

const AdminHeader = () => {
  return (
    <AppHeader
      title="Resource Hub" // Updated title
      logo="/ResourceHub.png" // Updated logo path
      notificationCount={0}
      showSettings={false}
      showOrdersInProfile={false}
    />
  );
};

export default AdminHeader;
