import React, { useState } from 'react';
import SuperAdminSidebar from './superadmincomponents/superadminsidebar';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

const SuperAdminUsers = () => {
  // Sample data for the table
  const usersData = [
    { name: 'Lorem Ipsum', type: 'Tourists' },
    { name: 'Dolor Sit', type: 'Business Owner' },
    // Add more sample data as needed
  ];

  const [searchQuery, setSearchQuery] = useState('');

  // Filtered data based on search query
  const filteredData = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <SuperAdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Users</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-500 text-white p-4 rounded shadow-md">
            <h2 className="text-lg">Tourists</h2>
            <p className="text-2xl font-bold">10</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded shadow-md">
            <h2 className="text-lg">Business Owners</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded shadow-md">
            <h2 className="text-lg">Total Users</h2>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center shadow-md mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 flex-1 rounded-l"
          />
          <button className="bg-color2 text-white p-2  rounded-r">Search</button>
        </div>

        {/* Tabs */}
        <Tabs
          aria-label="User Options"
          variant="underlined"
          className="border-b border-gray-200 mb-6"
        >
          <Tab key="all" title="All" className="hover:text-blue-500">
            <Card className="mt-4 shadow-lg rounded-lg">
              <CardBody className="p-6">
                {/* All Users Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Type of Users</th>
                        <th className="py-2 px-4 border-b">Actions</th> {/* New Actions column */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 transition duration-300">
                          <td className="py-2 px-4 border-b">{item.name}</td>
                          <td className="py-2 px-4 border-b">{item.type}</td>
                          <td className="py-2 px-4 border-b">
                            <button className="text-red-500 hover:text-red-700">Delete</button> {/* Delete button */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="tourists" title="Tourists" className="hover:text-blue-500">
            <Card className="mt-4 shadow-lg rounded-lg">
              <CardBody className="p-6">
                {/* Tourists Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Type of Users</th>
                        <th className="py-2 px-4 border-b">Actions</th> {/* New Actions column */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData
                        .filter(user => user.type === 'Tourists')
                        .map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100 transition duration-300">
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.type}</td>
                            <td className="py-2 px-4 border-b">
                              <button className="text-red-500 hover:text-red-700">Delete</button> {/* Delete button */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="business" title="Business Owner" className="hover:text-blue-500">
            <Card className="mt-4 shadow-lg rounded-lg">
              <CardBody className="p-6">
                {/* Business Owners Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Type of Users</th>
                        <th className="py-2 px-4 border-b">Actions</th> {/* New Actions column */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData
                        .filter(user => user.type === 'Business Owner')
                        .map((item, index) => (
                          <tr key={index} className="hover:bg-gray-100 transition duration-300">
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.type}</td>
                            <td className="py-2 px-4 border-b">
                              <button className="text-red-500 hover:text-red-700">Delete</button> {/* Delete button */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminUsers;