const CURRENT_REQUEST = "CURRENT_REQUEST"
const CURRENT_SUCCESS = "CURRENT_SUCCESS"
const CURRENT_ERROR = "CURRENT_ERROR"


function fetchCurrentTrackRequest(){
    return {
        type: CURRENT_REQUEST,
    }
}

function fetchCurrentTrackError(){
    return {
        type: CURRENT_ERROR,
    }
}
function fetchCurrentTrackSuccess(payload){
    return {
        type: CURRENT_SUCCESS,
        payload: payload
    }
}

export function fetchCurrentTrack() {
    return (dispatch) => {
        dispatch(fetchCurrentTrackRequest());
        return fetchCurrent().then(([response, json]) =>{
                if(response.status === 200){
                        dispatch(fetchCurrentTrackSuccess(json))
                      }
              else{
                        dispatch(fetchCurrentTrackError())
                    }
            })
      }
}


function fetchCurrent() {
  const URL = "https://enterprise.philgore.net/current";
  return fetch(URL, { method: 'GET' })
     .then( response => Promise.all([response, response.json()]) );
}

const HISTORY_REQUEST = "HISTORY_REQUEST"
const HISTORY_SUCCESS = "HISTORY_SUCCESS"
const HISTORY_ERROR =   "HISTORY_ERROR"


function fetchHistoryRequest(){
    return {
        type: HISTORY_REQUEST,
    }
}

function fetchHistoryError(){
    return {
        type: HISTORY_ERROR,
    }
}
function fetchHistorySuccess(payload){
    return {
        type: HISTORY_SUCCESS,
        payload: payload
    }
}

export function fetchHistory() {
    return (dispatch) => {
        dispatch(fetchHistoryRequest());
        return fetchHistoric().then(([response, json]) =>{
                if(response.status === 200){
                        dispatch(fetchHistorySuccess(json))
                      }
              else{
                        dispatch(fetchHistoryError())
                    }
            })
      }
}


function fetchHistoric() {
  const URL = "https://enterprise.philgore.net/history";
  return fetch(URL, { method: 'GET' })
     .then( response => Promise.all([response, response.json()]) );
} 


const LIBRARY_REQUEST = "LIBRARY_REQUEST"
const LIBRARY_SUCCESS = "LIBRARY_SUCCESS"
const LIBRARY_ERROR =   "LIBRARY_ERROR"


function fetchLibraryRequest(page){
    return {
        type: LIBRARY_REQUEST,
        page: page
    }
}

function fetchLibraryError(){
    return {
        type: LIBRARY_ERROR,
    }
}
function fetchLibrarySuccess(payload){
    return {
        type: LIBRARY_SUCCESS,
        payload: payload
    }
}

export function fetchLibrary(page) {
    return (dispatch) => {
        dispatch(fetchLibraryRequest(page));
        return fetchList(page).then(([response, json]) =>{
                if(response.status === 200){
                        dispatch(fetchLibrarySuccess(json))
                      }
              else{
                        dispatch(fetchLibraryError())
                    }
            })
      }
}


function fetchList(page) {
  const URL = "https://enterprise.philgore.net/list?page="+page;
  return fetch(URL, { method: 'GET' })
     .then( response => Promise.all([response, response.json()]) );
}

const PAGE_HOME = "HOME"
const PAGE_LIBRARY = "LIBRARY"
const PAGE_ABOUT = "ABOUT"


function setPageHome(){
    return {
        type: PAGE_HOME,
        currentPage: PAGE_HOME
    }
}

function setPageLibrary(){
    return {
        type: PAGE_LIBRARY,
        currentPage: PAGE_LIBRARY
    }
}
function setPageAbout(){
    return {
        type: PAGE_ABOUT,
        currentPage: PAGE_ABOUT
    }
}

export function setPage(page){
    return (dispatch) => {
        switch(page) {
         case PAGE_HOME: 
                dispatch(setPageHome())
                break;
         case PAGE_LIBRARY: 
                dispatch(setPageLibrary())
                break;
         case PAGE_ABOUT: 
                dispatch(setPageAbout())
                break;
         default: 
                dispatch(setPageHome())
                break;
        }
    }
}
