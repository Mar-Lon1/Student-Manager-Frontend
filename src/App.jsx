import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import { UserPlus, LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <Router>
      <nav className="navbar glass">
        <Link to="/" className="navbar-brand">StudentManager</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/signup" className="btn btn-outline">
            <UserPlus size={18} /> Signup
          </Link>
          <Link to="/" className="btn btn-primary">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-student" element={<StudentForm />} />
          <Route path="/edit-student/:id" element={<StudentForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
