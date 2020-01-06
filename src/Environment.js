import { isMac } from "./Secrets";

export const domain = isMac ? 'https://localhost:5001/' : 'https://localhost:44301/';