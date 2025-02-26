import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import GalleryForm from "./galleryPage/GalleryForm"; 

const GalleryTable = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const response = await axios.get("/api/gallery");
    setGalleries(response.data);
  };

  const deleteGallery = async (id) => {
    await axios.delete(`/api/gallery/${id}`);
    fetchGalleries();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setSelectedGallery(null);
  };

  return (
    <section className="container mx-auto p-4">
      {/* Header and Add Button */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg md:text-3xl font-semibold text-gray-900 text-center">
          <span className="text-[#F4AC20]">GALLERY</span> MANAGEMENT
        </h2>
        <Button
          className="bg-[#F4AC20] text-white py-1 px-4 rounded-lg hover:bg-[#f49120]"
          onClick={toggleForm}
        >
          {showForm ? "Hide Form" : "Add an image"}
        </Button>
      </div>

      {/* Table Wrapper for Mobile Scrolling */}
      {!showForm && (
        <div className="overflow-x-auto">
          <Table hoverable={true} className="w-full">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>City</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {galleries.map((gallery) => (
                <Table.Row key={gallery._id} className="bg-white">
                  <Table.Cell>
                    {new Date(gallery.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={gallery.imageURL}
                      alt={gallery.name}
                      className="w-16 h-12 object-cover rounded-md min-w-[64px]"
                    />
                  </Table.Cell>
                  <Table.Cell>{gallery.city}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setSelectedGallery(gallery);
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
      )}

      {/* Show Form if showForm is true */}
      {showForm && (
        <GalleryForm
          onSave={() => {
            toggleForm();
            fetchGalleries();
          }}
          initialValues={selectedGallery}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-semibold text-gray-700">
              Are you sure you want to delete this gallery item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteGallery(selectedGallery._id);
                  setShowModal(false);
                  setSelectedGallery(null);
                }}
              >
                Yes, Delete
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default GalleryTable;
