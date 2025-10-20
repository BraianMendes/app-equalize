/* Centralized logging utility to avoid scattered console.log and ease future telemetry */
type Level = 'debug' | 'info' | 'warn' | 'error';

function write(level: Level, message: string, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  fn(`[${level.toUpperCase()}] ${message}`, ...args);
}

export const log = {
  debug: (msg: string, ...args: unknown[]) => write('debug', msg, ...args),
  info: (msg: string, ...args: unknown[]) => write('info', msg, ...args),
  warn: (msg: string, ...args: unknown[]) => write('warn', msg, ...args),
  error: (msg: string, ...args: unknown[]) => write('error', msg, ...args),
};
