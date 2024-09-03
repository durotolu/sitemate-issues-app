import React, { useEffect, useState } from 'react';
import { getIssues, Issue } from '../services/api';
import IssueItem from './IssueItem';
import IssueForm from './IssueForm';

const IssueList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const data = await getIssues();
    setIssues(data);
  };

  const handleIssueCreated = () => {
    fetchIssues()
  };

  const handleIssueDeleted = () => {
    fetchIssues()
  };

  const handleIssueUpdated = () => {
    fetchIssues()
  };

  return (
    <div className="issue-list">
      <h2>Issues</h2>
      <div className="issue-list-lists">
        {issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onIssueDeleted={handleIssueDeleted}
            onIssueUpdated={handleIssueUpdated}
          />
        ))}
      </div>
      <IssueForm onIssueCreated={handleIssueCreated} />
    </div>
  );
};

export default IssueList;
