import moment from "moment";

const initialState = {
    domains: {
        isFetching: true,
        items: []
    },
    user: {
        id: Number(localStorage.getItem("track-id")) > - 1 ? Number(localStorage.getItem("track-id")) : undefined,
        level: Number(localStorage.getItem("track-level")) > -1 ? Number(localStorage.getItem("track-level")) : undefined,
    },
    checked: false,
    logged: false,
    selectedDomain: 0,
    date: [moment().subtract(20, 'days'), moment()],
    theme: localStorage.getItem("track-theme") === "dark" ? "dark" : "light",
    filter: {
        tags: [],
        countries: [],
        pages: [],
        referrers: [],
        ip: null,
        sessionMax: null,
        sessionMin: null
    }
}

const oldKlikReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOGGED": {
            localStorage.setItem("track-id", action.id);
            localStorage.setItem("track-level", action.level);
            return {
                ...state,
                user: {
                    id: action.id,
                    level: action.level
                },
            }
        }
        case "SET_THEME": {
            localStorage.setItem("track-theme", action.theme)
            return {
                ...state,
                theme: action.theme
            }
        }
        case "SET_DOMAINS": {
            return {
                ...state,
                logged: true,
                domains: {
                    isFetching: false,
                    items: action.sites
                }
            }
        }
        case "SET_CHECKED": {
            return {
                ...state,
                checked: true
            }
        }
        case "SELECT_DOMAIN": {
            return {
                ...state,
                selectedDomain: `${action.i}`
            }
        }
        case "SET_DATE": {
            return {
                ...state,
                date: action.date
            }
        }
        case "ADD_FILTER": {
            if(state.filter[action.key].indexOf(action.value) > -1){
                return state
            }
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.key]: [...state.filter[action.key], action.value]
                }
            }
        }
        case "REMOVE_FILTER": {
            const items = [...state.filter[action.key]];
            items.splice(action.index, 1);
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.key]: items
                }
            }
        }
        case "SET_IP": {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ip: action.ip
                }
            }
        }
        case "REMOVE_IP": {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ip: null
                }
            }
        }
        case "SET_SESSION_LENGTH": {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    sessionMin: action.min,
                    sessionMax: action.max,
                }
            }
        }

        default: {
            return state;
        }
    }
}

export default oldKlikReducer;