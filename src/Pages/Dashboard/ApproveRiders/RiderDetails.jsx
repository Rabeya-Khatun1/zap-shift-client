import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCheckCircle } from "react-icons/fa";

const RiderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/riders/${id}`)
      .then(res => {
        setRider(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);


  if (loading)
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );

  if (!rider) return <p className="text-center text-red-500">No rider found.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-secondary mb-8 text-center tracking-wide">
        Rider Full Details
      </h2>

      {/* Card */}
      <div className="bg-white shadow-2xl rounded-xl p-8 border border-gray-200">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-secondary text-white p-4 rounded-full text-3xl">
            <FaUser />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{rider.name}</h3>
            <p className="text-gray-500">{rider.email}</p>
          </div>
        </div>

        {/* Details Table */}
        <table className="table w-full">
          <tbody className="text-lg">

            <tr className="hover">
              <th className="font-semibold w-1/3">Email</th>
              <td className="flex items-center gap-2">
                <FaEnvelope /> {rider.email}
              </td>
            </tr>

            <tr className="hover">
              <th className="font-semibold">Phone</th>
              <td className="flex items-center gap-2">
                <FaPhone /> {rider.phone || "N/A"}
              </td>
            </tr>

            <tr className="hover">
              <th className="font-semibold">District</th>
              <td className="flex items-center gap-2">
                <FaMapMarkerAlt /> {rider.district}
              </td>
            </tr>

            <tr className="hover">
              <th className="font-semibold">Status</th>
              <td>
                <span
                  className={`px-3 py-1 text-sm font-bold rounded-full ${
                    rider.status === "approved"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {rider.status}
                </span>
              </td>
            </tr>

            <tr className="hover">
              <th className="font-semibold">Joined</th>
              <td>{new Date(rider.createdAt).toLocaleString()}</td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default RiderDetails;
