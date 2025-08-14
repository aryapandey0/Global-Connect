import React, { useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    description: "Work with React and Tailwind to build modern UIs.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "InnovateX",
    location: "Bangalore",
    description: "Node.js, Express, and MongoDB experience required.",
  },
];

export default function Job() {
  const [jobs] = useState(mockJobs);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-700">Job Listings</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-orange-100 bg-opacity-60 backdrop-blur shadow-lg rounded-xl p-4 border border-orange-200"
          >
            <div className="font-semibold text-lg text-orange-800">{job.title}</div>
            <div className="text-orange-600">{job.company} &middot; {job.location}</div>
            <div className="mt-2 text-gray-700">{job.description}</div>
            <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}