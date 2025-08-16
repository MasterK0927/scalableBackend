import {Pool} from "pg"

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const db = {
    pool: pool,
    isConnected: false,
};

export const connectToDb = async() => {
    try {
        await db.pool.connect();
        db.isConnected = true;
    } catch(err) {
        db.isConnected = false;
    }
};
