import { Observer } from "./interfaces";

export class NotificationObserver implements Observer {
    public update(data: any): void {
        console.log(`[LNOTIFICATION] Sending a notification for todo: ${JSON.stringify(data)}`);
    }
}