import React from 'react';
import CommentCard from './CommentCard';

const CommentList = ({ comments, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner spinner-large"></div>
        <span>Loading comments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="text-error mb-1">Error Loading Comments</div>
        <div className="text-muted">{error}</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="empty-container">
        <h3>No comments found</h3>
        <p>Try adjusting your search filters or create a new comment.</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentCard
          key={comment._id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;