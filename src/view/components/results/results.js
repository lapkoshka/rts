module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
  const tabs = rootElement.querySelector('.result-tabs');
  tabs.addEventListener('click', evt => {
    const { target } = evt;
    if (!target.classList.contains('result-tab')) {
      return;
    }

    Array.from(tabs.children).forEach(
      e => e.classList.remove('result-tab-selected'))

    target.classList.add('result-tab-selected');
  });
};
