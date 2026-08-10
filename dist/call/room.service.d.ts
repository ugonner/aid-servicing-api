import { DataSource, QueryRunner, Repository } from 'typeorm';
import { QueryRoomDTO, RoomDTO } from '../shared/dtos/room.dto';
import { Room } from '../entities/room.entity';
import { Profile } from '../entities/user.entity';
import { CallGateway } from './call.gateway';
import { Auth } from '../entities/auth.entity';
export declare class RoomService {
    private dataSource;
    private roomRepository;
    private authRepository;
    private callGateway;
    constructor(dataSource: DataSource, roomRepository: Repository<Room>, authRepository: Repository<Auth>, callGateway: CallGateway);
    createRoom(userId: string, dto: RoomDTO): Promise<Room>;
    addParticipants(participantIds: string[], room: Room, queryRunner?: QueryRunner): Promise<Profile[]>;
    addParticipantsToRoom(participantIds: string[], roomId: string): Promise<Profile[]>;
    removeParticipants(participantIds: string[], room: Room, queryRunner?: QueryRunner): Promise<Profile[]>;
    getRoom(roomId: string): Promise<Room>;
    getRooms(dto: QueryRoomDTO): Promise<Room[]>;
    getUserByUniqueId(uniqueId: string): Promise<Auth>;
}
