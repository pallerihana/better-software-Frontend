import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CommentCard = ({ comment, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(comment._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      // Error is handled in the parent component
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    toast.info('Delete cancelled', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="comment-card">
      {/* Comment Content */}
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

      {/* Metadata */}
      <div className="comment-meta">
        <div className="meta-item">
          <span className="meta-label">Task ID:</span>
          <span className="task-id">{comment.taskId}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">User:</span>
          <span>{comment.userName}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">User ID:</span>
          <span className="user-id">{comment.userId}</span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="comment-timestamps">
        <div>Created: {formatDate(comment.createdAt)}</div>
        <div>Updated: {formatDate(comment.updatedAt)}</div>
      </div>

      {/* Actions */}
      <div className="comment-actions">
        <button
          onClick={() => onEdit(comment)}
          className="btn btn-primary"
        >
          Edit
        </button>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-danger"
          >
            Delete
          </button>
        ) : (
          <div className="delete-confirm">
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="btn btn-danger"
            >
              {deleteLoading ? (
                <>
                  <div className="spinner spinner-small"></div>
                  Deleting...
                </>
              ) : (
                'Confirm'
              )}
            </button>
            <button
              onClick={handleCancelDelete}
              disabled={deleteLoading}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;