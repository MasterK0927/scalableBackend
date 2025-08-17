export interface Observer {
    update(data: any): void;
}

export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(data: any): void;
}