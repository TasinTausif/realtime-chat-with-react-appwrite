import { Client, Account, Databases } from "appwrite";
import {PROJECT_ID, DATABASE_ID, PROJECT_ENDPOINT, COLLECTION_ID} from "../appwrite/conf.js"

const client = new Client()
    .setEndpoint(PROJECT_ENDPOINT)
    .setProject(PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
