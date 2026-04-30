import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonPrimary, ButtonOutline } from '../components/Buttons';

/**
 * Profile Page
 */
const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-light mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-8 border border-primary/20 shadow-2xl">
          {/* Profile Picture */}
          <div className="mb-8">
            <img
              src={user?.profilePic}
              alt={user?.name}
              className="w-32 h-32 rounded-2xl border-4 border-primary mx-auto object-cover"
            />
          </div>

          {/* Name and Email */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-light mb-2">{user?.name}</h2>
            <p className="text-light/60">{user?.email}</p>
          </div>

          {/* Bio */}
          {user?.bio && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="text-light font-semibold mb-2">Bio</h3>
              <p className="text-light/80">{user.bio}</p>
            </div>
          )}

          {/* Skills */}
          {user?.skills && user.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-light font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mb-8 space-y-2">
            {user?.github && (
              <p className="text-light/80">
                <span className="font-semibold">GitHub:</span>{' '}
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary"
                >
                  {user.github}
                </a>
              </p>
            )}
            {user?.location && (
              <p className="text-light/80">
                <span className="font-semibold">Location:</span> {user.location}
              </p>
            )}
            {user?.portfolio && (
              <p className="text-light/80">
                <span className="font-semibold">Portfolio:</span>{' '}
                <a
                  href={user.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary"
                >
                  {user.portfolio}
                </a>
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <ButtonPrimary
              onClick={() => navigate('/edit-profile')}
              className="flex-1"
            >
              Edit Profile
            </ButtonPrimary>
            <ButtonOutline
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Back to Feed
            </ButtonOutline>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
