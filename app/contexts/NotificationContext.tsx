'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificationsApi, Notification } from '../lib/notifications/api';
import { useClientAuth } from './ClientAuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  getUnreadCount: () => Promise<void>;
  // Pagination for modal
  allNotifications: Notification[];
  loadingMore: boolean;
  hasMore: boolean;
  currentPage: number;
  totalNotifications: number;
  loadMoreNotifications: () => Promise<void>;
  loadAllNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useClientAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Pagination state for modal
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const pageSize = 20;

  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const [notificationsData, count] = await Promise.all([
        notificationsApi.getNotifications(1, 20),
        notificationsApi.getUnreadCount(),
      ]);
      setNotifications(notificationsData.data);
      setUnreadCount(count);
    } catch (err: any) {
      console.error('Failed to load notifications:', err);
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const refreshNotifications = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  const markAsRead = useCallback(async (id: number) => {
    try {
      await notificationsApi.markAsRead(id);
      const updatedNotification = { read: true, readAt: new Date().toISOString() };
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updatedNotification } : n)),
      );
      setAllNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updatedNotification } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err);
      throw err;
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      const updatedNotification = { read: true, readAt: new Date().toISOString() };
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, ...updatedNotification })),
      );
      setAllNotifications((prev) =>
        prev.map((n) => ({ ...n, ...updatedNotification })),
      );
      setUnreadCount(0);
    } catch (err: any) {
      console.error('Failed to mark all as read:', err);
      throw err;
    }
  }, []);

  const getUnreadCount = useCallback(async () => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    try {
      const count = await notificationsApi.getUnreadCount();
      setUnreadCount(count);
    } catch (err: any) {
      console.error('Failed to get unread count:', err);
    }
  }, [isAuthenticated]);

  // Load all notifications for modal (starts from page 1)
  const loadAllNotifications = useCallback(async () => {
    if (!isAuthenticated) {
      setAllNotifications([]);
      setCurrentPage(1);
      setTotalNotifications(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await notificationsApi.getNotifications(1, pageSize);
      setAllNotifications(response.data);
      setTotalNotifications(response.total);
      setCurrentPage(1);
    } catch (err: any) {
      console.error('Failed to load all notifications:', err);
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Computed property for hasMore
  const hasMore = allNotifications.length < totalNotifications;

  // Load more notifications (infinite scroll)
  const loadMoreNotifications = useCallback(async () => {
    const canLoadMore = allNotifications.length < totalNotifications;
    if (!isAuthenticated || loadingMore || !canLoadMore) {
      return;
    }

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await notificationsApi.getNotifications(nextPage, pageSize);
      
      // Append new notifications to existing ones
      setAllNotifications((prev) => [...prev, ...response.data]);
      setTotalNotifications(response.total);
      setCurrentPage(nextPage);
    } catch (err: any) {
      console.error('Failed to load more notifications:', err);
      setError(err.message || 'Failed to load more notifications');
    } finally {
      setLoadingMore(false);
    }
  }, [isAuthenticated, loadingMore, currentPage, totalNotifications, pageSize, allNotifications.length]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      getUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, getUnreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
        // Pagination
        allNotifications,
        loadingMore,
        hasMore,
        currentPage,
        totalNotifications,
        loadMoreNotifications,
        loadAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

