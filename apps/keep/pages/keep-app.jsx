//Todo: we need 6 import from service- notesService/utilService/eventBusService
// from cmps -DynamicNote/NoteFilter/NewNoteModal
//end open class KeepApp end get state with arr for nots/pinnedNotes/obj-filterBy


import { notesService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

import { DynamicNote } from '../../keep/cmps/note-dynamic.jsx'
import { NoteFilter } from '../../keep/cmps/note-filter.jsx'
import { NewNoteModal } from '../../keep/cmps/new-note-modal.jsx'


export class KeepApp extends React.Component {

    state = {
        notes: [],
        pinnedNotes: [],
        isNewNoteModalOn: false,
        filterBy: {
            title: '',
            type: 'all'
        },
        //Todo: make global exportedMail = null
    }


    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadNotes()
        this.searchParams()
        // Todo: shut be send exportedMail to page('/keepapp') if we dont get exportedMail
        this.removeEventBus = eventBusService.on('search', (txt) => this.debbouncedFunc({ txt }))
    }
    componentWillUnmount() {
        this.removeEventBus();
    }

    //todo:(onSetTxtFilter)get filter from state end ...prevState + this.loadNotes
    onSetTxtFilter = (title) => {
        const titleTxt = title
        this.setState((prevState) =>
            ({ filterBy: { ...prevState.filterBy, title: titleTxt } }),
            this.loadNotes)
    }

    debbouncedFunc = utilService.debounce(this.onSetTxtFilter, 100)

    //todo:(onSetTypeFilter) get filter from state end ...prevState + this.loadNotes
    onSetTypeFilter = (type) => {
        const filterType = type
        this.setState((prevState) =>
            ({ filterBy: { ...prevState.filterBy, type: filterType } }),
            this.loadNotes)
    }


    // Todo:make exported mail end shut get obj with title,txt end put(setState)
    //todo:(searchParams) get new URLSearchParams whit location enf get txt/title

    searchParams = () => {
        const query = new URLSearchParams(this.props.location.search)
        // console.log('query', query)
        const title = query.get('title')
        // console.log('title',title)
        const txt = query.get('txt')
        // console.log('txt',txt)
        if (title || txt) {
            // here todo1

            this.setState({ isNewNoteModalOn: true })
        }
    }

    //todo:(loadNotes)get from service query.filtyBy
    // tode: here conect to pin
    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy).then(notes => {
            this.setState({ notes })
        })
        // 11
    }

    // :(toggleNewNoteModal)chek if heve(state)isNewNoteModalOn
    toggleNewNoteModal = () => {
        this.setState({ isNewNoteModalOn: !this.state.isNewNoteModalOn })
    }


    render() {
        const { notes, pinnedNotes, isNewNoteModalOn, exportedMail } = this.state
        if (!notes) return <React.Fragment></React.Fragment>
        const notesTypes = ['all', 'txt', 'todos', 'img', 'video']
        let { type } = this.state.filterBy
        return (
            <section className="keep-app">
                <NoteFilter notesTypes={notesTypes}
                    onSetTypeFilter={this.onSetTypeFilter} currType={type} />
                <button className="btn-new-note"
                    onClick={this.toggleNewNoteModal}>Create New Note</button>
                {isNewNoteModalOn &&
                    <NewNoteModal loadNotes={this.loadNotes}
                        toggleNewNoteModal={this.toggleNewNoteModal}
                    /* todo: render in toggleNewNoteModal (exportedMail) DONT forget to take from this.state */
                    />
                }
                <section className="all-notes-container">
                    {(pinnedNotes && pinnedNotes.length > 0) &&
                        <section className="pinned-notes-container">
                            <section className="pinned-notes ">
                                {pinnedNotes.map(note => {
                                    return (
                                        <DynamicNote key={note.id} note={note} loadNotes={this.loadNotes} />
                                    )
                                })}
                            </section>
                            <hr />
                        </section>}
                    <section className="notes-list">
                        {notes.map(note => {
                            return <DynamicNote key={note.id} note={note}
                                loadNotes={this.loadNotes} />
                        })}
                    </section>
                </section>

            </section>
        )
    }
}






