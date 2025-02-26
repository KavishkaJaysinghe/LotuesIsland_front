/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Form, FormGroup, Button } from 'reactstrap';
import { BASE_URL } from '../../utils/config';

const FtourBooking = ({ tour, onBookingUpdate }) => {
  const { title } = tour;

  const [booking, setBooking] = useState({
    tourName: title,
    fullName: '',
    phone: '',
    email: '',
    guestSize: 1,
    bookAt: '',
    vehicleType: '',
    vehicles: '',
    accommodationType: '',
    bedrooms: '',
    preferences: '',
    otherHotelType: '',
  });

  const [selectedType, setSelectedType] = useState('');
  const [selectedStar, setSelectedStar] = useState('');
  const [error, setError] = useState('');

  // Function to update form state on change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  // Update the selected vehicle or accommodation type
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === 'vehicleType') {
      setSelectedType(value);
      setBooking((prev) => ({ ...prev, vehicleType: value }));
    } else if (name === 'accommodationType') {
      setSelectedStar(value);
      setBooking((prev) => ({ ...prev, accommodationType: value }));
    }
  };

  // Validate form before submitting
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!booking.fullName.trim()) return setError('Full Name is required.');
    if (!booking.phone || isNaN(booking.phone)) return setError('Enter a valid phone number.');
    if (!booking.email.trim() || !emailRegex.test(booking.email)) return setError('Enter a valid email address.');
    if (!booking.bookAt) return setError('Booking Date is required.');
    if (!booking.guestSize || booking.guestSize < 1) return setError('Guests must be at least 1.');
    if (!booking.vehicles || booking.vehicles < 1) return setError('Vehicles must be at least 1.');
    if (!booking.bedrooms || booking.bedrooms < 1) return setError('Bedrooms must be at least 1.');
    if (booking.accommodationType === 'other' && !booking.otherHotelType.trim()) {
      return setError('Specify the hotel type.');
    }
  
    setError('');
    return true;
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      alert('Booking successful!');
      onBookingUpdate(booking); // Pass data to parent
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Send live updates to parent component
  useEffect(() => {
    onBookingUpdate(booking);
  }, [booking, onBookingUpdate]);

  return (
    <div >
      <div className="pb-6 border-b border-gray-300">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      {/* Booking Form */}
      <div className="pt-6">
        <h5 className="mb-4 font-semibold text-lg">Information</h5>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Form className="p-4 border border-gray-300 rounded-lg space-y-4" onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="fullName" className="text-sm text-gray-600">Full Name</label>
            <input type="text" id="fullName" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone" className="text-sm text-gray-600">Phone</label>
            <input type="number" id="phone" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input type="text" id="email" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="bookAt" className="text-sm text-gray-600">Booking Date</label>
            <input type="date" id="bookAt" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="guestSize" className="text-sm text-gray-600">Number of Guests</label>
            <input type="number" id="guestSize" min="1" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="vehicleType" className="text-sm text-gray-600">Vehicle Type</label>
            <select id="vehicleType" name="vehicleType" value={selectedType} onChange={handleSelectChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
              <option value="" disabled>Select a Vehicle Type</option>
              <option value="Sedan">Sedan</option>
              <option value="Sedan-VIP">Sedan-VIP</option>
              <option value="SUV">SUV</option>
              <option value="SUV-VIP">SUV-VIP</option>
              <option value="High-Roof-Van">High Roof Van</option>
              <option value="Bus">Bus</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="vehicles" className="text-sm text-gray-600">Number of Vehicles</label>
            <input type="number" id="vehicles" min="1" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="accommodationType" className="text-sm text-gray-600">Hotel Star Class</label>
            <select id="accommodationType" name="accommodationType" value={selectedStar} onChange={handleSelectChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
              <option value="" disabled>Select Accommodation Type</option>
              <option value="other">Other (please specify)</option>
              <option value="1_star">1 Star ⭐</option>
              <option value="2_star">2 Stars ⭐⭐</option>
              <option value="3_star">3 Stars ⭐⭐⭐</option>
              <option value="4_star">4 Stars ⭐⭐⭐⭐</option>
              <option value="5_star">5 Stars ⭐⭐⭐⭐⭐</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label htmlFor="bedrooms" className="text-sm text-gray-600">Number of Bedrooms</label>
            <input type="number" id="bedrooms" min="1" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="preferences" className="text-sm text-gray-600">Preferences</label>
            <textarea id="preferences" rows="4" placeholder="Enter special requests" required onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"></textarea>
          </FormGroup>

          {/* <Button type="submit" className="w-full mt-4 bg-[#F4AC20] text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Inquire Now
          </Button> */}
        </Form>
      </div>
    </div>
  );
};

export default FtourBooking;
