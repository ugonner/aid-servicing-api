import { ArgumentsHost, WsExceptionFilter } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
export declare class EventExceptionHandler implements WsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost): void;
}
