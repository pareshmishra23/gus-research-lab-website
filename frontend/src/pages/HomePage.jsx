import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ResearchHighlights from '../components/ResearchHighlights';
import FeaturedProjects from '../components/FeaturedProjects';
import LatestVideos from '../components/LatestVideos';
import Statistics from '../components/Statistics';
import LatestPublications from '../components/LatestPublications';
import Newsletter from '../components/Newsletter';
import CallToAction from '../components/CallToAction';

const API_BASE = 'http://localhost:8080/api';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/items`);
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      <ResearchHighlights />
      <FeaturedProjects />
      <Statistics />
      <LatestVideos />
      <LatestPublications />
      <Newsletter />
      <CallToAction />
    </div>
  );
}
