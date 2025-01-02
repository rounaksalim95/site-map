import React from 'react';
import { Link } from 'react-router-dom';

const RandomTidBitsPage: React.FC = () => {
  const projects = [
    {
      title: 'Buy vs Rent Calculator',
      description: 'Compare the financial implications of buying vs renting a home over 30 years, taking into account various costs and investment returns.',
      path: '/random-tid-bits/buy-vs-rent',
    },
    // Add more projects here as they are created
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-color)]">Random Tid Bits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link
            key={index}
            to={project.path}
            className="block p-6 bg-[var(--bg-color)] rounded-lg border border-[var(--border-color)] hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-[var(--text-color)]">{project.title}</h2>
            <p className="text-[var(--text-color)]">{project.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomTidBitsPage; 