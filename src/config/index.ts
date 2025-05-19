import dotenv from 'dotenv';

type ServerConfigType = {
    PORT: number;
    SALT: number;
    JWT_KEY: string;
}

type DbConfigType = {
    HOST: string;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
}
function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    SALT: Number(process.env.SALT) || 10,
    JWT_KEY: process.env.JWT_KEY || 'secret'
};

export const dbConfig: DbConfigType = {
    HOST: process.env.DB_HOST || 'localhost',
    USERNAME: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root@123',
    DATABASE: process.env.DB_DATABASE || 'curefit_dev',
}