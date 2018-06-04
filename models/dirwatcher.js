import fs     from 'fs';
import events from 'events';

export class DirWatcher {
    constructor(root, interval) {
        this.eventEmitter = new events.EventEmitter();
        this.root         = root;
        this.interval     = interval;
        this.files        = this.scanDirectory();
    }

    scanDirectory() {
        return fs.readdirSync(this.root)
            .map((fileName) => {
                const stat = fs.statSync(`${this.root}/${fileName}`);
                return {
                    fileName,
                    mt: stat.mtime
            }
        });
    }

    compare() {
        const oldFiles = this.files;
        this.files = this.scanDirectory();
        this.emmitAdded(oldFiles);
        this.emmitRemoved(oldFiles);
        this.emmitChanged(oldFiles);
    }

    start() {
        this.timer = setInterval(() => {
            this.compare();
        }, this.interval);
    };

    stop() {
        clearTimeout(this.timer);
    };

    emmitAdded(oldF) {
        if (oldF.length < this.files.length) {
            const oldNames  = oldF.map((item) => item.fileName);
            const newNames  = this.files.map((item) => item.fileName);
            const addedFile = newNames.map((name) => oldNames.includes(name) ? false : name).filter((it) => it)[0];
            this.eventEmitter.emit('dirwatcher:changed', addedFile);
        }
    }

    emmitRemoved(oldF) {
        if (oldF.length > this.files.length) {
            const oldNames    = oldF.map((item) => item.fileName);
            const newNames    = this.files.map((item) => item.fileName);
            const removedFile = oldNames.map((name) => newNames.includes(name) ? false : name).filter((it) => it)[0];
            this.eventEmitter.emit('dirwatcher:changed', removedFile);
        }
    }

    emmitChanged(oldF) {
        if (oldF.length === this.files.length) {
            this.files.map((file) => {
                oldF.map((oldFile) => {
                    if (oldFile.fileName === file.fileName && oldFile.mt.toString() !== file.mt.toString()) {
                        this.eventEmitter.emit('dirwatcher:changed', file.fileName);
                    }
                })
            });
        }
    }
}
