import { NotificationContext, NotificationEventType } from '../enums/notification.enum';
import { Profile } from '../../entities/user.entity';
export declare enum DeviceType {
    ANDROID = "android",
    IOS = "ios",
    WEB = "web"
}
export declare enum PushStatus {
    ENABLE = "ACTIVE",
    DISABLE = "INACTIVE"
}
export declare class DeviceTokenDto {
    device_token: string;
}
export declare class CreateNotificationTokenDto {
    device_type: DeviceType;
    device_token: string;
}
export declare class NotificationDto {
    title: string;
    description?: string;
    data?: Record<string, unknown>;
    avatar?: string;
    notificationEventType: NotificationEventType;
    context: NotificationContext;
    contextEntityId: number;
    creator: Profile;
    receivers: Profile[];
}
export declare class CreateNotificationDto extends NotificationDto {
    user_id: string;
}
export declare class SubscribeToTopicDto extends DeviceTokenDto {
    topics: string[];
}
