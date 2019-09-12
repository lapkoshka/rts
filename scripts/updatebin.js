const { copy } = require('./copy');

const PREADER_BIN = './core/portablereader/portablereader/bin/Release/';
const MREADER_BIN = './core/MainReaderAdapter/MainReaderAdapter/bin/Release/';

copy(PREADER_BIN, './bin/', [
  'Basic.dll',
  'UHFReader09CSharp.dll',
  'portablereader.exe',
]);

copy(MREADER_BIN, './bin/', [
  'dmdll.dll',
  'UHFReader288.dll',
  'MainReaderAdapter.exe',
]);
