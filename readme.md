# RTS

Приложение регистрирует участников сореврования и устанавливает лучшее время круга 
при участии в гонке.

В процессе используются два RFID считывателя и EPC-метки. Участник прислоняет
свою метку к портативному считывателю и в приложении всплывает окно регистрации участника.
Администратор приложения регистрирует участника и далее, главный считыватель 
расположенный на гоночной трассе присылает в приложение метки (если он активирован),
по которым и считаются результаты гонки для каждого зарегистрированного участника.

### Установка и запуск

#### Установи зависимости
`npm install`

#### Собери проект
`npm run build`

#### Приложения для работы с приемниками (Windows)
- Скачай готовые бинари https://github.com/lapkoshka/rts/releases -> bin.zip -> разархивируй 
в корень проекта в папку bin
- Либо собери в Visual Studio файлы проектов `.sln` из папки `core`, затем скопируй скомпилированные приложения
и библиотеки в папку bin командой  `npm run ub`;

#### Запусти приложение
`npm start`

#### Сборка
Если меняется клиентская часть: .css и .js файлы, то достаточно закрыть приложение
и запустить заново командой `npm start`. Если меняется бэкенд .ts файлы, надо пересобирать,
можно командой `npm run br`

#### Симуляция приёмников
Если у тебя нет двух китайских Chafon CF-RU6403 R2000 и UHF Reader 09 то в консоли приложения
можно набрать `fakePortableTag('tag_name)` чтобы симулировать приход метки для портативного 
приёмника и `fakeMainTag('tag_name', 80)` для главного.

## База данных:
- Если не ставится sqlite3:
https://stackoverflow.com/questions/32504307/how-to-use-sqlite3-module-with-electron

- SQLite Database Browser в качестве обозревателя на Windows отлично подходит
