export class LoggerSingleton {
    private static instance: LoggerSingleton;

    private constructor() {
        console.log("Logger instance created");
    }

    public static getInstance(): LoggerSingleton {
        if (!LoggerSingleton.instance) LoggerSingleton.instance = new LoggerSingleton();
        return LoggerSingleton.instance;
    }

    public log(message:string): void {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${message}`);
    }
}