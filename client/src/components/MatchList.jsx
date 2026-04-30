import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MatchList Component
 * Displays list of matches
 */
const MatchList = ({ matches, onSelectMatch }) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-light/60 mb-4">No matches yet!</p>
        <p className="text-light/40 text-sm">
          Like developers to create matches and start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <button
          key={match.matchId}
          onClick={() => onSelectMatch(match)}
          className="w-full p-4 bg-card hover:bg-card/80 rounded-lg border border-primary/20 hover:border-primary/50 transition-all flex items-center gap-4 group"
        >
          {/* Avatar */}
          <img
            src={match.user?.profilePic}
            alt={match.user?.name}
            className="w-12 h-12 rounded-full border-2 border-primary group-hover:border-secondary transition-colors"
          />

          {/* Info */}
          <div className="flex-1 text-left">
            <h3 className="text-light font-semibold group-hover:text-primary transition-colors">
              {match.user?.name}
            </h3>
            <p className="text-light/60 text-sm line-clamp-1">
              {match.user?.bio || 'No bio available'}
            </p>
          </div>

          {/* Arrow */}
          <div className="text-primary group-hover:translate-x-1 transition-transform">
            →
          </div>
        </button>
      ))}
    </div>
  );
};

export default MatchList;
