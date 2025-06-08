import React from 'react';
import AssetsTable from '../../../components/Report/AssetsTable';
import AdminLayout from '../../../layouts/Admin/AdminLayout';

function AssetReport() {
  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Asset Reports</h1>
        <div className="mt-6">
          <AssetsTable />
        </div>
      </div>
    </AdminLayout>
  );
}

export default AssetReport;
