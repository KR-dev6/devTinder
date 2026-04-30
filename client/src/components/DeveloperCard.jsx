import React from 'react';

/**
 * DeveloperCard Component
 * Displays developer profile with swipe interactions
 */
const DeveloperCard = ({ developer, onLike, onSkip, isLoading }) => {
  if (!developer) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-8 text-center">
          <p className="text-light/60">No more developers to discover!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto perspective">
      {/* Card Container */}
      <div className="bg-gradient-to-br from-card to-dark rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
        {/* Profile Image */}
        <div className="relative h-96 overflow-hidden group">
          <img
            src={developer.profilePic}
            alt={developer.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="p-6 relative z-10">
          {/* Name and Location */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-light mb-1">
              {developer.name}
            </h2>
            {developer.location && (
              <p className="text-primary text-sm">📍 {developer.location}</p>
            )}
          </div>

          {/* Bio */}
          {developer.bio && (
            <p className="text-light/80 text-sm mb-4 line-clamp-2">
              {developer.bio}
            </p>
          )}

          {/* Skills */}
          {developer.skills && developer.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {developer.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {developer.skills.length > 4 && (
                  <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium">
                    +{developer.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-2 mb-6 text-sm">
            {developer.github && (
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                GitHub
              </a>
            )}
            {developer.portfolio && (
              <a
                href={developer.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                Portfolio
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => onSkip(developer._id)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-accent-skip/20 hover:bg-accent-skip/30 text-accent-skip rounded-full font-bold transition-all disabled:opacity-50"
            >
              ✕ Skip
            </button>
            <button
              onClick={() => onLike(developer._id)}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-accent-like/20 hover:bg-accent-like/30 text-accent-like rounded-full font-bold transition-all disabled:opacity-50"
            >
              ❤️ Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
