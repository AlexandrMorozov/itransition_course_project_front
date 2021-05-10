import { Role } from './role';

export class User {
    
    id: number;

    name: string;

    password: string;

    email: string;

    isEnabled: boolean;

    roles: Role[];

}