import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import IssueItem from './IssueItem';
import { deleteIssue, updateIssue } from '../services/api';
import { Issue } from '../services/api';

jest.mock('../services/api');

describe('IssueItem', () => {
  const issue: Issue = { id: 1, title: 'Test Issue', description: 'Test Description' };
  const onIssueDeleted = jest.fn();
  const onIssueUpdated = jest.fn();

  it('displays issue title and toggles details', () => {
    render(<IssueItem issue={issue} onIssueDeleted={onIssueDeleted} onIssueUpdated={onIssueUpdated} />);
    expect(screen.getByText(/Test Issue/i)).toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(/Test Issue/i));
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText(/Test Issue/i));
    expect(screen.queryByText(/Test Description/i)).not.toBeInTheDocument();
  });

  it('calls deleteIssue on delete', () => {
    (deleteIssue as jest.Mock).mockResolvedValue(undefined);
    render(<IssueItem issue={issue} onIssueDeleted={onIssueDeleted} onIssueUpdated={onIssueUpdated} />);

    fireEvent.click(screen.getByText(/Test Issue/i));
    fireEvent.click(screen.getByText(/Delete/i));

    expect(deleteIssue).toHaveBeenCalledWith(1);
  });

  it('calls updateIssue on update', () => {
    const updatedIssue = { id: 1, title: 'Updated', description: 'Updated Description' };
    (updateIssue as jest.Mock).mockResolvedValue(updatedIssue);
    render(<IssueItem issue={issue} onIssueDeleted={onIssueDeleted} onIssueUpdated={onIssueUpdated} />);

    fireEvent.click(screen.getByText(/Test Issue/i));
    fireEvent.click(screen.getByText(/Edit/i));

    fireEvent.change(screen.getByDisplayValue(/Test Issue/i), { target: { value: 'Updated' } });
    fireEvent.change(screen.getByDisplayValue(/Test Description/i), { target: { value: 'Updated Description' } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(updateIssue).toHaveBeenCalledWith(1, { title: 'Updated', description: 'Updated Description' });
    expect(onIssueUpdated).toHaveBeenCalledWith(updatedIssue);
  });
});
