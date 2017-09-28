import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { isNullOrUndefined } from '../utils/check';

@Injectable()
export class DnStorageService {
    private key = CryptoJS.enc.Utf8.parse('7061737323313233');
    private iv = CryptoJS.enc.Utf8.parse('7061737323313233');

    getItem(key: string): any {
        const encrypted = localStorage.getItem(key);
        return this.decrypt(encrypted);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    setItem(key: string, value: any) {
        const encrypted = this.encrypt(JSON.stringify(value));
        localStorage.setItem(key, encrypted);
    }

    private decrypt(encrypted: any) {
        if (isNullOrUndefined(encrypted)) return;
        const bytes = CryptoJS.AES.decrypt(encrypted, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    private encrypt(decrypted: any) {
        if (isNullOrUndefined(decrypted)) return;
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(decrypted), this.key,
            {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
    }
}
