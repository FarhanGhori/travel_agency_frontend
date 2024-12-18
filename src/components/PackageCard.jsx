import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
    return (
        <div className="border p-4 rounded shadow-md">
            <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{pkg.title}</h2>
            <p className="text-gray-700">{pkg.description}</p>
            <p className="font-bold mt-2">${pkg.price}</p>
            <Link to={`/packages/${pkg._id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
                View Details
            </Link>
        </div>
    );
};

export default PackageCard;
