import Signals = NodeJS.Signals;

export const gracefulShutdown = (listener: Function): void =>
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig: Signals) => {
      process.on(sig, () => {

      });
    })
