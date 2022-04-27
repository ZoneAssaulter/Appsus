
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'



export const notesService = {
    query,
    saveNote,
    deleteNote,
    duplicateNote,
    changeBgc,
    togglePin,
    toggleTodo,
    saveEdit,
    _saveNotesToStorage,
    _loadNotesFromStorage,
    getPinnedNotes
}

const KEY = 'notesDB'
const KEY_PINNED = 'pinnedNotesDB'

const gNotes = [
    {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: '#00d'
        }
    },

    {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/btPJPFnesV4',
            title: "Get my stuff together",
        },
        style: {
            backgroundColor: '#00d'
        }
    },
]



_createNotes()



function query() {
    let notes = _loadNotesFromStorage()
    return Promise.resolve(notes)
}


function getPinnedNotes() {
    const pinnedNotes = _loadPinnedNotesFromStorage()
    return Promise.resolve(pinnedNotes)
}


function _createNotes() {
    const notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        _saveNotesToStorage(gNotes)
    }
}

function _saveNotesToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _savePinnedNotesToStorage(notes) {
    storageService.saveToStorage(KEY_PINNED, notes)
}

function _loadPinnedNotesFromStorage() {
    return storageService.loadFromStorage(KEY_PINNED)
}

