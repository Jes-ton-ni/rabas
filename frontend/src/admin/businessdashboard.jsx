import React from 'react'
import Sidebar from '../components/sidebar';

const BusinessDashboard = () => (
  <div className="flex min-h-screen bg-gray-50 font-sans">
    <Sidebar />
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="My Events" value={1} icon="📅" />
        <DashboardCard title="My Deals" value={1} icon="💼" />
        <DashboardCard title="My Products" value={1} icon="📦" />
        <DashboardCard title="My Rate" value={4} icon="⭐" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartSection title="Page Visitation" />
        <ChartSection title="Tourist Statistical Review" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Section title="Ongoing Events" />
        <Section title="Ongoing Deals" />
        <Section title="Most Reviewed Products" />
      </div>
    </div>
  </div>
);

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center shadow-dark transition-all hover:shadow-md">
    <div className="text-3xl mb-2 text-gray-600">{icon}</div>
    <h3 className="text-sm font-medium mb-1 text-gray-500">{title}</h3>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
  </div>
);

const ChartSection = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-lg font-medium mb-4 text-gray-700">{title}</h2>
    {/* Add chart component here */}
  </div>
);

const Section = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-lg font-medium mb-4 text-gray-700">{title}</h2>
    {/* Add content here */}
  </div>
);

export default BusinessDashboard;