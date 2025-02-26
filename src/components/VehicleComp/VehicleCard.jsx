import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle, onSelect }) {
  return (
    <div className="border border-[#F4AC20] hover:border-2 group relative w-full h-[300px] overflow-hidden rounded-lg sm:w-[300px] transition-all">
      <div onClick={() => onSelect(vehicle)}>
        <img 
          src={vehicle.image} 
          alt="vehicle cover" 
          className="h-[200px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20" 
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <p className="text-center text-xl font-semibold line-clamp-2">{vehicle.title}</p>

        {/* Hidden button container, shown only on hover */}
        <div className="absolute bottom-8 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <Link
            to="#"
            className="block border border-[#F4AC20] text-white bg-[#F4AC20] transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
}
