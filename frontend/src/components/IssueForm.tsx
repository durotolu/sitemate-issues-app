import React, { useState } from 'react';
import { createIssue, Issue } from '../services/api';

interface IssueFormProps {
  onIssueCreated: (issue: Issue) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onIssueCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue = await createIssue({ title, description });
    onIssueCreated(newIssue);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="issue-form">
      <h2>Create New Issue</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Create Issue</button>
    </form>
  );
};

export default IssueForm;
