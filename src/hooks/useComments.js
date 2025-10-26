import { useState, useEffect } from 'react';
import { commentsAPI } from '../services/api';

export const useComments = (initialParams = {}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
    taskId: '',
    ...initialParams
  });

  const fetchComments = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await commentsAPI.getAllComments({ ...filters, ...params });
      setComments(response.data.data);
      setPagination(response.data.pagination);
      setFilters(prev => ({ ...prev, ...params }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData) => {
    try {
      const response = await commentsAPI.createComment(commentData);
      await fetchComments(); // Refresh the list
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create comment');
    }
  };

  const updateComment = async (id, commentData) => {
    try {
      const response = await commentsAPI.updateComment(id, commentData);
      await fetchComments(); // Refresh the list
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update comment');
    }
  };

  const deleteComment = async (id) => {
    try {
      await commentsAPI.deleteComment(id);
      await fetchComments(); // Refresh the list
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return {
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
  };
};