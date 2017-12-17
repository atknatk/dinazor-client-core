
import { DnLoggerLevel } from './logger.service';

export class DnLoggerConfig {
    level: DnLoggerLevel;
    serverLogLevel: DnLoggerLevel;
    serverLoggingUrl?: string;
}
