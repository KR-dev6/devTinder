import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ButtonPrimary, ButtonOutline } from '../components/Buttons';

/**
 * Edit Profile Page
 */
const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    github: user?.github || '',
    location: user?.location || '',
    portfolio: user?.portfolio || '',
    profilePic: user?.profilePic || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        skills: formData.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0),
      };

      await updateProfile(updateData);
      navigate('/profile');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-light mb-8">Edit Profile</h1>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-8 border border-primary/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture URL */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Profile Picture URL
              </label>
              <input
                type="url"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-light/40 text-xs mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, TypeScript"
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-light text-sm font-medium mb-2">
                Portfolio Website
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 bg-dark text-light placeholder-light/40 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <ButtonPrimary
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </ButtonPrimary>
              <ButtonOutline
                onClick={() => navigate('/profile')}
                className="flex-1"
              >
                Cancel
              </ButtonOutline>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
