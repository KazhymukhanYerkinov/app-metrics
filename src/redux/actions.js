export const setDomains = (sites) => ({
    type: "SET_DOMAINS",
    sites
})

export const setLogged = (id, level) => ({
    type: "SET_LOGGED",
    id,
    level
})

export const selectDomain = (i) => ({
    type: "SELECT_DOMAIN",
    i
})

export const setChecked = () => ({
    type: "SET_CHECKED"
})

export const setDate = (date) => ({
    type: "SET_DATE",
    date
})

export const addFilter = (key, value) => ({
    type: "ADD_FILTER",
    key,
    value
})

export const removeFilter = (key, index) => ({
    type: "REMOVE_FILTER",
    key,
    index
})

export const setIP = (ip) => ({
    type: "SET_IP",
    ip
})

export const removeIP = () => ({
    type: "REMOVE_IP",
})

export const setSessionLength = (min, max) => ({
    type: "SET_SESSION_LENGTH",
    min,
    max
})

export const setTheme = (theme) => ({
    type: "SET_THEME",
    theme
})