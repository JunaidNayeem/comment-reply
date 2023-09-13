// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommentSection from "./components/commentSection";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommentSection />} />
      </Routes>
    </Router>
  );
}

export default App;
