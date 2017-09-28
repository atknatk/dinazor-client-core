/**
 * Created by cabbar on 29.04.2017.
 */
export interface DnLoginBase {
  username: string;
  password: string;
  client: DnClientBase;
}

export interface DnClientBase {

  hddSerialNo: string;
  biosVersion: string;
  username: string;
  password: string;
  clientIdentifier: string;
}