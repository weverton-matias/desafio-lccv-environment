import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Task from '../views/Task';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}
