import { isPlatformBrowser } from '@angular/common';

import { HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DnLoggerConfig } from './logger-config';

export enum DnLoggerLevel {
    TRACE = 0, DEBUG, INFO, LOG, WARN, ERROR, OFF
}

const LEVELS = [
    'TRACE',
    'DEBUG',
    'INFO',
    'LOG',
    'WARN',
    'ERROR',
    'OFF'
];

@Injectable()
export class DnLoggerService {

    private _serverLogLevel: DnLoggerLevel;
    private _clientLogLevel: DnLoggerLevel;
    private _isIE: boolean;

    constructor(private http: Http,
                @Inject(PLATFORM_ID) private platformId,
                @Optional() private options: DnLoggerConfig) {
        if (!this.options) {
            this.options = {
                level: DnLoggerLevel.OFF,
                serverLogLevel: DnLoggerLevel.OFF
            };
        }
        this._serverLogLevel = this.options.serverLogLevel;
        this._clientLogLevel = this.options.level;
        this._isIE = isPlatformBrowser(platformId) &&
            !!(navigator.userAgent.indexOf('MSIE') !== -1 ||
                navigator.userAgent.match(/Trident\//) ||
                navigator.userAgent.match(/Edge\//));
    }

    debug(message, ...additional: any[]) {
        this._log(DnLoggerLevel.DEBUG, true, message, additional);
    }

    error(message, ...additional: any[]) {
        this._log(DnLoggerLevel.ERROR, true, message, additional);
    }

    info(message, ...additional: any[]) {
        this._log(DnLoggerLevel.INFO, true, message, additional);
    }

    log(message, ...additional: any[]) {
        this._log(DnLoggerLevel.LOG, true, message, additional);
    }

    trace(message, ...additional: any[]) {
        this._log(DnLoggerLevel.TRACE, true, message, additional);
    }

    warn(message, ...additional: any[]) {
        this._log(DnLoggerLevel.WARN, true, message, additional);
    }

    private _getColor(level: DnLoggerLevel) {
        switch (level) {
            case DnLoggerLevel.TRACE:
                return 'blue';
            case DnLoggerLevel.DEBUG:
                return 'teal';
            case DnLoggerLevel.INFO:
            case DnLoggerLevel.LOG:
                return 'gray';
            case DnLoggerLevel.WARN:
            case DnLoggerLevel.ERROR:
                return 'red';
            case DnLoggerLevel.OFF:
            default:
                return;
        }
    }

    private _log(level: DnLoggerLevel, logOnServer: boolean, message, additional: any[] = []) {
        if (!message) {
            return;
        }

        // Allow logging on server even if client log level is off
        if (logOnServer) {
            this._logOnServer(level, message, additional);
        }

        // if no message or the log level is less than the environ
        if (level < this._clientLogLevel) {
            return;
        }

        if (typeof message === 'object') {
            try {
                message = JSON.stringify(message, null, 2);
            } catch (e) {
                additional = [message, ...additional];
                message = 'circular object in message. ';
            }
        }

        // Coloring doesn't work in IE
        if (this._isIE) {
            return this._logIE(level, message, additional);
        }

        const color = this._getColor(level);

        console.log(`%c${this._timestamp()} [${LEVELS[level]}]`, `color:${color}`, message, ...additional);
    }

    private _logIE(level: DnLoggerLevel, message: string, additional: any[]) {
        switch (level) {
            case DnLoggerLevel.WARN:
                console.warn(`${this._timestamp()} [${LEVELS[level]}] `, message, ...additional);
                break;
            case DnLoggerLevel.ERROR:
                console.error(`${this._timestamp()} [${LEVELS[level]}] `, message, ...additional);
                break;
            case DnLoggerLevel.INFO:
                console.info(`${this._timestamp()} [${LEVELS[level]}] `, message, ...additional);
                break;
            default:
                console.log(`${this._timestamp()} [${LEVELS[level]}] `, message, ...additional);
        }
    }

    private _logOnServer(level: DnLoggerLevel, message, additional: any[]) {
        if (!this.options.serverLoggingUrl) {
            return;
        }

        // if the user provides a serverLogLevel and the current level is than that do not log
        if (level < this._serverLogLevel) {
            return;
        }

        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        this.http.post(this.options.serverLoggingUrl, {
            level: LEVELS[level],
            message,
            additional,
            timestamp: this._timestamp()
        })
            .subscribe(
                res => null,
                error => this._log(DnLoggerLevel.ERROR, false, 'FAILED TO LOG ON SERVER')
            );
    }

    private _timestamp() {
        return new Date().toISOString();
    }
}
