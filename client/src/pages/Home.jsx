import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DeveloperCard from '../components/DeveloperCard';
import api from '../utils/api';

/**
 * Home Page - Swipe Feed
 */
const Home = () => {
  const { user } = useAuth();
  const [developers, setDevelopers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch developers on mount
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/feed');
      setDevelopers(response.data.users);
      setError('');
    } catch (err) {
      setError('Failed to load developers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (developerId) => {
    try {
      const response = await api.post(`/swipe/like/${developerId}`);

      if (response.data.message === "It's a match!") {
        alert('🎉 It\'s a match! You can now chat with them.');
      }

      // Move to next developer
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking developer:', err);
      alert('Error liking developer');
    }
  };

  const handleSkip = async (developerId) => {
    try {
      await api.post(`/swipe/skip/${developerId}`);
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Error skipping developer:', err);
      alert('Error skipping developer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light">Loading developers...</p>
        </div>
      </div>
    );
  }

  const currentDeveloper =
    currentIndex < developers.length ? developers[currentIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-light mb-2">
            Discover Developers
          </h1>
          <p className="text-light/60">
            Find and connect with amazing developers in the community
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Feed Container */}
        <div className="flex flex-col items-center justify-center py-12">
          {currentDeveloper ? (
            <DeveloperCard
              developer={currentDeveloper}
              onLike={handleLike}
              onSkip={handleSkip}
              isLoading={loading}
            />
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-light mb-2">
                All caught up!
              </h2>
              <p className="text-light/60 mb-6">
                You've reviewed all available developers. Check back later for more.
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  fetchDevelopers();
                }}
                className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-semibold transition-all"
              >
                Refresh Feed
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        {currentDeveloper && (
          <div className="mt-12 text-center">
            <p className="text-light/60 text-sm">
              Developer {currentIndex + 1} of {developers.length}
            </p>
            <div className="mt-2 w-full max-w-sm mx-auto h-1 bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{
                  width: `${((currentIndex + 1) / developers.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
