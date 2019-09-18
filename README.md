# RTS

Приложение регистрирует участников соревнования и устанавливает лучшее время круга 
при участии в гонке.

В процессе используются два RFID считывателя и EPC-метки. Участник прислоняет
свою метку к портативному считывателю и в приложении всплывает окно регистрации участника.
Администратор приложения регистрирует участника и далее, главный считыватель 
расположенный на гоночной трассе присылает в приложение метки (если он активирован),
по которым и считаются результаты гонки для каждого зарегистрированного участника.

## Install

### Dependencies

Run `npm install` for install dependencies

### Receivers (Windows)

- Скачай готовые бинари https://github.com/lapkoshka/rts/releases -> bin.zip -> разархивируй 
в корень проекта в папку bin

- Либо собери в Visual Studio файлы проектов `.sln` из папки `core`, затем скопируй скомпилированные приложения
и библиотеки в папку bin командой  `npm run ub` скопирует скомпилированные бинари приложений ядра в папку bin
(выполнять после перекомпиляции .NET приложений)

## Development

For development first run backend services by command

`npm run server-watch`

Then run client and electron

`npm run dev`

Enjoy developing ;)

### NOTE about development

Backend services restarts automatically by tsc watcher, but `electron` imports older version and needs restart completely :(

#### Симуляция приёмников
Если у тебя нет двух китайских Chafon CF-RU6403 R2000 и UHF Reader 09 то в консоли приложения
можно набрать `fakePortableTag(uid: string)` чтобы симулировать приход метки для портативного приёмника и 
`fakeMainTag(uid: string, rssi: number)` для главного.

## Main concepts

### Database
- If sqlite3 was crashed with exception: \node_modules\sqlite3\lib\binding\electron-v2.0-win32-x64\node_sqlite3.node' run `install-app-deps`
https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron

- В качестве обозревателя на Windows отлично подходит SQLite Database Browser

### Core (rename plz)
В папке core находится два проекта .NET
- MainReaderAdapter - находит IP главного считывателя в локальной сети с помощью библиотеки dmdll.dll,
за это отвечает модуль Search.cs. Далее подключается по установленному адресу к приемнику - модуль
MainReader.cs.
- PortableReader - подключается по COM порту, устройство должно быть подключено в USB, драйвера
на Windows должны быть установлены, загрузка: https://github.com/lapkoshka/rts/releases

Оба проекта на выходе представляют собой консольные приложения, на ввод ожидают команд на подключение к устройствам,
на вывод шлют данные о найденных EPC-метках. Команды можно найти в enum типа ProtocolMessages в папке src/lib/readers.

### Backend
Суть бекенда проста, спавн .net приложений, обертка для ввода-вывода в виде модулей MainReader и 
PortableReader, подписка на пришедшие теги. В модуле root.ts подписка и логика разделена по смысловым модулям-контроллерам,
логика гонок зашита там же.

БД кэшируется в нескольких местах, в основном там где большой поток меток должен быть ассоциирован с пользователем,
внимательней с этим, обрати внимание на модуль database/cache.ts

### Frontend
Все просто - React+Redux, в компонентах-контейнерах живет шина общения с главным процессом ноды - ipc. Обменивается только теми
событиями которые нужны компоненту.
