// src/routes.ts
import { Router, Request, Response } from 'express';
import { initializeDB } from './db';

const router = Router();
let db: any;

// Initialize DB
initializeDB().then(database => {
  db = database;
});

// Create Issue
router.post('/issues', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const result = await db.run('INSERT INTO issues (title, description) VALUES (?, ?)', [title, description]);
  const newIssue = { id: result.lastID, title, description };
  console.log('Created Issue:', newIssue);
  res.status(201).json(newIssue);
});

// Read All Issues
router.get('/issues', async (_req: Request, res: Response) => {
  const issues = await db.all('SELECT * FROM issues');
  res.json(issues);
});

// Update Issue
router.put('/issues/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await db.run('UPDATE issues SET title = ?, description = ? WHERE id = ?', [title, description, id]);
  const updatedIssue = { id: Number(id), title, description };
  console.log('Updated Issue:', updatedIssue);
  res.json(updatedIssue);
});

// Delete Issue
router.delete('/issues/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.run('DELETE FROM issues WHERE id = ?', [id]);
  console.log(`Deleted Issue with ID: ${id}`);
  res.status(204).send();
});

export default router;
