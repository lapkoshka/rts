const fs = require('fs');

const PREADER_BIN = './core/portablereader/portablereader/bin/Release/';
const MREADER_BIN = './core/MainReaderAdapter/MainReaderAdapter/bin/Release/';

const copy = (src, dist, files) => {
  files.forEach(filename => {
    fs.createReadStream(src + filename)
      .pipe(fs.createWriteStream(dist + filename));
  });
}

copy(PREADER_BIN, './bin/', [
  'Basic.dll',
  'UHFReader09CSharp.dll',
  'portablereader.exe'
]);

copy(MREADER_BIN, './bin/', [
  'dmdll.dll',
  'UHFReader288.dll',
  'MainReaderAdapter.exe'
]);
