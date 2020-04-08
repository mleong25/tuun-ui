const isMac = process.env.isMac;
export const domain = isMac ? 'https://localhost:5001/' : 'https://localhost:44301/';
