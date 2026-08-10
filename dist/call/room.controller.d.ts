import { RoomService } from "./room.service";
import { QueryRoomDTO, RoomDTO, UpdateRoomInviteesDTO } from "../shared/dtos/room.dto";
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    createRoom(payload: RoomDTO, userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/room.entity").Room>>;
    addInvitees(payload: UpdateRoomInviteesDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/user.entity").Profile[]>>;
    getRooms(payload: QueryRoomDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/room.entity").Room[]>>;
    getRoom(roomId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/room.entity").Room>>;
}
