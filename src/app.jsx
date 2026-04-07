import React, { useState } from 'react';
import Nav from './components/Nav.jsx';
import Dashboard from './components/Dashboard.jsx';
import Flashcards from './components/Flashcards.jsx';
import Quiz from './components/Quiz.jsx';
import AIChatTutor from './components/AIChatTutor.jsx';
import QuestionGenerator from './components/QuestionGenerator.jsx';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [progress, setProgress] = useState({
    cardsReviewed: 0,
    quizScore: null,
  });

  const renderView = () => {
    switch (view) {
      case 'dashboard':   return <Dashboard setView={setView} progress={progress} />;
      case 'flashcards':  return <Flashcards setProgress={setProgress} />;
      case 'quiz':        return <Quiz setProgress={setProgress} setView={setView} />;
      case 'tutor':       return <AIChatTutor />;
      case 'generator':   return <QuestionGenerator />;
      default:            return <Dashboard setView={setView} progress={progress} />;
    }
  };

  return (
    <>
      <Nav view={view} setView={setView} progress={progress} />
      <main>{renderView()}</main>
    </>
  );
}
