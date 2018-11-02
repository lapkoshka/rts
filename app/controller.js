'use strict';

//PROBLEMS:
//Участник с меткой остановился под антенной

//TODO
// Если лучшее время круга === +=выставленной задержке помечать как остановившегося и предлагать заморозить участие
// Кнопка ВЫБЫЛ

// Поле для регулирования задержки

// Кнопки реконнекта - заебало перезагружать приложение

// Выгрузка результатов
// Режимы - свободный, на время, круги
// Поле количества дополнительных кругов в режиме на время
// Страница с заездами и возможность возврата на нее после завершения гонки

// история поиска в садджесте на островке


// Фичи
// Загрузка разных наборов тегов
// Алертинг на то что процесс уже открыт или поиск и убийство существующего процесса
// Сортировка результатов
// проработать и подобрать разные варианты сеттингов главного ридера, частота/скорость считывания меток
// проверка на запущенные процессы при попытке закрытия приложения 

const MainReader = require('../core/devices/mainreader');
const PortableReader = require('../core/devices/portablereader');
const { ipcMain } = require('electron');
const REG_EVENT = require('./events.js').regEvents;
const RACE_EVENT = require('./events.js').raceEvents;
console.log(REG_EVENT, RACE_EVENT)
//const utils = require('./utils.js');
const READER = require('./readers.js');
const _ = require('lodash');
const fs = require('fs');


module.exports = class Controller {
    constructor(win) {
        this.win = win;
        this.mainReader = new MainReader();
        this.portableReader = new PortableReader();

        this.users = {};
        this.competitorsMap = {};
        this.raceStartTime = null;

        this.config = {};
    }

    initRegEvents() {
        ipcMain.on(REG_EVENT.PAGE_READY, (event, arg) => {
            this._renderReaderStatus(READER.PORTABLE, 'wait', 'Connecting');
            this.portableReader.onConnected = this._onPorableReaderConnect.bind(this);
            this.portableReader.onTag = this._portableReaderTagHandler.bind(this);
            this.portableReader.open();

            this._renderReaderStatus(READER.MAIN, 'wait', 'Connecting');
            this.mainReader.onConnected = this._onMainReaderConnect.bind(this);
            this.mainReader.onTag = this._mainReaderTagHandler.bind(this);
            this.mainReader.open();
        });

        ipcMain.on(REG_EVENT.NEW_USER, (event, arg) => {
            this.users[arg.uid] = arg;
            this._renderUsers();

            if (arg.shouldSave) {
                fs.writeFile('./app/storage/users.json', JSON.stringify(this.users));
            }
            this._validateRegForm();
        })

        ipcMain.on(REG_EVENT.REMOVE_USER, (event, uid) => {
            delete this.users[uid];
            this._renderUsers();
        });

        ipcMain.on(REG_EVENT.SUBMIT, (event, config) => {
            this.config.raceTimeLimit = parseInt(config.raceTimeLimit, 10);
            // TODO: make input
            this.config.maxAdditionalLaps = 1;
            // TODO: make input
            this.config.detectDelay = 1000;
            console.log('config:', this.config);
            this.win.loadFile('view/race.html');
            this._initRaceEvents();
        });

        ipcMain.on(REG_EVENT.CONTINUE_LISTEN_P_READER, (event) => {
            this.portableReader.continue();
        });
    }

    _initRaceEvents() {
        ipcMain.on(RACE_EVENT.PAGE_READY, (event) => {
            const competitors = this._initCompetitors();
            this.win.webContents.send(RACE_EVENT.UPDATE_USERS, competitors);
        });

        ipcMain.on(RACE_EVENT.START, (event) => {
            this.raceStartTime = new Date();
            this.mainReader.startListen();
        });

        ipcMain.on(RACE_EVENT.OVER, (event) => {
            this.mainReader.kill();
            this.win.webContents.send(RACE_EVENT.OVER, null);
        });
    }

    _initCompetitors() {
        this.competitorsMap = _.clone(this.users);
        for (let key in this.competitorsMap) {
            const name = this.competitorsMap[key].firstname + ' ' +
                this.competitorsMap[key].lastname;
            const t = new Date();
            t.setHours(0, 0, 0, 0);
            this.competitorsMap[key].position = 0;
            this.competitorsMap[key].competitor = name;
            this.competitorsMap[key]._totaltime = t;
            this.competitorsMap[key].totaltime = t;
            this.competitorsMap[key].diff = t;
            this.competitorsMap[key].laps = 0;
            this.competitorsMap[key].besttime = null;

            this.competitorsMap[key].lapColletion = [];
        }

        return Object.values(this.competitorsMap);
    }

    _renderUsers() {
        this.win.webContents.send(REG_EVENT.RENDER_USERS, this.users);
    }

    _onPorableReaderConnect(error) {
        if (error) {
            this._renderReaderStatus(READER.PORTABLE, 'error', error);
            return;
        }

        this._renderReaderStatus(READER.PORTABLE, 'ok', 'Connected');
        this._validateRegForm();
        this.portableReader.startListen();
    }

    _portableReaderTagHandler(uid) {
        this.win.webContents.send(REG_EVENT.ON_TAG, {
            uid,
            user: this.users[uid]
        });
    }

    _renderReaderStatus(type, status, message) {
        this.win.webContents.send(REG_EVENT.READER_DATA, {
            type,
            info: {
                status,
                message
            }
        });
    }

    _onMainReaderConnect(error) {
        if (error) {
            this._renderReaderStatus(READER.MAIN, 'error', error);
            return;
        }

        this._validateRegForm();
        this._renderReaderStatus(READER.MAIN, 'ok', 'Connected');
    }

    _mainReaderTagHandler(tag) {
        const uid = tag.uid;
        if (this.competitorsMap[uid] && !this.competitorsMap[uid].isFinished) {
            if (!this.competitorsMap[uid].lastDetect) {
                const competitors = this._updateCompetitors(tag);
                this.win.webContents.send(RACE_EVENT.UPDATE_USERS, competitors);
            }
            const now = new Date();
            if (now - this.competitorsMap[uid].lastDetect > this.config.detectDelay) {
                const competitors = this._updateCompetitors(tag);
                this.win.webContents.send(RACE_EVENT.UPDATE_USERS, competitors);
            }
        }

        const raceIsOver = Object.values(this.competitorsMap)
            .every(competitor => competitor.isFinished);
        if (raceIsOver) {
            this.mainReader.kill();
            this.win.webContents.send(RACE_EVENT.OVER, null);
        }
    }

    _updateCompetitors(tag) {
        // бля грязновато как то пиздец, тут считаю и МУТИРУЮ что-то в глобальной области, но дальше возвращаю результат
        // какбы чистой функции
        // надо сделать так чтобы были исходные данные
        //  хули это за комменты calc, должны быть чистые функции не мутирующие исходные объекты

        // нужно завести и описать список полей чтобы понимать из чего состоит участник и ничего не проебать

        //Здесь считаются свойства для конкретного участника по тегу
        // завести объект "участник" пусть все говно считается внутри него и будет скрыто
        const competitor = this.competitorsMap[tag.uid];
        this.win.webContents.send(RACE_EVENT.ON_TAG, competitor);
        const now = new Date();
        if (competitor.lastDetect) {
            competitor.lapColletion.push(now - competitor.lastDetect);
            //            
        }

        competitor.lastDetect = now;
        const totalTime = now - this.raceStartTime;
        competitor._totaltime = totalTime;
        competitor.totaltime = totalTime;
        competitor.laps++;
        competitor.rssi = tag.rssi;

        //calc besttime
        if (competitor.lapColletion.length > 0) {
            const besttime = _.orderBy(competitor.lapColletion)[0];
            competitor.besttime = besttime;
        }

        //calc additonal laps
        const timeIsOver = new Date(now - this.raceStartTime).getMinutes() >= this.config.raceTimeLimit;
        if (timeIsOver) {
            if (!Number.isInteger(competitor.additionalLaps)) {
                competitor.additionalLaps = 0;
            } else {
                competitor.additionalLaps++;
            }
        }

        if (competitor.additionalLaps === this.config.maxAdditionalLaps) {
            competitor.isFinished = true;
        }

        //get besttime
        let min = 9999999999999999999999999;
        let bestTag = null;
        for (let _tag in this.competitorsMap) {
            const _competitor = this.competitorsMap[_tag];
            _competitor.isBestTime = false;
            const time = _competitor.besttime;
            if (time && time < min) {
                min = time;
                bestTag = _tag;
            }
        }
        if (bestTag) {
            this.competitorsMap[bestTag].isBestTime = true;
        }
        // а здесь для всех остальных, надо эти понятия разделить
        return this._sortAndCalcCompetitorProps();
    }

    //название метода как у долбоеба
    _sortAndCalcCompetitorProps() {
        const sorted = _.orderBy(this.competitorsMap, ['laps', '_totaltime'], ['desc']);
        sorted.forEach((_, index) => {
            //calc diff and pos
            if (index === 0) {
                sorted[index].diff = null;
            }
            sorted[index].position = index + 1;
            if (sorted[index + 1]) {
                // todo rename
                const diff = sorted[index + 1]._totaltime - sorted[0]._totaltime;
                sorted[index + 1].diff = diff;
            }
        });
        return sorted;
    }

    _validateRegForm() {
        const arrOfUsers = Object.values(this.users);
        const isValid = true || this.mainReader.isConnected && arrOfUsers.length > 0;
        this.win.webContents.send(REG_EVENT.VALIDATE, isValid);
    }

    killAll() {
        this.portableReader.kill();
        this.mainReader.kill();
    }
}