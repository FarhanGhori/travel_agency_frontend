import React, { useState, useEffect } from 'react';
import { fetchPackages, fetchBookings, createPackage, deletePackage } from '../services/api'; // Assuming API functions for managing data
import BookingList from './BookingList'; // Displays the list of bookings
import PackageCard from './PackageCard'; // Displays individual package details

const AdminPanel = () => {
    // State variables for package creation form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Fetch packages and bookings on page load
    useEffect(() => {
        loadPackages();
        loadBookings();
    }, []);

    // Fetch all packages
    const loadPackages = async () => {
        try {
            const data = await fetchPackages();
            setPackages(data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    // Fetch all bookings
    const loadBookings = async () => {
        try {
            const data = await fetchBookings();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    // Handle the submission of a new package
    const handleAddPackage = async (e) => {
        e.preventDefault();
        const newPackage = { title, description, price, imageUrl };
        try {
            await createPackage(newPackage);  // Assuming API call to create a new package
            alert('Package added successfully!');
            loadPackages();  // Reload the list of packages
            setTitle('');
            setDescription('');
            setPrice('');
            setImageUrl('');
        } catch (error) {
            console.error('Error adding package:', error);
        }
    };

    // Handle deletion of a package
    const handleDeletePackage = async (packageId) => {
        try {
            console.log(packageId);
            await deletePackage(packageId);  // Assuming API call to delete the package
            alert('Package deleted successfully!');
            loadPackages();  // Reload the list of packages after deletion
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* Add New Package Form */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Add New Package</h2>
                <form onSubmit={handleAddPackage} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Package Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <textarea
                        placeholder="Package Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Package
                    </button>
                </form>
            </section>

            {/* Display All Packages */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">All Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.length === 0 ? (
                        <p>No packages available.</p>
                    ) : (
                        packages.map((pkg) => (
                            <PackageCard key={pkg._id} package={pkg}>
                                <button
                                    onClick={() => handleDeletePackage(pkg._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </PackageCard>
                        ))
                    )}
                </div>
            </section>

            {/* Display Bookings */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
                <BookingList bookings={bookings} />
            </section>
        </div>
    );
};

export default AdminPanel;
