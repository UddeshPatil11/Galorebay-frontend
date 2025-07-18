import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";

function DashboardUsers({ users, getUsers }) {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!users) return <>Loading...</>;

  const filteredUsers = users.filter((user) => {
    // Role filter
    const matchesRole = roleFilter === "all" ? true : user.role === roleFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;

    // Search filter
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase());

    // Date filter
    const createdDate = user.created?.toDate
      ? user.created.toDate()
      : new Date(user.created);
    createdDate.setHours(0, 0, 0, 0);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(0, 0, 0, 0);

    const afterStart = !start || createdDate >= start;
    const beforeEnd = !end || createdDate <= end;

    return (
      matchesRole && matchesStatus && matchesSearch && afterStart && beforeEnd
    );
  });

  return (
    <>
      <main>
        <section>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Role Filter */}
              <div>
                <label className="mr-2">Role:</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 border rounded shadow-sm bg-white"
                >
                  <option value="all">All</option>
                  <option value="Business Entity">Business Entity</option>
                  <option value="Salesperson">Salesperson</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="mr-2">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded shadow-sm bg-white"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Search Filter */}
              <div>
                <label className="mr-2">Search:</label>
                <input
                  type="text"
                  placeholder="Search name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border rounded shadow-sm bg-white w-64"
                />
              </div>

              {/* Start Date Filter */}
              <div>
                <label className="mr-2">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border rounded shadow-sm bg-white"
                />
              </div>

              {/* End Date Filter */}
              <div>
                <label className="mr-2">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border rounded shadow-sm bg-white"
                />
              </div>
            </div>

            {/* Add Button */}
            <Link
              to="add"
              className="text-white bg-green-600 aspect-square p-1 rounded-full"
            >
              <FaPlus />
            </Link>
          </div>

          {/* Table Header */}
          <div className="text-white bg-secondary font-medium flex flex-col lg:flex-row">
            <div className="lg:w-2/12 p-2 border">Role</div>
            <div className="lg:w-1/12 p-2 border">First Name</div>
            <div className="lg:w-1/12 p-2 border">Last Name</div>
            <div className="lg:w-2/12 p-2 border">Company Name</div>
            <div className="lg:w-2/12 p-2 border">Email</div>
            <div className="lg:w-2/12 p-2 border">Phone</div>
            <div className="lg:w-1/12 p-2 border">Status</div>
            <div className="lg:w-1/12 p-2 border">Actions</div>
          </div>

          {/* User Rows */}
          {filteredUsers.map((user, index) => (
            <div key={index} className="flex flex-col lg:flex-row">
              <div className="lg:w-2/12 break-all capitalize p-2 border flex items-center">
                {user.role}
              </div>
              <div className="lg:w-1/12 break-all capitalize p-2 border flex items-center">
                {user.firstName}
              </div>
              <div className="lg:w-1/12 break-all capitalize p-2 border flex items-center">
                {user.lastName}
              </div>
              <div className="lg:w-2/12 break-all capitalize p-2 border flex items-center">
                {user.company}
              </div>
              <div className="lg:w-2/12 break-all lowercase p-2 border flex items-center">
                {user.email}
              </div>
              <div className="lg:w-2/12 break-all p-2 border flex items-center">
                {user.phone}
              </div>
              <div className="lg:w-1/12 break-all p-2 border flex items-center justify-center">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                    user.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : user.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : user.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <div className="lg:w-1/12 break-all p-2 border flex items-center justify-center">
                <Link
                  to={`${user.id}`}
                  className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
                >
                  <MdOutlineModeEditOutline />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

DashboardUsers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
};

export default DashboardUsers;
