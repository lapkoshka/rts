import Signals = NodeJS.Signals;
import App = Electron.App;
import { app } from 'electron';

export const gracefulShutdown = (app: App, callback: Function): void => {
  // seems that process.on does not work
  // ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig: Signals) => {
  //   process.on(sig, () => {
  //     callback();
  //     console.log('Application closed with signal: ', sig);
  //   });
  // })

  // Close app over press X on window
  app.on('window-all-closed', () => {
    app.quit();
    console.log('Close event: window-all-closed');
    callback();
  });

  // Close app over CTRL+C or kill process
  app.on('before-quit', () => {
    console.log('Close event: app before-quit');
    callback();
  });

  // Close over kill process
  app.on('will-quit', () => {
    console.log('Close event: app will-quit');
    callback();
  });
}
