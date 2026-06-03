import { Routes, Route } from 'react-router-dom';
import WeddingPage from './pages/WeddingPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<WeddingPage />} />
    </Routes>
  );
}
