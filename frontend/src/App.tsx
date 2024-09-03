import React from 'react';
import IssueList from './components/IssueList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Issue Tracker</h1>
      <IssueList />
    </div>
  );
};

export default App;
