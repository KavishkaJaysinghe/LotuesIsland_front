
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TourCard from '../shared/TourCard';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedTourList = () => {
  const navigate = useNavigate();
  const { data: response, loading, error } = useFetch(`${BASE_URL}/tours/gettours`);
  const tours = response?.tours || [];

  // Only take the first 4 tours
  const featuredTours = tours.slice(0, 4);

  return (
    <div className="relative">
      {/* More Tours Button */}
      <div className="absolute right-0 -top-12">
        <button 
          onClick={() => navigate('/tours')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          More Tours
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tours Grid */}
      <div className="flex flex-wrap -mx-2">
        {loading && (
          <div className="w-full text-center py-5">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="w-full text-center py-5">
            <p className="text-lg font-semibold text-red-500">{error}</p>
          </div>
        )}
        
        {!loading && !error && featuredTours.map((tour) => (
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))}

        {/* Empty State */}
        {!loading && !error && featuredTours.length === 0 && (
          <div className="w-full text-center py-5">
            <p className="text-lg font-semibold text-gray-500">No tours available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedTourList;