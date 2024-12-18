import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPackages } from '../services/api';
import BookingForm from '../components/BookingForm';

const PackageDetailsPage = () => {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        const getPackageDetails = async () => {
            try {
                const packages = await fetchPackages();
                const selectedPackage = packages.find((pkg) => pkg._id === id);
                setPackageDetails(selectedPackage);
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };
        getPackageDetails();
    }, [id]);

    if (!packageDetails) return <p>Loading...</p>;

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-3xl font-bold">{packageDetails.title}</h1>
            <img src={packageDetails.image} alt={packageDetails.title} className="w-full h-64 object-cover rounded mt-4" />
            <p className="mt-4">{packageDetails.description}</p>
            <p className="font-bold text-lg mt-4">Price: ${packageDetails.price}</p>
            <h2 className="text-2xl font-bold mt-6">Book This Package</h2>
            <BookingForm packageId={packageDetails._id} price={packageDetails.price} />
        </div>
    );
};

export default PackageDetailsPage;
