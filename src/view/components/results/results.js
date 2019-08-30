const initRaceHistory = require('./history');
const initTotalInfo = require('./total');

const TAB = {
    HISTORY: 'history',
    TOTAL: 'total',
    USERS: 'users',
};

const hideAllTabs = () =>
    Object.values(TAB).forEach(tab =>
        document.querySelector(`#${tab}`).style.display = 'none');

const showTab = id =>
    document.querySelector(`#${id}`).style.display = 'flex';

module.exports = (rootElement, dispatcher) => {
    initRaceHistory(rootElement.querySelector('#history'), dispatcher);
    initTotalInfo(rootElement.querySelector(`#total`), dispatcher);

    const tabs = rootElement.querySelector('.result-tabs');
    hideAllTabs();
    showTab(TAB.HISTORY);

    tabs.addEventListener('click', evt => {
        const { target } = evt;
        if (!target.classList.contains('result-tab')) {
          return;
        }

        Array.from(tabs.children).forEach(
          e => e.classList.remove('result-tab-selected'));

        target.classList.add('result-tab-selected');
        hideAllTabs();
        showTab(target.id.replace('tab-', ''));
    });
};
