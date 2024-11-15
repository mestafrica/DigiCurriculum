import React from 'react';
import {  
  FileCode,  
  AlertCircle,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ContributionSection = ({ icon: Icon, title, children, requiresLogin = false }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 text-xl">
        <Icon className="h-6 w-6 text-blue-600" />
        {title}
      </div>
      <div>
        {requiresLogin ? (
          <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-md">
            <Lock className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800">
              Please <Link to="/devlogin" className="text-blue-600 font-semibold underline">log in</Link> to make a contribution.
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

const Contribution = ({ isAuthenticated }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contributing Guide</h1>
          <p className="text-xl text-gray-600">
            Thank you for considering contributing to our project! This document explains the process for contributing to our codebase.
          </p>
        </div>

        <div className="mb-8 flex items-start gap-2">
          <AlertCircle className="h-5 w-5" />
          <div>
            <h2 className="font-semibold">Before You Start</h2>
            <p>
              Please read our Code of Conduct and ensure you have a GitHub account before proceeding.
            </p>
          </div>
        </div>

        <ContributionSection icon={FileCode} title="Getting Started">
          <ol className="list-decimal ml-4 space-y-3">
            <li>Fork the repository on GitHub</li>
            <li>Clone your fork locally:
              <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                git clone https://github.com/yourusername/project-name.git
              </pre>
            </li>
            <li>Create a new branch for your feature:
              <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-x-auto">
                git checkout -b feature/your-feature-name
              </pre>
            </li>
          </ol>
        </ContributionSection>

        <ContributionSection icon={FileCode} title="Development Process" requiresLogin={!isAuthenticated}>
          <div className="space-y-3">
            <p>Ensure your code follows our style guide and coding conventions</p>
            <p>Write clear, commented code and update documentation as needed</p>
            <p>Include unit tests for new features</p>
            <pre className="bg-gray-100 p-2 rounded-md mt-4 overflow-x-auto">
              npm install
              npm run test
            </pre>
          </div>
        </ContributionSection>

        {/* Additional sections as needed */}
        
      </div>
    </div>
  );
};

export default Contribution;
