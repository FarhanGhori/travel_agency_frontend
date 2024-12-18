import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingDetails } from '../services/api';  // Assuming an API service to fetch booking details
import generateInvoice from '../utils/generateInvoice';

const Invoice = () => {
    const { bookingId } = useParams(); // Extract bookingId from the URL params
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        // Fetch the booking details based on bookingId
        const fetchBookingDetails = async () => {
            try {
                const response = await getBookingDetails(bookingId);
                setBooking(response);
            } catch (error) {
                console.error("Error fetching booking details", error);
            }
        };
        fetchBookingDetails();
    }, [bookingId]);

    // If booking data is not loaded yet, show a loading message
    if (!booking) {
        return <div>Loading...</div>;
    }

    // Generate the invoice string using the generateInvoice function
    const invoice = generateInvoice(booking);

    return (
        <div className="container mx-auto p-4">
            {/* Invoice Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Booking Invoice</h1>
            </div>

            {/* Invoice Content */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

                {/* Displaying Booking Details in a styled format */}
                <div className="mb-6">
                    <p><strong>Customer Name:</strong> {booking.name}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Phone:</strong> {booking.phone}</p>
                    <p><strong>Travelers:</strong> {booking.travelers}</p>
                    <p><strong>Special Requests:</strong> {booking.specialRequest || 'None'}</p>
                    <p><strong>Package:</strong> {booking.packageId ? booking.packageId.title : 'N/A'}</p>
                    <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                    <p><strong>Date of Booking:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Invoice Text (Formatted) */}
                <div className="border-t pt-4">
                    <pre className="font-mono whitespace-pre-wrap">{invoice}</pre>
                </div>
            </div>

            {/* Print Invoice Button */}
            <div className="mt-6">
                <button 
                    onClick={() => window.print()} 
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Print Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
