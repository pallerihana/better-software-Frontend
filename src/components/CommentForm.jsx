import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentForm = ({ comment, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    taskId: '',
    userId: '',
    userName: '',
    content: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (comment) {
      setFormData({
        taskId: comment.taskId,
        userId: comment.userId,
        userName: comment.userName,
        content: comment.content
      });
    }
  }, [comment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // For new comments, validate all fields
    if (!comment) {
      if (!formData.taskId.trim()) {
        newErrors.taskId = 'Task ID is required';
        toast.error('Task ID is required!', {
          position: "top-right",
          autoClose: 3000,
        });
      }

      if (!formData.userId.trim()) {
        newErrors.userId = 'User ID is required';
        toast.error('User ID is required!', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }

    // Always validate these fields
    if (!formData.userName.trim()) {
      newErrors.userName = 'User name is required';
      toast.error('User name is required!', {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (formData.userName.length > 100) {
      newErrors.userName = 'User name cannot exceed 100 characters';
      toast.error('User name cannot exceed 100 characters!', {
        position: "top-right",
        autoClose: 3000,
      });
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Comment content is required';
      toast.error('Comment content is required!', {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Comment cannot exceed 1000 characters';
      toast.error('Comment cannot exceed 1000 characters!', {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // For editing, only send the content field
      if (comment) {
        const updateData = {
          content: formData.content
        };
        onSubmit(updateData);
      } else {
        // For new comments, send all fields
        onSubmit(formData);
      }
    }
  };

  const characterCount = formData.content.length;
  const maxCharacters = 1000;
  const isCharCountWarning = characterCount > maxCharacters;

  return (
    <div className="comment-form">
      <h2>{comment ? 'Edit Comment' : 'Add New Comment'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Task ID - Only show for new comments */}
          {!comment && (
            <div className="form-group">
              <label htmlFor="taskId" className="form-label required">
                Task ID
              </label>
              <input
                type="text"
                id="taskId"
                name="taskId"
                value={formData.taskId}
                onChange={handleChange}
                className={`form-input ${errors.taskId ? 'error' : ''}`}
                placeholder="Enter task ID"
              />
              {errors.taskId && (
                <div className="error-message">{errors.taskId}</div>
              )}
            </div>
          )}

          {/* User ID - Only show for new comments */}
          {!comment && (
            <div className="form-group">
              <label htmlFor="userId" className="form-label required">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className={`form-input ${errors.userId ? 'error' : ''}`}
                placeholder="Enter user ID"
              />
              {errors.userId && (
                <div className="error-message">{errors.userId}</div>
              )}
            </div>
          )}
        </div>

        {/* User Name - Show for both, but only editable for new comments */}
        <div className="form-group">
          <label htmlFor="userName" className="form-label required">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            disabled={!!comment} // Disable for editing
            className={`form-input ${errors.userName ? 'error' : ''}`}
            placeholder="Enter user name"
          />
          {errors.userName && (
            <div className="error-message">{errors.userName}</div>
          )}
          {comment && (
            <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
              User name cannot be changed for existing comments
            </div>
          )}
        </div>

        {/* Content - Always editable */}
        <div className="form-group">
          <label htmlFor="content" className="form-label required">
            Comment Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className={`form-textarea ${errors.content ? 'error' : ''}`}
            placeholder="Enter your comment..."
          />
          <div className={`char-count ${isCharCountWarning ? 'warning' : ''}`}>
            {characterCount}/{maxCharacters}
          </div>
          {errors.content && (
            <div className="error-message">{errors.content}</div>
          )}
        </div>

        {/* Read-only fields for editing mode */}
        {comment && (
          <div className="read-only-fields" style={{ 
            backgroundColor: '#f7fafc', 
            padding: '1rem', 
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#4a5568' }}>Comment Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <strong>Task ID:</strong>
                <div style={{ 
                  backgroundColor: '#ebf8ff', 
                  color: '#3182ce', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem',
                  marginTop: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  {comment.taskId}
                </div>
              </div>
              <div>
                <strong>User ID:</strong>
                <div style={{ 
                  backgroundColor: '#f7fafc', 
                  color: '#4a5568', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem',
                  marginTop: '0.25rem',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}>
                  {comment.userId}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading && <div className="spinner spinner-small"></div>}
            {comment ? 'Update Comment' : 'Create Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;