import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MatchList from '../components/MatchList';
import ChatBox from '../components/ChatBox';
import api from '../utils/api';
import { io } from 'socket.io-client';

/**
 * Chat Page
 */
const Chat = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize Socket.io
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      newSocket.emit('user_connected', user?.id);
    });

    newSocket.on('receive_message', (data) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          timestamp: new Date(),
        },
      ]);
    });

    newSocket.on('user_typing', (data) => {
      setIsTyping(data.typing);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]);

  // Fetch matches on mount
  useEffect(() => {
    fetchMatches();
  }, []);

  // Fetch messages when match is selected
  useEffect(() => {
    if (selectedMatch) {
      fetchMessages();
    }
  }, [selectedMatch]);

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

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/${selectedMatch.user._id}`);
      setMessages(response.data.messages);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      // Send via API (store in database)
      const response = await api.post('/messages', {
        receiverId: selectedMatch.user._id,
        message: messageText,
      });

      // Add message to local state
      setMessages((prev) => [...prev, response.data.data]);

      // Emit via Socket.io for real-time
      socket?.emit('send_message', {
        senderId: user?.id,
        receiverId: selectedMatch.user._id,
        message: messageText,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message');
    }
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-light">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-primary/10 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-light mb-8">Messages</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Chat Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Matches List */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-6 border border-primary/20 shadow-2xl h-full max-h-[600px] overflow-y-auto">
              <h2 className="text-lg font-bold text-light mb-4">Conversations</h2>
              {matches.length > 0 ? (
                <MatchList
                  matches={matches}
                  onSelectMatch={handleSelectMatch}
                />
              ) : (
                <p className="text-light/60 text-sm text-center py-8">
                  No matches yet
                </p>
              )}
            </div>
          </div>

          {/* Chat Box */}
          <div className="md:col-span-2">
            {selectedMatch ? (
              <div>
                {/* Header */}
                <div className="bg-gradient-to-br from-card to-dark rounded-t-3xl p-4 border border-b-0 border-primary/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedMatch.user?.profilePic}
                      alt={selectedMatch.user?.name}
                      className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                    <div>
                      <h3 className="text-light font-semibold">
                        {selectedMatch.user?.name}
                      </h3>
                      {isTyping && (
                        <p className="text-xs text-primary">typing...</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chat Box */}
                <div className="bg-gradient-to-br from-card to-dark rounded-b-3xl border border-t-0 border-primary/20 shadow-2xl">
                  <ChatBox
                    messages={messages}
                    currentUserId={user?.id}
                    onSendMessage={handleSendMessage}
                    isTyping={isTyping}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-card to-dark rounded-3xl p-12 border border-primary/20 shadow-2xl h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-light/60 text-lg">
                    Select a conversation to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
