const fs = require('fs');

const copy = (src, dist, files) => {
    files.forEach(filename => {
        fs.createReadStream(src + filename)
        .pipe(fs.createWriteStream(dist + filename));
    });
};

module.exports = {
    copy,
};
