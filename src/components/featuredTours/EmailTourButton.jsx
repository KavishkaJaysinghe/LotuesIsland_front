/* eslint-disable react/prop-types */
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import TourPDFDocument from './TourPdfDoc';
import { BASE_URL } from '../../utils/config';

const EmailTourButton = ({ tour, destinationList, bookingData }) => {
  const [isSending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  // Grab email from bookingData
  const userEmail = bookingData?.email || '';

  const generatePdfBase64 = async (pdfDoc) => {
    try {
      const pdfBlob = await pdf(pdfDoc).toBlob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result.split(',')[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(pdfBlob);
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF');
    }
  };

  const handleSendEmail = async () => {
    // Reset error message
    setErrorMessage('');

    // Check if userEmail is provided
    if (!userEmail) {
      setErrorMessage('Email address is required'); // Set error message
      return;
    }

    try {
      setSending(true);

      // Generate PDF document
      const pdfDoc = (
        <TourPDFDocument 
          tour={tour} 
          destinationList={destinationList} 
          bookingData={bookingData} 
        />
      );

      // Convert to base64
      const base64data = await generatePdfBase64(pdfDoc);

      // Send email
      const response = await fetch(`${BASE_URL}/tours/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          tour,
          destinationList,
          bookingData,
          pdfBuffer: base64data
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server error occurred');
      }

      alert('Tour details sent to your email successfully!');
    } catch (error) {
      console.error('Email sending error:', error);
      alert(error.message || 'Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {errorMessage && (
        <p className="text-red-500 mb-2">{errorMessage}</p> // Display error message in red
      )}
      <button
        onClick={handleSendEmail}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        {isSending ? 'Sending...' : 'Send to Email'}
      </button>
    </div>
  );
};

export default EmailTourButton;