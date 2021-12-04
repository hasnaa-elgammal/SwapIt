import { Injectable } from '@angular/core';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  iv = CryptoJs.enc.Utf8.parse('7061737323313233');
  secretKey = '123456$#@$^@1ERF';

  Encrypt(value: string): string{
    const key = CryptoJs.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJs.enc.Utf8.parse(this.secretKey);
    const encrypted = CryptoJs.AES.encrypt(CryptoJs.enc.Utf8.parse(value.toString()), key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
    });
    return encrypted.toString();
  }

  Decrypt(value: string): string{
    const key = CryptoJs.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJs.enc.Utf8.parse(this.secretKey);
    const decrypted = CryptoJs.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
    });
    return decrypted.toString(CryptoJs.enc.Utf8);
  }
}
