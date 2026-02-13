import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { FaBell, FaEnvelope, FaHome, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const NotificationCenter = () => {
  const { isAuthenticated } = useAuth();
  const { notifications, removeNotification } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    switch (filter) {
      case 'unread':
        filtered = notifications.filter(n => !n.read);
        break;
      case 'inquiries':
        filtered = notifications.filter(n => 
          n.type === 'inquiry' || 
          n.message.toLowerCase().includes('inquiry') ||
          n.message.toLowerCase().includes('message')
        );
        break;
      case 'property':
        filtered = notifications.filter(n => 
          n.type === 'property' || 
          n.message.toLowerCase().includes('property') ||
          n.message.toLowerCase().includes('listing')
        );
        break;
      case 'system':
        filtered = notifications.filter(n => 
          n.type === 'system' || 
          n.type === 'success' || 
          n.type === 'warning' ||
          n.type === 'error'
        );
        break;
      default:
        filtered = notifications;
    }

    return [...filtered].reverse(); // Reverse to show newest first
  }, [notifications, filter]);

  const markAsRead = (id) => {
    // In a real implementation, this would update the notification on the server
    console.log(`Marking notification ${id} as read`);
  };

  const clearAll = () => {
    // In a real implementation, this would clear all notifications on the server
    notifications.forEach(notification => {
      removeNotification(notification.id);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBell className="text-premium-gold" />
            Notification Center
          </h1>
          <p className="text-gray-600 mt-2">Manage your notifications and alerts</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All', icon: <FaBell /> },
                { value: 'unread', label: 'Unread', icon: <FaEnvelope /> },
                { value: 'inquiries', label: 'Inquiries', icon: <FaEnvelope /> },
                { value: 'property', label: 'Property', icon: <FaHome /> },
                { value: 'system', label: 'System', icon: <FaCheck /> },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    filter === option.value
                      ? 'bg-premium-gold text-premium-onyx font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.icon}
                  {option.label}
                  {option.value === 'all' && notifications.length > 0 && (
                    <span className="ml-2 bg-gray-700 text-white text-xs rounded-full px-2 py-1">
                      {notifications.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2 transition-colors"
            >
              <FaTrash />
              Clear All
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <FaBell className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">
                  {filter === 'all'
                    ? 'You have no notifications at this time.'
                    : `No ${filter} notifications at this time.`}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const isUnread = !notification.read;
                const getNotificationColor = () => {
                  switch (notification.type) {
                    case 'inquiry':
                    case 'message':
                      return 'border-l-blue-500 bg-blue-50';
                    case 'property':
                      return 'border-l-green-500 bg-green-50';
                    case 'system':
                      return 'border-l-gray-500 bg-gray-50';
                    case 'success':
                      return 'border-l-green-500 bg-green-50';
                    case 'warning':
                      return 'border-l-yellow-500 bg-yellow-50';
                    case 'error':
                      return 'border-l-red-500 bg-red-50';
                    default:
                      return 'border-l-blue-500 bg-blue-50';
                  }
                };

                return (
                  <div
                    key={notification.id}
                    className={`p-6 border-l-4 ${getNotificationColor()} ${
                      isUnread ? 'bg-opacity-75' : ''
                    } flex items-start justify-between`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {isUnread && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        <h4 className="font-medium text-gray-900">
                          {notification.title || 'Notification'}
                        </h4>
                        {isUnread && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">{notification.message}</p>
                      <div className="text-xs text-gray-500">
                        {new Date(notification.timestamp || notification.createdAt || new Date()).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {isUnread && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                          title="Mark as read"
                        >
                          <FaCheck size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        title="Dismiss"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Summary Stats */}
          {notifications.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {notifications.filter(n => !n.read).length}
                  </div>
                  <div className="text-sm text-gray-600">Unread</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {notifications.filter(n => 
                      n.type === 'inquiry' || 
                      n.message.toLowerCase().includes('inquiry') ||
                      n.message.toLowerCase().includes('message')
                    ).length}
                  </div>
                  <div className="text-sm text-gray-600">Inquiries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {notifications.filter(n => 
                      n.type === 'property' || 
                      n.message.toLowerCase().includes('property') ||
                      n.message.toLowerCase().includes('listing')
                    ).length}
                  </div>
                  <div className="text-sm text-gray-600">Property</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;