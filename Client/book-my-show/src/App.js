import logo from './logo.svg';
import './App.css';
import {Browserouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Browserouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Browserouter>
  );
}

export default App;
