import dotenv from 'dotenv';

type ServerConfigType = {
    PORT: number;
    SALT: number;
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
    SALT: Number(process.env.SALT) || 10
};

export const dbConfig: DbConfigType = {
    HOST: process.env.HOST || 'localhost',
    USERNAME: process.env.USERNAME || 'root',
    PASSWORD: process.env.PASSWORD || 'root@123',
    DATABASE: process.env.DATABASE || 'curefit_dev',
}