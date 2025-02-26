/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { BASE_URL } from '../../utils/config'

const Booking = ({tour}) => {
  const { price, title } = tour
  const navigate = useNavigate()
  
  // Get user from Redux store
  const { currentUser } = useSelector((state) => state.user)

  const [booking, setBooking] = useState({
    userId: currentUser?._id,
    userEmail: currentUser?.email,
    tourName: title,
    fullName: currentUser?.username || "",
    phone: "",
    guestSize: 1,
    bookAt: ''
  })

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const servicefee = 10
  const totalAmount = Number(price) + Number(booking.guestSize) + Number(servicefee)

  // send data to server
  const handleClick = async e => {
    e.preventDefault()

    try {
      if (!currentUser) {
        return alert('Please sign in')
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}` // If you're using JWT
        },
        credentials: 'include',
        body: JSON.stringify(booking)
      })

      const result = await res.json()
      if (!res.ok) {
        return alert(result.message)
      }
      
      // If booking successful, navigate to thank you page
      navigate('/thank-you')
    } catch (err) {
      alert(err.message)
    }
  }
  
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input 
              type="text" 
              placeholder='Full Name' 
              id='fullName' 
              required 
              onChange={handleChange}
              defaultValue={currentUser?.username || ''}
            />
          </FormGroup>
          <FormGroup>
            <input 
              type="email" 
              placeholder='Email' 
              id='userEmail' 
              required 
              value={currentUser?.email || ''}
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <input 
              type="number" 
              placeholder='Phone' 
              id='phone' 
              required 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input 
              type="date" 
              placeholder='' 
              id='bookAt' 
              required 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              placeholder='Guest' 
              id='guestSize' 
              required 
              onChange={handleChange} 
            />
          </FormGroup>
        </Form>

        <div className="booking__bottom">
          <ListGroup>
            <ListGroupItem className='border-0 px-0'>
              <h5 className='d-flex align-items-center gap-1'>
                ${price} <i className='ri-close-line'></i> {booking.guestSize} person
              </h5>
              <span>${price * booking.guestSize}</span>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0'>
              <h5>Service Charge</h5>
              <span>${servicefee}</span>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0 total'>
              <h5>Total</h5>
              <span>${totalAmount}</span>
            </ListGroupItem>
          </ListGroup>

          <Button 
            className='btn primary__btn w-100 mt-4' 
            onClick={handleClick}
          >
            {currentUser ? 'Book Now' : 'Please sign in to book'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Booking