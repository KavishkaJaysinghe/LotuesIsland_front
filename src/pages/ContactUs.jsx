import { FaInstagram, FaFacebook, FaDiscord, FaTelegram, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceId = "service_n5fn65z";
    const templateId = "template_9plmw4f";
    const publicKey = "dCidT1IlnL0QbcZ0N";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: 'Renuka',
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully', response);
        setFeedback('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      })
      .catch((error) => {
        console.error('Error sending email', error);
        setFeedback('Failed to send the message. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mb-11 min-h-screen flex items-center bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center p-6">
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-700 dark:text-white mb-6 sm:mb-10">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-teal-400' : 'bg-teal-600'} text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500`}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {feedback && (
          <p className="text-lg mt-4 text-center text-teal-700 dark:text-teal-300">{feedback}</p>
        )}

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-10">
          Reach out to us through various platforms or send us a message directly:
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 sm:mb-20">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-200">
            <FaInstagram className="text-3xl sm:text-5xl" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200">
            <FaFacebook className="text-3xl sm:text-5xl" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-300 hover:text-purple-500 dark:hover:text-purple-200">
            <FaDiscord className="text-3xl sm:text-5xl" />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-200 hover:text-blue-400 dark:hover:text-blue-100">
            <FaTelegram className="text-3xl sm:text-5xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-100 hover:text-blue-300 dark:hover:text-blue-50">
            <FaTwitter className="text-3xl sm:text-5xl" />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-green-500 dark:text-green-300 hover:text-green-400 dark:hover:text-green-200">
            <FaWhatsapp className="text-3xl sm:text-5xl" />
          </a>
          <a href="mailto:info@example.com" className="text-red-600 dark:text-red-300 hover:text-red-500 dark:hover:text-red-200">
            <FaEnvelope className="text-3xl sm:text-5xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
