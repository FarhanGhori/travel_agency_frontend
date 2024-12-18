import React, { useEffect, useState } from 'react';
import { fetchPackages } from '../services/api';
import PackageCard from '../components/PackageCard';


function HomePage() {
    const [packages, setPackages] = useState([]);

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

    return (
        
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold mb-4">Available Packages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                    <PackageCard key={pkg._id} pkg={pkg} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
