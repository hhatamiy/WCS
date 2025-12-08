import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import './AuthPages.css';

function AccountSettingsPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('jwt');
      const response = await api.post('/auth/update', {
        token,
        password,
      });
      
      // Navigate to predictor
      navigate('/predictor');
    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Update failed. Please try again.';
      setError(errorMessage);
      
      // Check if it's a network error
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const response = await api.post('/auth/delete', {
        token
      });
      // Clear token and navigate to login
      localStorage.removeItem('jwt');
      navigate('/login');
    } catch (err) {
      console.error('Delete error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Delete failed. Please try again.';
      setError(errorMessage);
      
      // Check if it's a network error
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
      <div className="auth-card">
        <button type="delete-account" onClick={handleDelete} className="delete-account-btn">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default AccountSettingsPage;

