import Signals = NodeJS.Signals;
import App = Electron.App;
import { app } from 'electron';

export const gracefulShutdown = (application: App, callback: Function): void => {
  // seems that process.on does not work
  ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig: Signals) => {
    process.on(sig, () => {
      callback();
      console.log('Application closed with signal: ', sig);
    });
  });

  // Close application over press X on window
  application.on('window-all-closed', () => {
    application.quit();
    console.log('Close event: window-all-closed');
    callback();
  });

  // Close application over CTRL+C or kill process
  application.on('before-quit', () => {
    console.log('Close event: application before-quit');
    callback();
  });

  // Close over kill process
  application.on('will-quit', () => {
    console.log('Close event: application will-quit');
    callback();
  });
};
