import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MatchList from '../components/MatchList';
import api from '../utils/api';

/**
 * Matches Page
 */
const Matches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await api.get('/match');
      setMatches(response.data.matches);
      setError('');
    } catch (err) {
      setError('Failed to load matches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMatch = (match) => {
    // Would typically open a chat modal or navigate to chat page
    console.log('Selected match:', match);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light">Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-light mb-8">Your Matches</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Matches Container */}
        <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-8 border border-primary/20 shadow-2xl">
          {matches.length > 0 ? (
            <MatchList matches={matches} onSelectMatch={handleSelectMatch} />
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💔</span>
              </div>
              <h2 className="text-2xl font-bold text-light mb-2">
                No matches yet!
              </h2>
              <p className="text-light/60 mb-6">
                Start liking developers to find your matches and begin chatting.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-semibold transition-all"
              >
                Go to Feed
              </a>
            </div>
          )}
        </div>

        {/* Stats */}
        {matches.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 text-center border border-primary/20">
              <p className="text-light/60 text-sm mb-1">Total Matches</p>
              <p className="text-3xl font-bold text-primary">{matches.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
