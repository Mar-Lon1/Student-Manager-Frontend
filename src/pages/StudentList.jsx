import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, MapPin, BookOpen, User } from 'lucide-react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/student');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/student/${id}`);
        fetchStudents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="header-actions">
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Students</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage all enrolled students</p>
        </div>
        <Link to="/create-student" className="btn btn-primary">
          <Plus size={18} /> Add Student
        </Link>
      </div>

      {loading ? (
        <div className="empty-state">Loading students...</div>
      ) : students.length === 0 ? (
        <div className="empty-state glass" style={{ borderRadius: '0.75rem' }}>
          <h3>No students found</h3>
          <p>Get started by adding a new student to the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-cols-3">
          {students.map((student) => (
            <div key={student._id} className="card glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="card-title">{student.name} <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>({student.age})</span></h3>
                <span className="badge">{student.gender}</span>
              </div>
              
              <div style={{ marginTop: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="card-subtitle"><BookOpen size={14} /> {student.course}</div>
                <div className="card-subtitle"><MapPin size={14} /> {student.location}</div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <Link to={`/edit-student/${student._id}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                  <Edit2 size={14} /> Edit
                </Link>
                <button onClick={() => handleDelete(student._id)} className="btn btn-danger">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
