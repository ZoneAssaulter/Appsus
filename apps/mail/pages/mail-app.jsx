import { eventBusService } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { EmailCompose } from '../cmps/email-compose.jsx'
import { emailService } from '../services/email.service.js'

export class MailApp extends React.Component {
  state = {
    emails: [],
    criteria: {
      status: 'inbox',
      txt: '',
      isRead: undefined,
      isStarred: undefined,
    },
    isShowCompose: false,
    sort: {
      type: 'byDate',
      order: 1,
    },
    noteEmail: {
      subject: '',
      body: '',
    },
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    this.loadEmails()
    this.removeEventBus()
    this.searchParams()
  }

  componentWillUnmount() {
    this.removeEventBus()
  }

  removeEventBus = () => {
    eventBusService.on('search', (txt) => this.debouncedFunc({ txt }))
  }

  searchParams = () => {
    const query = new URLSearchParams(this.props.location.search)
    const subject = query.get('subject')
    const body = query.get('body')
    this.setState({ noteEmail: { subject, body } })
    if (subject || body) {
      this.setState({ isShowCompose: true })
    }
  }

  debouncedFunc = utilService.debounce(this.onSetCriteria, 10)

  loadEmails = () => {
    console.log('loading emails')
    const { criteria, sort } = this.state
    console.log('criteria:', criteria, 'sort:', sort)
    emailService.query(criteria, sort).then((emails) => {
      console.log('query().then')
      this.setState({ emails })
      this.props.history.push('/mailapp')
    })
  }

  onToggleCompose = () => {
    this.setState({ isShowCompose: !this.state.isShowCompose })
  }

  render() {
    const { emails, criteria, isShowCompose, noteEmail } = this.state
    const { emailId } = this.props.match.params
    return (
      <section className='mail-app'>
        <aside className='aside-container'>
          <button className='compose-btn' onClick={this.onToggleCompose}>
            <img src='./assets/img/compose-plus.png' />
          </button>
          {isShowCompose && (
            <EmailCompose
              onToggleCompose={this.onToggleCompose}
              loadEmails={this.loadEmails}
              emailId={emailId}
              noteEmail={noteEmail}
            />
          )}
        </aside>
      </section>
    )
  }
}
