import { DirWatcher } from './dirwatcher';
import csvToJson      from 'convert-csv-to-json';
import fs             from 'fs';

export class Importer {
    constructor() {
        this.path     = './data';
        this.dirWatch = new DirWatcher(this.path, 2000);
        this.dirWatch.start();
        this.dirWatch.eventEmitter.on('dirwatcher:changed', (data) => {
            this.import(this.path + '/' + data);
            // this.importSync(this.path + '/' + data);
        });
    }

    import(path) {
        if(fs.existsSync(path)) {
            console.log(csvToJson.formatValueByType().getJsonFromCsv(path));
        } else {
            console.log(`file was deleted - ${path}`);
        }
    }

    importSync(path) {
        if(fs.existsSync(path)) {
            console.log(csvToJson.formatValueByType().getJsonFromCsv(path));
        } else {
            console.log(`file was deleted - ${path}`);
        }
    }
}