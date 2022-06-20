export interface ILogger {
  debug(context: string, message: string);

  log(context: string, message: string);

  error(context: string, message: string, trace?: string);

  warn(context: string, message: string);

  verbose(context: string, message: string);
}
