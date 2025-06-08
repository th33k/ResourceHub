import React from 'react';
import MaintenenHomeCard from '../../../components/Maintenance/MaintenanceHomeCard';
import AdminLayout from '../../../layouts/Admin/AdminLayout';
import '../../css/MaintenanceHome.css';

function Maintenen() {
  return (
    <AdminLayout>
      <div className="min-h-screen space-y-6 p-6">
        <h1 className="text-2xl font-semibold">Maintenance Categories</h1>
        <div className="maintenen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <MaintenenHomeCard
            name="Tech Support"
            image="/Maintenance/TechSupport.png"
            route={'../admin-maintenanceDetails'}
          />

          <MaintenenHomeCard
            name="General Maintenance"
            image="/Maintenance/genaralmaintanance.png"
            route={'../admin-maintenanceDetails'}
          />

          <MaintenenHomeCard
            name="Cleaning and Hygiene"
            image="/Maintenance/hand.png"
            route={'../admin-maintenanceDetails'}
          />
          <MaintenenHomeCard
            name="Furniture and Fixtures"
            image="/Maintenance/FeernituresAndPictures.png"
            route={'../admin-maintenanceDetails'}
          />
          <MaintenenHomeCard
            name="Safety and Security"
            image="/Maintenance/officer.png"
            route={'../admin-maintenanceDetails'}
          />
          <MaintenenHomeCard
            name="Lighting and Power"
            image="/Maintenance/bulb.png"
            route={'../admin-maintenanceDetails'}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Maintenen;
