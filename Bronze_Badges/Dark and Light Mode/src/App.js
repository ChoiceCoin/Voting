import { React,useEffect } from "react";
import { Routes, Route, } from "react-router-dom";
import './App.css';
import About from "./pages/about";
import LandingPage from './pages/landingPage';
import Vote from "./pages/votePortal";
import VoteDetailsDashboard from "./sections/voteDetailsDashboard";



function App() {
  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    // particlesJS.load('particles-js', 'assets/particles.json', function() {
    //   console.log('callback - particles.js config loaded');
    // });
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)")
    .matches ? "dark" : "light")

  useEffect(() => {
    if (storedTheme) {
    document.body.setAttribute('class', storedTheme)
    }
    },[storedTheme])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/submit-vote" element={<VoteDetailsDashboard />} />
        </Routes>
    </div>
  );
}

export default App;
