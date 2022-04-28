//Todo: we need 8 import 
// from service- notesService/eventBusService
// from cmps -TxtNote/NewImgNote/ImgNote/TodosNote/VideoNote/PickNoteColor/EditNoteModal
//end open class DynamicNote end get state withchek if heve color/edit modal



import { notesService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

import { TxtNote } from "./note-txt.jsx"
import { ImgNote } from "./note-img.jsx"
import { TodosNote } from "./note-todo.jsx"
import { VideoNote } from "./note-video.jsx"
import { PickNoteColor } from "./note-pick-color.jsx"
import { EditNoteModal } from "././note-edit-modal.jsx"


const { Link } = ReactRouterDOM

export class DynamicNote extends React.Component {

    state = {
        note: null,
        isColorMenuOn: false,
        isEditModalOn: false
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { note } = this.props
        this.setState({ note })
    }

    onToggleTodo = (noteId, todoId) => {
        notesService.toggleTodo(noteId, todoId)
            .then((note) => {
                this.setState({ note })
            })
    }

    // :(onDeleteNote)grt from eventBusService(emit) enf put msg (like ew do in book)
    onDeleteNote = (noteId) => {
        notesService.deleteNote(noteId)
            .then(() => {
                this.props.loadNotes()
                eventBusService.emit(
                    'user-msg', { txt: 'Note Deleted', type: 'success' })
            })
    }
    // :(duplicateNote)like onDeleteNote
    onDuplicateNote = (noteId) => {
        notesService.duplicateNote(noteId)
            .then(() => {
                this.props.loadNotes()
                eventBusService.emit(
                    'user-msg', { txt: 'Note Duplicated', type: 'success' })
            })
    }

    // : change bgColor gte from notesService
    onChangeBgc = (noteId, color) => {
        notesService.changeBgc(noteId, color)
            .then((note) => {
                this.setState({ note })
                this.onToggleColorMenu()
            })
    }
    // :(togglePin) get from  notesService enf get loadNotes
    
    // :(toggleColor) setState = state if is not true
    onToggleColorMenu = () => {
        this.setState({ isColorMenuOn: !this.state.isColorMenuOn })
    }

    // :(toggleEdit) setState = state if is not true
    onToggleEditModal = () => {
        this.setState({ isEditModalOn: !this.state.isEditModalOn })
    }

    // :(saveEdit) get from notesService end emit from eventBusService(:type/txt)
    onSaveEdit = (ev, note) => {
        ev.preventDefault()
        notesService.saveEdit(note)
            .then(() => {
                this.setState({ note }),
                    this.onToggleEditModal()
                eventBusService.emit('user-msg', { txt: 'Edits Saved', type: 'success' })
            })
    }

    // todo: switch/case for (exportEmail)
    onExportNoteToEmail = (note) => {
        const subject = (note.info.title) ? note.info.title : 'no subject'
        let body = 'no body'
        switch (note.type) {
            case 'note-txt':
                body = note.info.txt
                break;
            case 'note-video':
                body = note.info.url
                break;
            case 'note-img':
                body = note.info.url
                break;
            case 'note-todos':
                const todosTxts = note.info.todos.map(todo => todo.txt);
                body = 'Todos: \n• ' + todosTxts.join('\n* ');
                break;
        }
        return `/mailapp?subject=${subject}&body=${body}`
    }


    // todo: get funcExportEmail end send us to page email ehite button
    // after we fge from this.....
    // todo: get from pages TxtNote/ImgNot/TodosNote/TxtNote
    render() {
        const { note, isColorMenuOn, isEditModalOn } = this.state
        // {console.log('note',note)}
        if (!note) return <React.Fragment></React.Fragment>
        // const { isPinned } = note
        // {console.log('isPinned',isPinned)}
        return (
            <section className="note-dynamic" >
                {note.type === 'note-txt' && <TxtNote note={note} />}
                {note.type === 'note-video' && <VideoNote note={note} />}
                {note.type === 'note-img' && <ImgNote note={note} />}
                {note.type === 'note-todos' &&
                    <TodosNote note={note} onToggleTodo={this.onToggleTodo} />}

                <section className="note-btns">
                    <button title="Delete" onClick={() =>
                        this.onDeleteNote(note.id)}>
                        <img src="assets/img/icons-keep/delete.png" />
                    </button>

                    <button title="Duplicate" onClick={() =>
                        this.onDuplicateNote(note.id)}>
                        <img src="assets/img/icons-keep/duplicate/duplicate.png" />
                    </button>

                    <button title="Edit" onClick={this.onToggleEditModal}>
                        <img src="assets/img/icons-keep/edit/edit1.png" />
                    </button>

                    {/* here todo1 */}
                   

                    <button title="Change color" onClick={() =>
                        this.onToggleColorMenu(note.id)}>
                        <img src="assets/img/icons-keep/change-color.png" />
                    </button>
                    
                    {isColorMenuOn && <PickNoteColor noteId={note.id}
                        onChangeBgc={this.onChangeBgc} />}
                </section>
                {isEditModalOn && <EditNoteModal note={note}
                    onToggleEditModal={this.onToggleEditModal}
                    onSaveEdit={this.onSaveEdit} />}
            </section>
        )
    }
}
// style={{ backgroundColor: note.style.backgroundColor }}