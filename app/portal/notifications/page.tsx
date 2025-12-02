'use client';

import NotificationCenter from '@/app/components/notifications/NotificationCenter';
import PortalLayoutContent from '@/app/components/portal/PortalLayoutContent';

export default function NotificationsPage() {
  return (
    <PortalLayoutContent>
      <div className="pt-16 pb-8">
        <NotificationCenter />
      </div>
    </PortalLayoutContent>
  );
}

