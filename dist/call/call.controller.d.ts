import { CallService } from './call.service';
import { CallRoomDTO, QueryCallRoomDTO } from '../shared/dtos/call.dto';
export declare class CallController {
    private callRoomService;
    constructor(callRoomService: CallService);
    createCallRoom(payload: CallRoomDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/call.entity").CallRoom>>;
    createAidServiceCallRoom(payload: CallRoomDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/call.entity").CallRoom>>;
    getUserCallRoom(userId: string): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../entities/call.entity").CallRoom[]>>;
    getCallRoom(payload: QueryCallRoomDTO): Promise<import("../shared/helpers/apiresponse").IApiResponse<import("../shared/interfaces/api-response.interface").IQueryResult<import("../entities/call.entity").CallRoom>>>;
}
