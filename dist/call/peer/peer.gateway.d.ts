import { INestApplication, OnModuleInit } from '@nestjs/common';
export declare class PeerGateway implements OnModuleInit {
    onModuleInit(): void;
    startPeerServer(app: INestApplication<any>): Promise<void>;
}
