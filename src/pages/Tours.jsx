import { useState, useEffect } from "react";
import TourCard from "../components/shared/TourCard";
import "../styles/global.css";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tours/gettours?page=${page}`);
        const data = await res.json();

        if (res.ok) {
          setTours(data.tours);

          const pages = Math.ceil((data.totalTours || 0) / 8); // Assuming 8 items per page
          setPageCount(pages);
        } else {
          setError(data.message || "Failed to fetch tours");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <div className="h-72 flex text-center justify-center items-center text-4xl">
        All Tours
      </div>
      <section>
        <div className="container mx-auto px-4">
          {/* Add search/filter functionality here if needed */}
        </div>
      </section>
      <section className="pt-0 mt-3">
        <div className="container mx-auto px-4">
          {loading && <h4 className="text-center py-5">Loading...</h4>}
          {error && <h4 className="text-center py-5 text-red-500">{error}</h4>}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tours?.map((tour) => (
                  <TourCard tour={tour} key={tour._id} />
                ))}
              </div>

              <div className="flex justify-center mt-6 gap-2">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={`cursor-pointer px-3 py-1 border rounded ${
                      page === number ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Tours;
