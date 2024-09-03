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

  const handleIssueCreated = (issue: Issue) => {
    setIssues([...issues, issue]);
  };

  const handleIssueDeleted = (id: number) => {
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  const handleIssueUpdated = (updatedIssue: Issue) => {
    setIssues(
      issues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
    );
  };

  return (
    <div className="issue-list">
      <h2>Issues</h2>
      {issues.map((issue) => (
        <IssueItem
          key={issue.id}
          issue={issue}
          onIssueDeleted={handleIssueDeleted}
          onIssueUpdated={handleIssueUpdated}
        />
      ))}
      <IssueForm onIssueCreated={handleIssueCreated} />
    </div>
  );
};

export default IssueList;
