import { combineReducers } from 'redux';

const initialHistoryState = {
    history: [{
        track_id: '',
        title: '',
        artist: '',
        album: '',
        duration: '',
        album_art: '',
        url: ''
    }]
}


function historyReducer(state=initialHistoryState, action) {
    switch (action.type) {
        case 'HISTORY_SUCCESS':{
            return {
                ...state,
                history: action.payload.history
            }
        }
        default:
            return state;
    }
}

const initialLibraryState = {
    total_pages: 0,
    page:0,
    library: [{
        album_id: '',
        title: '',
        artist: '',
        album_art: '',
        tracks: [
            {
                track_id: '',
                title: '',
                artist: '',
                album: '',
                duration: '',
                album_art: ''
            }
        ],
        url: ''
    }]
}

function libraryReducer(state=initialLibraryState, action) {
    switch (action.type) {
        case 'LIBRARY_SUCCESS':{
            return {
                ...state,
                total_pages: action.payload.total_pages,
                page: action.payload.page,
                library: action.payload.albums
            }
        }
        default:
            return state;
    }
}

const initialCurrentState = {
    currentTrack: {
        title: '',
        artist: '',
        album: '',
        duration: '',
        album_art: ''
    }
}

function currentReducer(state=initialCurrentState, action) {
    switch (action.type) {
        case 'CURRENT_SUCCESS':{
            return {
                ...state,
                currentTrack: action.payload.track
            }
        }
        default:
            return state;
    }
}


const initialPageState = {
        currentPage: "" 
}

function pageReducer(state=initialPageState, action) {
    if (action.currentPage){
    return {
         ...state,
         currentPage: action.currentPage
     }
    }
    return state
}

const reducers = {
    currentStore:  currentReducer,
    historicStore: historyReducer,
    libraryStore:  libraryReducer,
    pageStore:     pageReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer;
