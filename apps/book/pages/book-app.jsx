import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookAdd } from '../cmps/book-add.jsx'




export class BookApp extends React.Component {

  // state = {
  //   books: [],
  //   filterBy: null,
  // }

  // componentDidMount() {
  //   this.loadBooks()
  // }

  // loadBooks = () => {
  //   bookService.query(this.state.filterBy)
  //     .then((books) => this.setState({ books }))
  // }

  // onSetFilter = (filterBy) => {
  //   this.setState({ filterBy }, () => {
  //     console.log('filterBy from Car App', this.state.filterBy);
  //     this.loadBooks()
  //   })
  // }

  render() {
    // const { books } = this.state
    return (
      <section className='book-app '>
        <React.Fragment>
          <h2>Home Sweet Home</h2>
          {/* <BookFilter onSetFilter={this.onSetFilter} />
          <BookAdd />
          <BookList books={books} /> */}
        </React.Fragment>
      </section>
    )
  }
}

