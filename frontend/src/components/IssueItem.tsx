import React, { useState } from 'react';
import { Issue, deleteIssue, updateIssue } from '../services/api';

interface IssueItemProps {
  issue: Issue;
  onIssueDeleted: (id: number) => void;
  onIssueUpdated: (issue: Issue) => void;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue, onIssueDeleted, onIssueUpdated }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);

  const handleDelete = async () => {
    await deleteIssue(issue.id);
    onIssueDeleted(issue.id);
  };

  const handleUpdate = async () => {
    const updated = await updateIssue(issue.id, { title, description });
    onIssueUpdated(updated);
    setIsEditing(false);
  };

  return (
    <div className="issue-item">
      <div className="issue-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>{issue.title}</h3>
      </div>
      {isExpanded && (
        <div className="issue-details">
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <div className='desc'>
              <p>{issue.description}</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueItem;
