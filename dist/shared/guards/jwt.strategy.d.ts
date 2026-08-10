import { Repository } from 'typeorm';
import { Auth } from '../../entities/auth.entity';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: Repository<Auth>);
    validate(payload: any): Promise<any>;
}
export {};
