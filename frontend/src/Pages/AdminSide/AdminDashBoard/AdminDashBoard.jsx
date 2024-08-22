import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AtmTable from "../../../AtmComponents/AtmTable";
import AtmButton from "../../../AtmComponents/AtmButton";
import { useNavigate } from "react-router-dom";
import DeleteUserModal from "../Modals/DeleteUserModal";
import EditUserModal from "../Modals/EditUserModal";
import ViewPermissionsModal from "../Modals/ViewPermissionsModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UpdateUser from "../Modals/UpdateUserModal";
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordModal from "../Modals/ResetPasswordModal";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  // console.log(users, "users");

  const [showViewPermissions, setShowViewPermissions] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showDuplicateUser, setShowDuplicateUser] = useState(false);
  const [resestPassword, setResetPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([])

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Actions",
      accessor: "action",
      Cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowViewPermissions(true);
              }}
              className="bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700"
            >
              View Permissions
            </button>
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowEditUser(true);
              }}
              className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
            >
              Edit
            </button>
            {/* <button
              onClick={() => {
                navigate("/admin-update-user")
              }}
              className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
            >
              Duplicate
            </button> */}
            <button
              onClick={() => {
                setSelectedUser(user);
                setResetPassword(true);
               
              }}
              className="bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700"
            >
              Reset Password
            </button>
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowDeleteUser(true);
              }}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>

        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:7000/user/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
        },
      })
      .then((response) => {

        setAllUsers(response.data.response)
      }).catch((error) => {
        toast.error("Error fetching users!");
        console.error(error);
      })

  }, [])


  return (
    <div>
    
      <div className="Header_Bottom shadow-xl my-3 py-5">
        <div className="headerBottomInner flex items-center">
          <div className="headerBottomLft mr-auto">
            <div className="navItem flex items-center">
              <i className="ri-home-3-fill mr-2 text-2xl text-[#EFA035]"></i>
              <h3 className="m-0 text-[#333] text-2xl font-semibold">
                User Management
              </h3>
            </div>
          </div>
          <div
            className="headerBottomRgt"
            onClick={() => navigate("/admin-add-user")}
          >
            <AtmButton label="Add User" />
          </div>
        </div>
      </div>
      <AtmTable columns={columns} data={allUsers} />
      {showViewPermissions && (
        <ViewPermissionsModal
          user={selectedUser}
          onClose={() => setShowViewPermissions(false)}
          id={selectedUser?.user_id}
        />
      )}
      {showEditUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditUser(false)}
          setAllUsers={setAllUsers}
        />
      )}
      {showDeleteUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => setShowDeleteUser(false)}
          id={selectedUser?.user_id}
          setAllUsers={setAllUsers}
        />
      )}

      {showDuplicateUser && (
        <UpdateUser
        />
      )}
      {resestPassword && (
        <ResetPasswordModal
        onClose={() => setResetPassword(false)}
        setAllUsers={setAllUsers}
        user={selectedUser}
        id={selectedUser?.user_id}
        />
      )}
  {/* <ToastContainer /> */}
    </div>

  );
};

export default AdminDashBoard;
