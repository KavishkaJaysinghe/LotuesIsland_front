import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 lg:mr-28 w-full overflow-x-auto md:mx-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
      
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 text-center md:text-left">
        <span className="text-[#F4AC20]">USER</span> MANAGEMENT
      </h2>

      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table hoverable className="shadow-md min-w-max">
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <img 
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-sm">{user.username}</Table.Cell>
                    <Table.Cell className="text-sm">{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? <FaCheck className="text-green-500"/> : <FaTimes className="text-red-500"/>}
                    </Table.Cell>
                    <Table.Cell>
                      <span 
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }} 
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {showMore && (
            <button 
              onClick={handleShowMore} 
              className="w-full text-teal-500 text-sm py-4 hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">You have no users yet</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button color="failure" className="w-full sm:w-auto" onClick={handleDeleteUser}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" className="w-full sm:w-auto" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
