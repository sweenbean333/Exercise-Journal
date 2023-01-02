import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import AddExercisePage from './pages/AddExercisePage';
import { useState} from 'react';
import {Navigation} from './components/Navigation'


function App() {
  const [exerciseToUpdate, setExerciseToUpdate] = useState();

  return (
    <div className="App">
      <header>
        <h1>Full-Stack MERN App</h1>
        <p>This is a full-stack app that allows users to create, update, and delete exercises.</p>
        <p>The front end is connected to the back end through a REST API</p>
      </header>
      <Router>
      <Navigation/>
        <div className="App-header">
          <Routes>
            <Route path="/" exact element={<HomePage setExerciseToUpdate={setExerciseToUpdate} />}></Route>
            <Route path="/add-exercise" element={<AddExercisePage />}></Route>
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToUpdate={exerciseToUpdate} />}></Route>
          </Routes>  
        </div>
      </Router>
      <footer>
        <p><span>&copy;</span>2022 Bryshon Sweeney.</p>
      </footer>
    </div>
    
  );
}

export default App;
