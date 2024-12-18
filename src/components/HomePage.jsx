import React, { useEffect, useState } from 'react';
import { fetchPackages, createBooking, createPackage, updatePackage, deletePackage } from '../api/api'; // Import API functions

const HomePage = () => {
    const [packages, setPackages] = useState([]);
    const [newBooking, setNewBooking] = useState({ name: '', package: '' });
    const [adminInput, setAdminInput] = useState({ title: '', details: '' });

    
    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        try {
            const data = await fetchPackages();
            setPackages(data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBooking(newBooking);
            alert('Booking Created Successfully!');
            setNewBooking({ name: '', package: '' });
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    
    const handleCreatePackage = async () => {
        try {
            await createPackage({ title: adminInput.title, details: adminInput.details });
            alert('Package Created Successfully!');
            loadPackages();
        } catch (error) {
            console.error('Error creating package:', error);
        }
    };

    
    const handleUpdatePackage = async () => {
        try {
            await updatePackage(adminInput.title, { details: adminInput.details });
            alert('Package Updated Successfully!');
            loadPackages();
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    
    const handleDeletePackage = async () => {
        try {
            await deletePackage(adminInput.title);
            alert('Package Deleted Successfully!');
            loadPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Travel Booking System</h1>

            
            <section>
                <h2>Available Packages</h2>
                <ul>
                    {packages.map((pkg) => (
                        <li key={pkg.id}>
                            <strong>{pkg.title}</strong>: {pkg.details}
                        </li>
                    ))}
                </ul>
            </section>

            
            <section>
                <h2>Book a Package</h2>
                <form onSubmit={handleBookingSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newBooking.name}
                        onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Package Name"
                        value={newBooking.package}
                        onChange={(e) => setNewBooking({ ...newBooking, package: e.target.value })}
                        required
                    />
                    <button type="submit">Create Booking</button>
                </form>
            </section>

            
            <section>
                <h2>Admin Controls</h2>
                <input
                    type="text"
                    placeholder="Package Title"
                    value={adminInput.title}
                    onChange={(e) => setAdminInput({ ...adminInput, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Package Details"
                    value={adminInput.details}
                    onChange={(e) => setAdminInput({ ...adminInput, details: e.target.value })}
                />
                <div>
                    <button onClick={handleCreatePackage}>Create Package</button>
                    <button onClick={handleUpdatePackage}>Update Package</button>
                    <button onClick={handleDeletePackage}>Delete Package</button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
