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

// Site Settings API
export const getPublicSiteSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE}/site-settings`);
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch site settings, returning defaults:', error);
    return {
      siteName: 'GUS Research Lab',
      shortName: 'GUS LAB',
      footerDescription: 'Pioneering scientific breakthroughs through innovation and collaboration.',
      contactEmail: 'info@guslab.res',
      contactPhone: '+1 (555) 123-4567',
      contactAddress: '123 Science Way, Research City',
      heroTitle: 'Pioneering Scientific Discovery',
      heroSubtitle: 'Advancing knowledge through innovative research, collaborative excellence, and cutting-edge technology.',
      primaryCtaLabel: 'Explore Research',
      primaryCtaUrl: '/research',
      secondaryCtaLabel: 'View Projects',
      secondaryCtaUrl: '/research',
      footerLinks: [
        { label: 'Home', url: '/', enabled: true, displayOrder: 1 },
        { label: 'Research', url: '/research', enabled: true, displayOrder: 2 },
        { label: 'Publications', url: '/publications', enabled: true, displayOrder: 3 },
        { label: 'Videos', url: '/videos', enabled: true, displayOrder: 4 },
        { label: 'AI Assistant', url: '/ai-assistant', enabled: true, displayOrder: 5 },
        { label: 'Admin Panel', url: '/admin', enabled: true, displayOrder: 6 }
      ],
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com', enabled: true, displayOrder: 1 },
        { platform: 'LinkedIn', url: 'https://linkedin.com', enabled: true, displayOrder: 2 },
        { platform: 'YouTube', url: 'https://youtube.com', enabled: true, displayOrder: 3 },
        { platform: 'X / Twitter', url: 'https://x.com', enabled: true, displayOrder: 4 }
      ],
      navigationLinks: [
        { label: 'Home', url: '/', enabled: true, displayOrder: 1 },
        { label: 'Research', url: '/research', enabled: true, displayOrder: 2 },
        { label: 'Blog', url: '/blog', enabled: true, displayOrder: 3 },
        { label: 'Publications', url: '/publications', enabled: true, displayOrder: 4 },
        { label: 'Videos', url: '/videos', enabled: true, displayOrder: 5 },
        { label: 'AI Assistant', url: '/ai-assistant', enabled: true, displayOrder: 6 }
      ]
    };
  }
};

export const updateSiteSettings = async (settings) => {
  const response = await axios.put(`${API_BASE}/admin/site-settings`, settings);
  return response.data;
};

export const getNavigationLinks = async () => {
  const response = await axios.get(`${API_BASE}/admin/navigation`);
  return response.data;
};

export const updateNavigationLinks = async (navLinks) => {
  const response = await axios.put(`${API_BASE}/admin/navigation`, navLinks);
  return response.data;
};

// Admin Projects API
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
