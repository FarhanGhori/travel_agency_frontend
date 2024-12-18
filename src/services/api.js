import axios from 'axios';

const API_URL = 'https://travel-agency-backend-1.onrender.com';

// Fetch all packages
export const fetchPackages = async () => {
    const response = await axios.get(`${API_URL}/packages`);
    return response.data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
};

// Create a new package (Admin)
export const createPackage = async (packageData) => {
    const response = await axios.post(`${API_URL}/admin/packages`, packageData);
    return response.data;
};

// Update a package (Admin) - Correct URL for updating a package
export const updatePackage = async (packageTitle, updateData) => {
    const response = await axios.put(`${API_URL}/admin/packages/${packageTitle}`, updateData);
    return response.data;
};

// Delete a package (Admin) - Correct URL for deleting a package
export const deletePackage = async (packageTitle) => {
    const response = await axios.delete(`${API_URL}/admin/packages/${packageTitle}`);
    return response.data;
};
