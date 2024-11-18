import React from 'react';
import { 
  GitBranch, 
  MessageSquare, 
  Bug, 
  FileCode, 
  CheckCircle2, 
  AlertCircle,
  Book,
  Users
} from 'lucide-react';

const ContributionSection = ({ icon: Icon, title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-6">
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Icon className="h-6 w-6 text-blue-600" />
          {title}
        </h2>
      </div>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

const GuidelineItem = ({ children }) => {
  return (
    <div className="flex items-start gap-2 mb-2">
      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
};

const Contribution = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contributing Guide</h1>
          <p className="text-xl text-gray-600">
            Thank you for considering contributing to our project! This document explains the process for contributing to our codebase.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
          <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
            <AlertCircle className="h-5 w-5" />
            Before You Start
          </div>
          <p className="text-blue-600">
            Please read our Code of Conduct and ensure you have a GitHub account before proceeding.
          </p>
        </div>

        <ContributionSection icon={GitBranch} title="Getting Started">
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

        <ContributionSection icon={FileCode} title="Development Process">
          <div className="space-y-3">
            <GuidelineItem>
              Ensure your code follows our style guide and coding conventions
            </GuidelineItem>
            <GuidelineItem>
              Write clear, commented code and update documentation as needed
            </GuidelineItem>
            <GuidelineItem>
              Include unit tests for new features
            </GuidelineItem>
            <pre className="bg-gray-100 p-2 rounded-md mt-4 overflow-x-auto">
              npm install
              npm run test
            </pre>
          </div>
        </ContributionSection>

        <ContributionSection icon={Bug} title="Reporting Bugs">
          <div className="space-y-3">
            <p>Before submitting a bug report, please:</p>
            <ul className="list-disc ml-4 space-y-2">
              <li>Check the issue tracker for existing reports</li>
              <li>Verify the bug still exists in the latest version</li>
              <li>Collect relevant information about your environment</li>
            </ul>
            <div className="bg-gray-100 p-4 rounded mt-4">
              Use the bug report template when creating a new issue
            </div>
          </div>
        </ContributionSection>

        <ContributionSection icon={MessageSquare} title="Pull Request Process">
          <div className="space-y-4">
            <ol className="list-decimal ml-4 space-y-3">
              <li>Update the documentation with details of your changes</li>
              <li>Add tests for your modifications</li>
              <li>Ensure the test suite passes</li>
              <li>Update the CHANGELOG.md with a note describing your changes</li>
            </ol>
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <p className="text-blue-800">
                Pull requests require two approvals from core maintainers before being merged.
              </p>
            </div>
          </div>
        </ContributionSection>

        <ContributionSection icon={Book} title="Documentation">
          <div className="space-y-3">
            <GuidelineItem>
              Document any new features or API changes
            </GuidelineItem>
            <GuidelineItem>
              Update README.md if needed
            </GuidelineItem>
            <GuidelineItem>
              Include JSDoc comments for new functions and components
            </GuidelineItem>
          </div>
        </ContributionSection>

        <ContributionSection icon={Users} title="Community">
          <div className="space-y-4">
            <p>Get involved with our community:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-2">Discord Community</h3>
                <p className="text-gray-600">Join our Discord for real-time discussions</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-2">GitHub Discussions</h3>
                <p className="text-gray-600">Participate in longer-form conversations</p>
              </div>
            </div>
          </div>
        </ContributionSection>
      </div>
    </div>
  );
};

export default Contribution;