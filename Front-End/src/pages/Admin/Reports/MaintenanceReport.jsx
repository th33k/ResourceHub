import React from 'react';
import MaintenanceTable from '../../../components/Report/MaintenanceTable';
import AdminLayout from '../../../layouts/Admin/AdminLayout';

function MaintenanceReport() {
  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Maintenance Reports</h1>
        <div className="mt-6">
          <MaintenanceTable />
        </div>
      </div>
    </AdminLayout>
  );
}

export default MaintenanceReport;
