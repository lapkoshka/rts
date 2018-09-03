const fs = require('fs');

//portable reader bin
fs.createReadStream('./core/consoleapps/portablereader/portablereader/bin/Release/Basic.dll').pipe(fs.createWriteStream('./bin/Basic.dll'));
fs.createReadStream('./core/consoleapps/portablereader/portablereader/bin/Release/UHFReader09CSharp.dll').pipe(fs.createWriteStream('./bin/UHFReader09CSharp.dll'));
fs.createReadStream('./core/consoleapps/portablereader/portablereader/bin/Release/portablereader.exe').pipe(fs.createWriteStream('./bin/portablereader.exe'));

//main reader bin
fs.createReadStream('./core/consoleapps/MainReaderAdapter/MainReaderAdapter/bin/Release/MainReaderAdapter.exe').pipe(fs.createWriteStream('./bin/MainReaderAdapter.exe'));
fs.createReadStream('./core/consoleapps/MainReaderAdapter/MainReaderAdapter/bin/Release/UHFReader288.dll').pipe(fs.createWriteStream('./bin/UHFReader288.dll'));
fs.createReadStream('./core/consoleapps/MainReaderAdapter/MainReaderAdapter/bin/Release/dmdll.dll').pipe(fs.createWriteStream('./bin/dmdll.dll'));

console.log('Success!');