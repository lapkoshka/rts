module.exports = {
    getByCssName(name, opt_element) {
        const element = opt_element || document;
        return element.querySelector(`.${name}`);
    },
    toHumanReadableTime(t) {
        if (Number.isInteger(t)) {
            return this.toHumanReadableTime(new Date(t));
        }

        const min = t.getMinutes();
        const sec = t.getSeconds();
        const ms = t.getMilliseconds();
        let formatted = min.toString().length < 2 ? `0${min}:` : `${min}:`;
        formatted += sec.toString().length < 2 ? `0${sec}:` : `${sec}:`;
        formatted += ms.toString().length < 2 ? `0${ms}` : `${ms}`;

        return formatted;        
    }
}