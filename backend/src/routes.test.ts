// src/routes.test.ts
import request from 'supertest';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

describe('Issue API Endpoints', () => {
  let createdIssueId: number;

  it('should create a new issue', async () => {
    const res = await request(app)
      .post('/api/issues')
      .send({
        title: 'Test Issue',
        description: 'This is a test issue'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Issue');
    createdIssueId = res.body.id;
  });

  it('should fetch all issues', async () => {
    const res = await request(app).get('/api/issues');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update an issue', async () => {
    const res = await request(app)
      .put(`/api/issues/${createdIssueId}`)
      .send({
        title: 'Updated Test Issue',
        description: 'This is an updated test issue'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Test Issue');
  });

  it('should delete an issue', async () => {
    const res = await request(app).delete(`/api/issues/${createdIssueId}`);
    expect(res.statusCode).toEqual(204);
  });
});
