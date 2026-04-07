import { Skeleton } from '@/components/common';
import type { NotificationItem } from '@/types/documents';

interface NotificationListProps {
  notifications: NotificationItem[];
  isLoading?: boolean;
}

const ICON_MAP: Record<NotificationItem['type'], string> = {
  info: '📋',
  success: '✅',
  warning: '⚠️',
};

const NotificationList: React.FC<NotificationListProps> = ({ notifications, isLoading = false }) => (
  <div className="bg-card rounded-card border border-border p-[18px]">
    <div className="text-[11px] font-bold text-secondary uppercase tracking-[0.5px] mb-3">알림</div>
    <div className="space-y-2">
      {isLoading
        ? [0, 1, 2].map((i) => <Skeleton key={i} className="h-[35px] w-full rounded-block" />)
        : notifications.map((n, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-block bg-border-light">
              <span className="text-[14px]">{ICON_MAP[n.type]}</span>
              <span className="text-[13px] flex-1">{n.message}</span>
              <span className="text-[11px] text-muted">{n.time}</span>
            </div>
          ))}
    </div>
  </div>
);

export default NotificationList;
