export const BROKER_TOKEN = "@broker-token"
export const isAuthenticated = () => localStorage.getItem(BROKER_TOKEN) !== null
export const getToken = () => localStorage.getItem(BROKER_TOKEN)
export const login = token => localStorage.setItem(BROKER_TOKEN, token)
export const logout = () => localStorage.removeItem(BROKER_TOKEN)