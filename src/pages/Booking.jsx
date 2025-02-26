

function Booking() {
  return (
    <div>
      {/* Background Image Section */}
      <div
        className="h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://media.istockphoto.com/id/628660778/photo/early-morning-sunrise-over-sea.jpg?s=612x612&w=0&k=20&c=nlrc6lYpKh8LB1TZPQ3f6rA91TdgbUrgYCmjdzp2XwA=)`,
        }}
      >
        <h1 className="text-6xl font-bold text-white text-center pt-32 font-Aclonica">
          Book Now
        </h1>
      </div>

      {/* Form Section with negative margin */}
      <div className="max-w-lg mx-auto bg-white p-8 mt-8 shadow-lg rounded-lg  relative z-10">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Package Type
            </label>
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none">
              <option>Select your package</option>
              <option>Standard</option>
              <option>Premium</option>
              <option>Deluxe</option>
            </select>
          </div>

          {/* Adult, Children, Room Section */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guests & Rooms
            </label>
            <div className="flex justify-between space-x-4">
              <div className="flex-1">
                <label className="block text-gray-600 text-sm">Adults</label>
                <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 text-sm">Children</label>
                <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none">
                  <option>0 Children</option>
                  <option>1 Child</option>
                  <option>2 Children</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 text-sm">Rooms</label>
                <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none">
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3 Rooms</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Arrival Date & Time
            </label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Departure Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Special Request
            </label>
            <textarea
              placeholder="Type your message here"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#F4AC20] text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              Book
            </button>
          </div>
        </form>
      </div>

      {/* Empty Space to Push Footer */}
      <div className="h-32"></div>
    </div>
  );
}

export default Booking;
