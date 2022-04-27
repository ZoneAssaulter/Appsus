import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'


export const notesService = {
    query,
    saveNote,
    deleteNote,
    duplicateNote,
    changeBgc,
    // togglePin,
    toggleTodo,
    saveEdit,
    _saveNotesToStorage,
    _loadNotesFromStorage,
    getPinnedNotes
}


const STORAGE_KEY = 'notesDB'
const STORAGE_KEY_PINNED = 'pinnedNotesDB'


const gNotes = [
    {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title: 'Final Sprint - 18.1! ',
            txt: ''
        },
        style: {
            backgroundColor: "#B5EAEA"
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/btPJPFnesV4',
            title: 'Waking up on a sprint day'
        },
        style: {
            backgroundColor: '#CDF2CA'
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title: '',
            txt: `Why did the programmer quit his job?
            Because he didn't get arrays`
        },
        style: {
            backgroundColor: "#CC7351"
        }
    },

    {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        info: {
            url: "assets/imgs/console-meme.jpg",
            title: 'Programming MOTO'
        },
        style: {
            backgroundColor: "#CDF2CA"
        }
    },

    {
        id: utilService.makeId(),
        type: "note-todos",
        isPinned: false,
        info: {
            title: "Get my stuff together",
            todos: [
                {
                    id: utilService.makeId(),
                    txt: 'First sprint',
                    doneAt: new Date()
                },
                {
                    id: utilService.makeId(),
                    txt: 'Second sprint',
                    doneAt: new Date()
                },
                {
                    id: utilService.makeId(),
                    txt: 'Third sprint',
                    doneAt: new Date()
                },
                {
                    id: utilService.makeId(),
                    txt: 'Final sprint',
                    doneAt: null
                }
            ]
        },
        style: {
            backgroundColor: "#B983FF"
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/zRIbf6JqkNc',
            title: '2 hours into the sprint'
        },
        style: {
            backgroundColor: '#32AFA9'
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title: 'Real programmers count from 0',
            txt: ''
        },
        style: {
            backgroundColor: "#B5EAEA"
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/9jK-NcRmVcw',
            title: 'Saturday night 21:59'
        },
        style: {
            backgroundColor: '#B983FF'
        }
    },

    {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            title: 'Did you know?',
            txt: `All arrays Chuck Norris declares are of infinite size, because Chuck Norris knows no bounds.`
        },
        style: {
            backgroundColor: "#FCFFA6"
        }
    },


    {
        id: utilService.makeId(),
        type: 'note-video',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/3YxaaGgTQYM',
            title: 'Me on Saturday night 22:01'
        },
        style: {
            backgroundColor: '#CC7351'
        }
    },

    {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: false,
        info: {
            url: "assets/imgs/brain-dead.jpg",
            title: 'My brain at the end of a sprint'
        },
        style: {
            backgroundColor: "#FCFFA6"
        }
    }

]


_createNotes()

function query(filterBy = null) {
    const notes = _loadNotesFromStorage()
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    return Promise.resolve(filteredNotes)
}

function getPinnedNotes() {
    const pinnedNotes = _loadPinnedNotesFromStorage()
    return Promise.resolve(pinnedNotes)
}

function _getFilteredNotes(notes, filterBy) {
    const { type } = filterBy
    const title = filterBy.title.txt
    let filteredNotes = notes
    if (type !== 'all') {
        filteredNotes = notes.filter(note => {
            return note.type === `note-${type}`
        })
    }
    filteredNotes = _getFilteredNotesByTitle(filteredNotes, title)
    return filteredNotes
}

function _getFilteredNotesByTitle(notes, txt) {
    if (!txt) txt = ''
    txt = txt.toLowerCase()
    return notes.filter(note => {
        let title = note.info.title.toLowerCase()
        return title.includes(txt)
    })
}

function toggleTodo(noteId, todoId) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => noteId === note.id)
    const todo = note.info.todos.find(todo => todo.id === todoId)
    if (!todo.doneAt) todo.doneAt = new Date()
    else todo.doneAt = null
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

// function togglePin(note) {
//     const noteId = note.id
//     let notes = _loadNotesFromStorage()
//     let pinnedNotes = _loadPinnedNotesFromStorage()
//     if (!pinnedNotes) pinnedNotes = []
//     if (!note.isPinned) {
//         let noteIdx = notes.findIndex(note => note.id === noteId)
//         notes.splice(noteIdx, 1)
//         pinnedNotes = [note, ...pinnedNotes]
//     } else {
//         let noteIdx = pinnedNotes.findIndex(note => note.id === noteId)
//         pinnedNotes.splice(noteIdx, 1)
//         notes = [note, ...notes]
//     }
//     note.isPinned = !note.isPinned
//     _saveNotesToStorage(notes)
//     _savePinnedNotesToStorage(pinnedNotes)
//     return Promise.resolve()
// }

function changeBgc(noteId, color) {
    const notes = _loadNotesFromStorage()
    const note = notes.find(note => note.id === noteId)
    note.style.backgroundColor = color
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

function duplicateNote(noteId) {
    let notes = _loadNotesFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)
    const note = JSON.parse(JSON.stringify(notes[noteIdx]))
    note.id = utilService.makeId()
    notes.splice(noteIdx, 0, note)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function deleteNote(noteId) {
    let notes = _loadNotesFromStorage()
    notes = notes.filter(note => noteId !== note.id)
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function saveEdit(note) {
    let notes = _loadNotesFromStorage()
    const noteId = note.id
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx] = note
    _saveNotesToStorage(notes)
    return Promise.resolve(note)
}

function saveNote(note) {
    note.id = utilService.makeId()
    note.info.title = utilService.capitalFirstLetter(note.info.title)
    if (note.type === 'note-todos') {
        const todosArr = note.info.todos
        const todos = todosArr.map(todo => {
            return { id: utilService.makeId(), txt: todo }
        })
        note.info.todos = todos
    }
    if (note.type === 'note-video') {
        const youtubeId = utilService.getYoutubeId(note.info.url)
        note.info.url = `https://www.youtube.com/embed/${youtubeId}`
    }
    let notes = _loadNotesFromStorage()
    notes = [note, ...notes]
    _saveNotesToStorage(notes)
    return Promise.resolve()
}

function _createNotes() {
    var notes = _loadNotesFromStorage()
    if (!notes || !notes.length) {
        _saveNotesToStorage(gNotes)
    }
}



function _saveNotesToStorage(notes) {
    storageService.saveToStorage(STORAGE_KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _savePinnedNotesToStorage(notes) {
    storageService.saveToStorage(STORAGE_KEY_PINNED, notes)
}

function _loadPinnedNotesFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY_PINNED)
}