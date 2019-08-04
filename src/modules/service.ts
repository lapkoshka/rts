import Signals = NodeJS.Signals;
import App = Electron.App;
import { app } from 'electron';

export const gracefulShutdown = (application: App, callback: Function): void => {
  // Close application over press X on window
  application.on('window-all-closed', () => {
    application.quit();
    callback();
  });

  // Close application over CTRL+C or kill process
  application.on('before-quit', () => {
    callback();
  });

  // Close over kill process
  application.on('will-quit', () => {
    callback();
  });
};
