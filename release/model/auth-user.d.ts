/**
 * Created by cabbar on 19.04.2017.
 */
export interface AuthUser {
    username: string;
    password: string;
    token: string;
    id: number;
    roleList: number[];
}
