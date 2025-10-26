import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useComments } from './hooks/useComments';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import SearchFilter from './components/SearchFilter';
import Pagination from './components/Pagination';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {
    comments,
    loading,
    error,
    pagination,
    filters,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    setFilters
  } = useComments();

  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchComments(newFilters);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: '',
      taskId: ''
    };
    setFilters(defaultFilters);
    fetchComments(defaultFilters);
    toast.info('Filters reset to default', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handlePageChange = (page) => {
    handleFilterChange({ ...filters, page });
  };

  const handleCreateComment = async (commentData) => {
    setFormLoading(true);
    setFormError('');
    
    try {
      await createComment(commentData);
      setShowForm(false);
      toast.success('Comment created successfully! 🎉', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setFormError(err.message);
      toast.error(`Failed to create comment: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditComment = async (commentData) => {
    setFormLoading(true);
    setFormError('');
    
    try {
      await updateComment(editingComment._id, commentData);
      setEditingComment(null);
      toast.success('Comment updated successfully! ✨', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      setFormError(err.message);
      toast.error(`Failed to update comment: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success('Comment deleted successfully! 🗑️', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to delete comment: ${err.message}`, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const handleFormSubmit = (commentData) => {
    if (editingComment) {
      handleEditComment(commentData);
    } else {
      handleCreateComment(commentData);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingComment(null);
    setFormError('');
    toast.info('Operation cancelled', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setShowForm(true);
    setFormError('');
  };

  return (
    <div className="app">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Task Comments Manager</h1>
            <p className="header-subtitle">Manage and organize task comments</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingComment(null);
              setFormError('');
            }}
            className="btn btn-primary"
          >
            Add Comment
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Search and Filters */}
        <SearchFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Form Error */}
        {formError && (
          <div className="error-container mb-4">
            <div className="text-error">{formError}</div>
          </div>
        )}

        {/* Comment Form */}
        {(showForm || editingComment) && (
          <div className="mb-4">
            <CommentForm
              comment={editingComment}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              loading={formLoading}
            />
          </div>
        )}

        {/* Comments List */}
        <CommentList
          comments={comments}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteComment}
        />

        {/* Pagination */}
        {!loading && comments.length > 0 && (
          <Pagination
            pagination={pagination}
            filters={filters}
            onPageChange={handlePageChange}
          />
        )}

        {/* Stats */}
        {!loading && comments.length > 0 && (
          <div className="stats">
            Showing {comments.length} of {pagination.totalRecords} comments
            {filters.search && ` matching "${filters.search}"`}
            {filters.taskId && ` for task "${filters.taskId}"`}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;