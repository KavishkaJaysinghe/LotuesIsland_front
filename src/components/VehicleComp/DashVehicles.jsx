import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashVehicles() {
  const { currentUser } = useSelector((state) => state.user);
  const [userVehicles, setUserVehicles] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch(`/api/vehicles/getvehicles`);
        const data = await res.json();
        if (res.ok) {
          setUserVehicles(data.vehicles);
          if (data.vehicles.length < 9) {
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
      fetchVehicles();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userVehicles.length;
    try {
      const res = await fetch(`/api/vehicles/getvehicles?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserVehicles((prev) => [...prev, ...data.vehicles]);
        if (data.vehicles.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteVehicle = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/vehicles/deletevehicle/${vehicleIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserVehicles((prev) =>
          prev.filter((vehicle) => vehicle._id !== vehicleIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Title and Add Button */}
      <div className="flex flex-wrap justify-between items-center mb-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-900 text-center">
          <span className="text-[#F4AC20]">ALL</span> VEHICLES
        </h2>
        <Link to="/dashboard?tab=createvehicle">
          <Button className="bg-[#F4AC20] text-white px-4 py-1 rounded-lg hover:bg-[#f49120]">
            Add a vehicle
          </Button>
        </Link>
      </div>

      {currentUser.isAdmin && userVehicles.length > 0 ? (
        <>
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <Table hoverable className="w-full">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Vehicle Image</Table.HeadCell>
                <Table.HeadCell>Vehicle Title</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {userVehicles.map((vehicle) => (
                  <Table.Row key={vehicle._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{new Date(vehicle.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/vehicles`}>
                        <img 
                          src={vehicle.image}
                          alt={vehicle.title}
                          className="w-16 h-12 object-cover rounded-md min-w-[64px]"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="font-medium text-gray-900 dark:text-white" to={`/vehicles`}>
                        {vehicle.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span onClick={() => {
                        setShowModal(true);
                        setVehicleIdToDelete(vehicle._id);
                      }} className="font-medium text-red-500 hover:underline cursor-pointer">
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link className="text-teal-500 hover:underline" to={`/update-vehicle/${vehicle._id}`}>
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-3">
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">You have no vehicles yet</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-red-500 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-700'>
              Are you sure you want to delete this vehicle?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteVehicle}>Yes, Delete</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
