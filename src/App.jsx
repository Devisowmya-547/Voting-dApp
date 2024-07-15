import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Main from './components/main/Main';
import Vote from './components/vote/Vote';
import Candidate from './components/candidate/Candidate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<Main />}/>
        <Route path='/vote' element={<Vote />}/>
        <Route path='/candidate' element={<Candidate />}/>
      </Routes>
    </Router>
  );
}

export default App;