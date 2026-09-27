import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/signup', form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="card glass">
        <h2 className="card-title" style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create Account</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label"><User size={14} style={{ display:'inline', marginRight:'0.25rem' }}/> Username</label>
            <input type="text" name="username" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label"><Mail size={14} style={{ display:'inline', marginRight:'0.25rem' }}/> Email</label>
            <input type="email" name="email" className="form-input" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label"><Lock size={14} style={{ display:'inline', marginRight:'0.25rem' }}/> Password</label>
            <input type="password" name="password" className="form-input" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
