# sitemate-issues-app

This is a full-stack application built with TypeScript that allows users to create, view, update and delete issues. The backend is powered by Node.js and Express, and the frontend is built with React. The application uses SQLite as its database.

> Create Issues: Users can create issues with a title and description.

> View Issues: Users can view a list of all issues.

> Update Issues: Users can view a list of all issues.

> Delete Issues: Users can delete issues by ID.

> Accordion View: Issues are displayed in an accordion, showing the title by default and the description when expanded.

## Built with npm, React and NodeJS

## Install

```sh
git clone https://github.com/durotolu/sitemate-issues-app.git
cd sitemate-issues-app

npm install
npm run install:all
```

## Usage

```sh
npm install
npm run install:all
npm start
```

Spins up local servers on port 3000 and 4000


Example:

```sh
Server is running on port 4000
Local:     http://localhost:3000
```

## API Endpoints

```sh
POST /issues
- Description: Create a new issue.
- Request Body: {
    "title": "Issue Title",
    "description": "Issue description"
  }
- Response: { "id": 1, "title": "Issue Title", "description": "Issue description" }

GET /issues
- Description: Fetch all issues.
- Response: [{
   "id": 1,
   "title": "Issue Title",
   "description": "Issue description",
  }]

DELETE /issues/:id
- Description: Delete a issue by its ID.
```

## Database Schema

```sh
CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);
```

## License

```sh
This project is licensed under the MIT License.
```

## Author

👤 **Modurotolu Olokode**

- Website: [Modurotolu Olokode](https://www.linkedin.com/in/modurotoluolokode/)
- Github: [durotolu](https://github.com/durotolu)