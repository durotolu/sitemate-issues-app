import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import IssueForm from './IssueForm';
import { createIssue } from '../services/api';

jest.mock('../services/api');

describe('IssueForm', () => {
  it('submits form and calls onIssueCreated', async () => {
    const mockIssue = { id: 1, title: 'Test', description: 'Test description' };
    (createIssue as jest.Mock).mockResolvedValue(mockIssue);
    const onIssueCreated = jest.fn();

    render(<IssueForm onIssueCreated={onIssueCreated} />);

    fireEvent.change(screen.getByLabelText(/Title:/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'Test description' } });
    fireEvent.click(screen.getByText(/Create Issue/i));

    expect(createIssue).toHaveBeenCalledWith({ title: 'Test', description: 'Test description' });
  });
});
