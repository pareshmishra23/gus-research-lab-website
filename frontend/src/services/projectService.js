import axios from 'axios';
import { projects as fallbackProjects } from '../data/projects';

const API_BASE = 'http://localhost:8080/api';

export const getPublicProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE}/projects/public`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return fallbackProjects;
  } catch (error) {
    console.warn('Failed to fetch public projects from API, using static fallback:', error);
    return fallbackProjects;
  }
};

export const getPublicProjectDetail = async (slugOrId) => {
  try {
    const response = await axios.get(`${API_BASE}/projects/public/${slugOrId}`);
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch project detail from API, finding in static fallback:', error);
    return fallbackProjects.find(p => p.id === slugOrId || p.slug === slugOrId) || fallbackProjects[0];
  }
};

// Admin API calls
export const getAdminProjects = async () => {
  const response = await axios.get(`${API_BASE}/projects/admin/all`);
  return response.data;
};

export const getAdminMetrics = async () => {
  const response = await axios.get(`${API_BASE}/projects/admin/metrics`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_BASE}/projects/admin`, projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_BASE}/projects/admin/${id}`, projectData);
  return response.data;
};

export const togglePublishProject = async (id) => {
  const response = await axios.patch(`${API_BASE}/projects/admin/${id}/toggle-publish`);
  return response.data;
};

export const toggleFeaturedProject = async (id) => {
  const response = await axios.patch(`${API_BASE}/projects/admin/${id}/toggle-featured`);
  return response.data;
};

export const reorderProject = async (id, direction) => {
  const response = await axios.patch(`${API_BASE}/projects/admin/${id}/reorder?direction=${direction}`);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${API_BASE}/projects/admin/${id}`);
  return response.data;
};

// Admin User Management API calls
export const getAdminUsers = async () => {
  const response = await axios.get(`${API_BASE}/admin/users`);
  return response.data;
};

export const createAdminUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/admin/users`, userData);
  return response.data;
};

export const toggleUserStatus = async (id, enabled) => {
  const response = await axios.patch(`${API_BASE}/admin/users/${id}/status`, { enabled });
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await axios.put(`${API_BASE}/admin/users/${id}/role`, { role });
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await axios.delete(`${API_BASE}/admin/users/${id}`);
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await axios.get(`${API_BASE}/admin/audit-logs`);
  return response.data;
};
