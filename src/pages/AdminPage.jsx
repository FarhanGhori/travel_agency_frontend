import React, { useEffect, useState } from 'react';
import { fetchPackages, deletePackage } from '../services/api';

const AdminPage = () => {
    const [packages, setPackages] = useState([]);
    const [newPackage, setNewPackage] = useState({
        title: '',
        description: '',
        price: '',
        availableDates: '',
        image: '',
        
    });

    useEffect(() => {
        const getPackages = async () => {
            try {
                const data = await fetchPackages();
                setPackages(data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        getPackages();
    }, []);

    const handleInputChange = (e) => {
        setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
    };

    const handleAddPackage = async () => {
        try {
            console.log(newPackage);
            const response = await fetch('https://travel-agency-backend-1.onrender.com/admin/packages/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPackage),
            });

            if (!response.ok) {
                throw new Error('Failed to add package');
            }

            alert('Package added successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error adding package:', error);
            alert('Failed to add package.');
        }
    };

    const handleDeletePackage = async (id) => {
        try {
            console.log(`Deleting package with ID: ${id}`);

            await deletePackage(id); 

            alert('Package deleted successfully!');
            setPackages(packages.filter((pkg) => pkg._id !== id)); 
        } catch (error) {
            console.error('Error deleting package:', error);
            alert('Failed to delete package.');
        }
    };

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <h2 className="text-2xl font-bold mt-6">Add New Package</h2>
            <form className="p-4 border rounded mt-4">
                <input type="text" name="title" placeholder="Title" className="w-full p-2 border" onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" className="w-full p-2 border mt-2" onChange={handleInputChange}></textarea>
                <input type="number" name="price" placeholder="Price" className="w-full p-2 border mt-2" onChange={handleInputChange} />
                <input type="text" name="image" placeholder="Image URL" className="w-full p-2 border mt-2" onChange={handleInputChange} />
                <input type="text" name="availableDates" placeholder="Available Dates" className="w-full p-2 border mt-2" onChange={handleInputChange} />
                <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded mt-2" onClick={handleAddPackage}>
                    Add Package
                </button>
            </form>

            <h2 className="text-2xl font-bold mt-6">All Packages</h2>
            <div className="mt-4">
                {packages.map((pkg) => (
                    <div key={pkg._id} className="border p-4 rounded mt-2">
                        <h3 className="font-bold">{pkg.title}</h3>
                        <p>{pkg.description}</p>
                        <p>Price: ${pkg.price}</p>
                        <p>Available Date: {pkg.availableDate}</p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded mt-2" onClick={() => handleDeletePackage(pkg._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;