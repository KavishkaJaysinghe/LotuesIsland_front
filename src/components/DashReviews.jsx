import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashReviews() {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  // State to store user details (profile picture, username) keyed by user ID
  const [reviewUsers, setReviewUsers] = useState({});
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState("");

  // New state for full review modal
  const [selectedReview, setSelectedReview] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New states for image preview modal
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // Helper function to truncate review comment to 5 words
  const truncateReview = (comment) => {
    const words = comment.split(" ");
    if (words.length <= 5) return comment;
    return words.slice(0, 5).join(" ") + " ...";
  };

  // Fetch reviews and then user data for each review
  const fetchReviews = async (startIndex = 0) => {
    try {
      const endpoint = startIndex
        ? `/api/review/getReviews?startIndex=${startIndex}`
        : `/api/review/getReviews`;
      const response = await axios.get(endpoint);
      const reviewsData = response.data.reviews;

      // Merge new reviews and sort by createdAt in descending order (latest first)
      setReviews((prev) => {
        const combined = startIndex ? [...prev, ...reviewsData] : reviewsData;
        return combined.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });

      if (reviewsData.length < 9) {
        setShowMore(false);
      }

      // For each review, fetch its user details if not already in state
      const userPromises = reviewsData.map(async (review) => {
        if (!reviewUsers[review.userId]) {
          const userResponse = await axios.get(`/api/user/${review.userId}`);
          return { userId: review.userId, data: userResponse.data };
        }
        return null;
      });

      const usersData = await Promise.all(userPromises);
      const newUsers = usersData.filter((item) => item !== null);

      if (newUsers.length > 0) {
        setReviewUsers((prev) => {
          const updated = { ...prev };
          newUsers.forEach(({ userId, data }) => {
            updated[userId] = data;
          });
          return updated;
        });
      }
    } catch (error) {
      console.error("Error fetching reviews or user data:", error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      fetchReviews();
    }
    // We intentionally leave reviewUsers out of dependencies here
    // so that user lookups occur only when new reviews are fetched.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Add arrow key navigation for image modal
  useEffect(() => {
    if (!showImageModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          selectedImages.length > 0
            ? (prev - 1 + selectedImages.length) % selectedImages.length
            : prev
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          selectedImages.length > 0
            ? (prev + 1) % selectedImages.length
            : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showImageModal, selectedImages]);

  const handleShowMore = () => {
    const startIndex = reviews.length;
    fetchReviews(startIndex);
  };

  const handleDeleteReview = async () => {
    setShowModal(false);
    try {
      await axios.delete(`/api/review/deleteReview/${reviewIdToDelete}`);
      setReviews((prev) =>
        prev.filter((review) => review._id !== reviewIdToDelete)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Function to open image preview modal
  const openModal = (images, index) => {
    setSelectedImages(images);
    setSelectedImageIndex(index);
    setShowImageModal(true);
  };

  return (
    <div className="p-3 lg:mr-28 w-full overflow-x-auto md:mx-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 text-center md:text-left">
        <span className="text-[#F4AC20]">REVIEW</span> MANAGEMENT
      </h2>

      {currentUser && currentUser.isAdmin && reviews.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table hoverable className="shadow-md min-w-max">
              <Table.Head>
                <Table.HeadCell>User Profile</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Review</Table.HeadCell>
                <Table.HeadCell>Images</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {reviews.map((review) => {
                  // Use the fetched user data; fall back to defaults if not available
                  const reviewUser = reviewUsers[review.userId] || {};
                  return (
                    <Table.Row
                      key={review._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        <img
                          src={
                            reviewUser.profilePicture ||
                            "https://via.placeholder.com/150"
                          }
                          alt={reviewUser.username || "User"}
                          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        {reviewUser.username || "Anonymous"}
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        <span
                          onClick={() => {
                            setSelectedReview(review.comment);
                            setShowReviewModal(true);
                          }}
                          className="cursor-pointer"
                        >
                          {truncateReview(review.comment)}
                        </span>
                        {review.rating !== undefined && (
                          <div className="mt-2 flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                              <svg
                                key={index}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill={index < review.rating ? "#FBBF24" : "#D1D5DB"}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                />
                              </svg>
                            ))}
                            <span className="ml-2 text-gray-600">
                              {review.rating}
                            </span>
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        {review.images && review.images.length > 0 ? (
                          <div className="flex gap-2">
                            {review.images.map((imgUrl, index) => (
                              <img
                                key={index}
                                src={imgUrl}
                                alt={`Review image ${index + 1}`}
                                className="w-16 h-16 object-cover cursor-pointer rounded"
                                onClick={() => openModal(review.images, index)}
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500">No images</span>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setReviewIdToDelete(review._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
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
        <p className="text-center text-gray-500">No reviews found</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this review?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                color="failure"
                className="w-full sm:w-auto"
                onClick={handleDeleteReview}
              >
                Yes, I'm Sure
              </Button>
              <Button
                color="gray"
                className="w-full sm:w-auto"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Full Review Modal */}
      <Modal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Full Review</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p className="text-sm text-gray-700">{selectedReview}</p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        popup
        size="full"
      >
        <Modal.Header>Review Image</Modal.Header>
        <Modal.Body>
          {selectedImages.length > 0 && (
            <img
              src={selectedImages[selectedImageIndex]}
              alt={`Review image ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
