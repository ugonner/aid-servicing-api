import { DataSource, SelectQueryBuilder } from 'typeorm';
import { IQueryResult } from '../shared/interfaces/api-response.interface';
import { NotificationService } from '../notifiction/notification.service';
import { CallRoomDTO, QueryCallRoomDTO } from '../shared/dtos/call.dto';
import { CallRoom } from '../entities/call.entity';
export declare class CallService {
    private dataSource;
    private notificationService;
    constructor(dataSource: DataSource, notificationService: NotificationService);
    createAidServiceCall(dto: CallRoomDTO): Promise<CallRoom>;
    createPlainCall(dto: CallRoomDTO): Promise<CallRoom>;
    getQueryBuilder(): SelectQueryBuilder<CallRoom>;
    getCallRooms(dto: QueryCallRoomDTO, userid?: string): Promise<IQueryResult<CallRoom>>;
    getUserCalls(userId: string): Promise<CallRoom[]>;
    getCallRoom(callRoomId: number): Promise<CallRoom>;
}
