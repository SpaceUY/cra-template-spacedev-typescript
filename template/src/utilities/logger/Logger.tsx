type LoggerContext = Record<string | number | symbol, unknown>;

class Logger {
  private output = window.console;

  constructor() {
    window.addEventListener('error', (event) => {
      this.error(event.error, { caught: false });
    });

    window.onunhandledrejection = (event) => {
      this.error(event.reason, { caught: false });
    };
  }

  info(message: string, context: LoggerContext = {}) {
    this.output.info(message, {
      ...this.getDefaultContext(),
      ...context,
    });
  }

  warn(message: string, context: LoggerContext = {}) {
    this.output.warn(message, {
      ...this.getDefaultContext(),
      ...context,
    });
  }

  error(error: Error, context: LoggerContext = {}) {
    this.output.error(error, {
      caught: true,
      ...this.getDefaultContext(),
      ...context,
    });
  }

  private getDefaultContext() {
    return {
      time: new Date(),
    };
  }
}

const logger = new Logger();

export { logger };
