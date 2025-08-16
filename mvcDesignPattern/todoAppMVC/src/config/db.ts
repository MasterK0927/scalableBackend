// import
import {Pool} from "pg";

// init
const pool = new Pool({
    user: 'db_user_name',
    host: 'localhost',
    database: 'db_name',
    password: 'db_password',
    port: 5432,
});

// export object
export const db = {
    pool: pool,
    isConnected: false,
};

// export function
export const connectDb = async() => {
    try {
        await pool.connect();
        db.isConnected = true;
        console.log("db connected");
    } catch (error) {
        console.error("db not connected using dummy data");
        db.isConnected = false;
    }
};