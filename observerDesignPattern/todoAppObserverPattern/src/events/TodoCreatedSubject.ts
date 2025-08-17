import { Observer, Subject } from "./interfaces";

export class TodoCreatedSubject implements Subject {
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) return console.log('Observer has been attached already.');
        this.observers.push(observer);
        console.log('Observer attached.');
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex == -1) return console.log('Observer detached');
        this.observers.splice(observerIndex, 1);
        console.log('Observer detached.');
    }

    public notify(data: any): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
}