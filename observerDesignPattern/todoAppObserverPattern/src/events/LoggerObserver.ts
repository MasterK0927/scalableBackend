import { Observer } from './interfaces';

export class LoggerObserver implements Observer {
    public update(data: any): void {
        console.log(`[LOGGER] New todo event received: ${JSON.stringify(data)}`);
    }
}