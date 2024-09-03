import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initializeDB = async () => {
  const db = await open({
    filename: './issues.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL
    )
  `);

  return db;
};
