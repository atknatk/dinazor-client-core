/**
 * Created by cabbar on 29.04.2017.
 */
export interface DnLoginBase {
    mail: string;
    password: string;
    client: DnClientBase;
}

export interface DnClientBase {

    hddSerialNo: string;
    biosVersion: string;
    mail: string;
    password: string;
    clientIdentifier: string;
}