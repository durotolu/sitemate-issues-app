import axios from 'axios';

const API_URL = 'http://localhost:4000/api/issues';

export interface Issue {
  id: number;
  title: string;
  description: string;
}

export const getIssues = async (): Promise<Issue[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createIssue = async (issue: Omit<Issue, 'id'>): Promise<Issue> => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

export const updateIssue = async (id: number, issue: Omit<Issue, 'id'>): Promise<Issue> => {
  const response = await axios.put(`${API_URL}/${id}`, issue);
  return response.data;
};

export const deleteIssue = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
