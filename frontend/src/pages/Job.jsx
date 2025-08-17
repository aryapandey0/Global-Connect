import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from backend
    axios
      .get("http://localhost:5000/api/jobs") // 👈 update with your backend URL
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-700">Job Listings</h1>

      {loading ? (
        <p className="text-gray-500">Loading jobs...</p>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-orange-100 bg-opacity-60 backdrop-blur shadow-lg rounded-xl p-4 border border-orange-200"
            >
              <div className="font-semibold text-lg text-orange-800">{job.title}</div>
              <div className="text-orange-600">
                {job.company} &middot; {job.location}
              </div>
              <div className="mt-2 text-gray-700">{job.description}</div>
              <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No jobs available yet.</p>
      )}
    </div>
  );
}
