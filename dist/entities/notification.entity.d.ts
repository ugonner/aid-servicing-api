import { NotificationContext, NotificationEventType } from '../notifiction/enums/notification.enum';
import { Profile } from './user.entity';
export declare class Notification {
    id: number;
    title: string;
    description?: string;
    data?: Record<string, unknown>;
    avatar?: string;
    notificationEventType: NotificationEventType;
    context: NotificationContext;
    contextEntityId: number;
    viewed: boolean;
    creator: Profile;
    receiver: Profile;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
