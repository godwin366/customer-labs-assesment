import axios from "axios";
export const myAddres = "af531ef7-610b-4fbc-af12-88486575afe4" // must keep this on env  or else we can 

export const webHookInstance = axios.create({baseURL: `https://webhook.site/${myAddres}`})