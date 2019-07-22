const openPopup = (_, data) => {
    const {tag, user} = data;

    document.querySelector('.reg-fullscreenpopup').classList.add('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.add('main-blur');

    document.querySelector('.reg-fullscreenpopup-uid').value = tag;
    document.querySelector('.reg-fullscreenpopup-firstname').value = user ? user.firstname : '';
    document.querySelector('.reg-fullscreenpopup-firstname').focus();
    document.querySelector('.reg-fullscreenpopup-lastname').value = user ? user.lastname : '';
};

module.exports = {
  openPopup,
}
