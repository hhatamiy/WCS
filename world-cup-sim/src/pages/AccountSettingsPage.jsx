import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import './AuthPages.css';
import './AccountSettingsPage.css';

function AccountSettingsPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('jwt');
      const response = await api.post('/auth/update', {
        token,
        password,
      });
      
      setSuccess('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
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

  const handleDelete = async () => {
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
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="auth-container">
      <Link to="/predictor" className="back-button-top-left">
        <span className="back-arrow">←</span>
        <span className="back-text">Back</span>
      </Link>
      <div className="account-settings-card">
        <div className="account-settings-header">
          <h2>Account Settings</h2>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="settings-section">
          <div className="section-header">
            <h3>Change Password</h3>
            <p className="section-description">Update your account password</p>
          </div>
          
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter new password"
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>

            <button type="submit" disabled={loading} className="update-btn">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="settings-divider"></div>

        <div className="settings-section danger-section">
          <div className="section-header">
            <h3>Danger Zone</h3>
            <p className="section-description">Permanently delete your account and all associated data</p>
          </div>
          
          {!showDeleteConfirm ? (
            <button 
              type="button" 
              onClick={() => setShowDeleteConfirm(true)} 
              className="delete-account-btn"
              disabled={loading}
            >
              Delete Account
            </button>
          ) : (
            <div className="delete-confirmation">
              <p className="delete-warning">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="delete-actions">
                <button 
                  type="button" 
                  onClick={() => setShowDeleteConfirm(false)} 
                  className="cancel-delete-btn"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleDelete} 
                  className="confirm-delete-btn"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Yes, Delete Account'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;

