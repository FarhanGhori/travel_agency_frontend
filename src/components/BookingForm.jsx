import React, { useState } from 'react';

const BookingForm = ({ price }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        travelers: 1,
        specialRequest: '',
        title: '', // Add title to the form data
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare booking data
        const bookingData = { ...formData };

        try {
            // Make a POST request using fetch
            console.log(bookingData);
            const response = await fetch('https://travel-agency-backend-1.onrender.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to create booking');
            }

            const result = await response.json();
            alert('Booking successfully created!');
            console.log('Booking Response:', result);

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                travelers: 1,
                specialRequest: '',
                title: '',
            });
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
            <div>
                <label className="block">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    className="w-full p-2 border"
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="w-full p-2 border"
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full p-2 border"
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block">Phone Number</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    className="w-full p-2 border"
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block">Number of Travelers</label>
                <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    className="w-full p-2 border"
                    min="1"
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block">Special Requests</label>
                <textarea
                    name="specialRequest"
                    value={formData.specialRequest}
                    className="w-full p-2 border"
                    onChange={handleChange}
                ></textarea>
            </div>
            <button
                type="submit"
                className={`${
                    isSubmitting ? 'bg-gray-400' : 'bg-green-600'
                } text-white px-4 py-2 rounded mt-4`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Book Now'}
            </button>
        </form>
    );
};

export default BookingForm;