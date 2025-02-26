import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashTours() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTours, setUserTours] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tourIdToDelete, setTourIdToDelete] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`/api/tours/gettours`);
        const data = await res.json();
        if (res.ok) {
          setUserTours(data.tours);
          if (data.tours.length < 9) {
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
      fetchTours();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userTours.length;
    try {
      const res = await fetch(`/api/tours/gettours?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserTours((prev) => [...prev, ...data.tours]);
        if (data.tours.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteTour = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/tours/delete-tour/${tourIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserTours((prev) => prev.filter((tour) => tour._id !== tourIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-3xl font-semibold text-gray-900 text-center">
          <span className="text-[#F4AC20]">ALL</span> TOURS
        </h2>
        <Link to="/dashboard?tab=createtour">
          <Button className="bg-[#F4AC20] border-[#F4AC20] px-4 py-2 text-sm sm:text-base">
            Add a Tour
          </Button>
        </Link>
      </div>

      {currentUser.isAdmin && userTours.length > 0 ? (
        <div className="overflow-x-auto">
          <Table hoverable className="w-full text-sm sm:text-base">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Tour Photo</Table.HeadCell>
              <Table.HeadCell>Tour Title</Table.HeadCell>
              <Table.HeadCell>Days</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {userTours.map((tour) => (
              <Table.Body key={tour._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(tour.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/tour/${tour._id}`}>
                      <img
                        src={tour.photo}
                        alt={tour.title}
                        className="w-16 h-10 sm:w-20 sm:h-12 object-cover bg-gray-500 rounded"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/tour/${tour._id}`}
                    >
                      {tour.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{tour.days} days</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setTourIdToDelete(tour._id);
                      }}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="text-teal-500 hover:underline" to={`/update-tour/${tour._id}`}>
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 text-sm sm:text-base py-4"
            >
              Show More
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">You have no tours yet.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this tour?
            </h3>
            <div className="flex justify-center gap-5">
              <Button color="failure" onClick={handleDeleteTour}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}