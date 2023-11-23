import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebcamScreen from './webcam';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ChatList from './components/ChatList';
import FakeReviews from './components/FakeReviews';
import DynamicPricing from './components/DynamicPricing';
import Recommend from './components/Recommend';

function App() {
  return (
    <Router>
    <div className='App'>
      <Header />
      <main >
      <Routes>
          <Route path="/webcam" element={<WebcamScreen />} exact/>
          <Route path="/chatbot" element={<ChatList />} exact />
          <Route path="/fakereviews" element={<FakeReviews />} exact />
          <Route path='/dynamic' element={<DynamicPricing/>} exact />
          <Route path='/recommend' element={<Recommend/>} exact />
          <Route path="/" element={<ChatList />} exact/>
      </Routes>
      </main>
    </div>
    </Router>
  );
}

export default App;
