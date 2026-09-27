import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function StudentForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    course: '',
    gender: 'Male',
    location: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchStudent = async () => {
        try {
          const res = await axios.get(`/student/${id}`);
          setForm(res.data);
        } catch (err) {
          setError('Failed to fetch student data');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`/student/${id}`, form);
      } else {
        await axios.post('/student', form);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="empty-state">Loading data...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="card glass">
        <h2 className="card-title" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h2>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-input" required value={form.name} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Age</label>
              <input type="number" name="age" className="form-input" required value={form.age} onChange={handleChange} min="1" />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Course</label>
              <input type="text" name="course" className="form-input" required value={form.course} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="number" name="phoneNumber" className="form-input" required value={form.phoneNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-select" value={form.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" name="location" className="form-input" required value={form.location} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Student' : 'Save Student')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
