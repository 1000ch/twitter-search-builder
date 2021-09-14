import process from 'node:process';
import consola from 'consola';

export enum LogLevel {
  DEBUG = 1,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

const getLogLevel = (env: string | undefined) => {
  switch (env) {
    case 'production':
      return 4;
    case 'development':
      return 1;
    default:
      return 1;
  }
};

const logLevel = getLogLevel(process.env.NODE_ENV);

export const logger = {
  debug(message: any, ...args: any[]) {
    if (logLevel <= LogLevel.DEBUG) {
      consola.debug(message, ...args);
    }
  },
  info(message: any, ...args: any[]) {
    if (logLevel <= LogLevel.INFO) {
      consola.info(message, ...args);
    }
  },
  warn(message: any, ...args: any[]) {
    if (logLevel <= LogLevel.WARN) {
      consola.warn(message, ...args);
    }
  },
  error(message: any, ...args: any[]) {
    if (logLevel <= LogLevel.ERROR) {
      consola.error(message, ...args);
    }
  },
  fatal(message: any, ...args: any[]) {
    if (logLevel <= LogLevel.FATAL) {
      consola.fatal(message, ...args);
    }
  },
};
