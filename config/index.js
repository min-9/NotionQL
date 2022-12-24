import { config } from 'dotenv';

config();

export const NOTION_TOKEN = process.env.NOTION_TOKEN;
export const DATABASE_ID = process.env.DATABASE_ID;
export const NOTION_API_URL = process.env.NOTION_API_URL;
