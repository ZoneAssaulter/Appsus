import { notesService } from '../services/note.service.js'
// import { eventBusService } from '../services/event-bus.service.js'
// import { utilService } from '../services/util.service.js'


export class KeepApp extends React.Component {

    state = {
        notes: [],
        pinnedNotes: [],
        isNewNoteModalOn: false,
        filterBy: {
            title: '',
            type: 'all'
        },
        exportedMail: null
    }



    componentDidMount() {
        this.loadNotes()
        this.searchParams()
    }

    componentWillUnmount() { }


    onSetTxtFilter = (title) => {
        const titleTxt = title
        this.setState((prevState) =>
            ({ filterBy: { ...prevState.filterBy, title: titleTxt } }), this.loadNotes)
    }

    onSetTypeFilter = (type) => {
        const filterType = type
        this.setState((prevState) =>
            ({ filterBy: { ...prevState.filterBy, type: filterType } }), this.loadNotes)
    }

    searchParams() {
        const query = new URLSearchParams(this.props.location.search)
        // console.log(this.props.location);
        console.log(query);
        const title = query.get('title')
        // console.log('title',title);
        const txt = query.get('txt')
        // console.log('txt',txt);
        if (title || txt) {
            const exportedMail = {
                title,
                txt,
            }
            this.setState({ exportedMail })
            this.setState({ isNewNoteModalOn: true })
        }
    }


    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy)
            .then(notes => {
                this.setState({ notes })
            })
    }

    toggleNewNoteModal = () => {
        this.setState({ isNewNoteModalOn: !this.state.isNewNoteModalOn })
    }



    render() {
        return <section className="keep-app">
            <h1>hello KeepApp</h1>
        </section>
    }
}


//   onSetFilter = (filterBy) => {
//     this.setState({ filterBy }, () => {
//       console.log('filterBy from Car App', this.state.filterBy);
//       this.loadBooks()
//     })
//   }

//   render() {
//     const { books } = this.state
//     return (
//       <section className='book-app '>
//         <React.Fragment>
//           <h2>Home Sweet Home</h2>
//           <BookFilter onSetFilter={this.onSetFilter} />
//           <BookAdd />
//           <BookList books={books} />
//         </React.Fragment>
//       </section>
//     )
//   }
// }