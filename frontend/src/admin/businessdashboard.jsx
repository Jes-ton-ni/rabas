import React from 'react'
import Sidebar from '../components/sidebar';

const BusinessDashboard = () => {
  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
        
   <div className="grid grid-cols-4 gap-4 mb-8">
  <DashboardCard title="My Events" value={1} color="bg-blue-300" />
  <DashboardCard title="My Deals" value={1} color="bg-yellow-500" />
  <DashboardCard title="My Products" value={1} color="bg-purple-400" />
  <DashboardCard title="My Rate" value={4} color="bg-pink-400" />
</div>
        <div className="grid grid-cols-2 gap-6">
          <ChartSection title="Page Visitation" />
          <ChartSection title="Tourist Statistical Review" />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <EventSection title="Ongoing Events" />
          <DealSection title="Ongoing Deals" />
          <ProductSection title="Most Reviewed Products" />
        </div>
      </div>
    </div>
  )
}

const DashboardCard = ({ title, value, color }) => (
  <div className={`${color} p-4 rounded-lg text-white text-center`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
)

const ChartSection = ({ title }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {/* Add chart component here */}
  </div>
)

const EventSection = ({ title }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {/* Add event list or cards here */}
  </div>
)

const DealSection = ({ title }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {/* Add deal list or cards here */}
  </div>
)

const ProductSection = ({ title }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {/* Add product list or cards here */}
  </div>
)

export default BusinessDashboard