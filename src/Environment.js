const isMac = process.env.REACT_APP_isMac;
export const domain = isMac ? 'https://localhost:5001/' : 'https://localhost:44301/';
