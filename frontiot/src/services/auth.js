export const BROKER_TOKEN = "@broker-token"
export const isAuthenticated =  () => localStorage.getItem(BROKER_TOKEN) !== null
export const getToken =         () => JSON.parse(localStorage.getItem(BROKER_TOKEN))
export const login =            (token) => localStorage.setItem(BROKER_TOKEN, JSON.stringify(token))
export const logout =           () => localStorage.removeItem(BROKER_TOKEN)