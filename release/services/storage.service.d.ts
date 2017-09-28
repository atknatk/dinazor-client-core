export declare class DnStorageService {
    private key;
    private iv;
    getItem(key: string): any;
    removeItem(key: string): void;
    setItem(key: string, value: any): void;
    private decrypt(encrypted);
    private encrypt(decrypted);
}
