import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Comments API
export const commentsAPI = {
  // Get all comments with advanced features
  getAllComments: (params = {}) => 
    api.get('/comments/all', { params }),

  // Get all comments (basic)
  getCommentsBasic: () => 
    api.get('/comments'),

  // Get comments by task
  getCommentsByTask: (taskId) => 
    api.get(`/comments/task/${taskId}`),

  updateComment: (id, commentData) => {
  // For updates, only send the content field as per backend API
  const updateData = {
    content: commentData.content
  };
  return api.put(`/comments/${id}`, updateData);
},
  // Get single comment
  getComment: (id) => 
    api.get(`/comments/${id}`),

  // Create comment
  createComment: (commentData) => 
    api.post('/comments', commentData),

  // Update comment
  updateComment: (id, commentData) => 
    api.put(`/comments/${id}`, commentData),

  // Delete comment
  deleteComment: (id) => 
    api.delete(`/comments/${id}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;