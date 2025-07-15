import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/note/:id" element={<NoteDetailsPage />} />
    </Routes>
  );
};

export default App;
