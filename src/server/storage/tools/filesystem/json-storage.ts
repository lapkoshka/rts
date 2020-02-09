import * as fs from 'fs';

const STORAGE_CATALOG = './data';
const STORAGE_PATH = STORAGE_CATALOG + '/storage.json';

let isFileBusy = false;

export class JsonStorage {
    private static open(): string {
        if (!fs.existsSync(STORAGE_CATALOG)) {
            fs.mkdirSync(STORAGE_CATALOG);
            fs.writeFileSync(STORAGE_PATH, '{}');
        } else if (!fs.existsSync(STORAGE_PATH)) {
            fs.writeFileSync(STORAGE_PATH, '{}');
        }

        return fs.readFileSync(STORAGE_PATH).toString();
    }

    private static write(data: string): void|never {
        if (isFileBusy) {
            // Вероятно стоит не кидать исключение, а ожидать освобождения файла для записи.
            // Однако код пишется так, чтобы гонки на запись не было, а если появится,
            // узнать об этом из исключения
            throw Error(STORAGE_PATH + 'is busy for writing');
        }

        isFileBusy = true;
        fs.writeFileSync(STORAGE_PATH, data);
        isFileBusy = false;
    }

    static get(key: string): unknown|never {
        const content = this.open();
        try {
            const json = JSON.parse(content);
            return json[key];
        } catch (e) {
            throw Error(e);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static set(key: string, value: any): void|never {
        const content = this.open();
        try {
            const json = JSON.parse(content);
            json[key] = value;
            this.write(JSON.stringify(json));
        } catch (e) {
            throw Error(e);
        }
    }
}
