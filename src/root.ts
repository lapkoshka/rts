import PortableReader from "./lib/readers/portable-reader";
import { User, submitNewUser } from './lib/users/users'
import initPortableReader from './modules/portable-reader';
import { RootDispatcher } from './lib/dispatcher';


const root = (
    portableReader: PortableReader,
    dispatcher: RootDispatcher,
) => {
    initPortableReader(portableReader, dispatcher);

    dispatcher.addPageListener('fakeTag', () => {
        portableReader.fakeTag();
    });

    // registration events to the registration events module
    dispatcher.addPageListener('onCancelRegistration', () => {
        portableReader.continue();
    });

    dispatcher.addPageListener('onRegistrationSubmit', (evt: any, user: User) => {
        submitNewUser(user);
        portableReader.continue();
    })
}

export default root;
