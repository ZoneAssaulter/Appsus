


import { eventBusService } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

export class KeepApp extends React.Component {

    state = {
        notes: [],
        filterBy: {
            title: '',
            type: 'all'
        },
    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    loadNotes() {

    }

    render() {
        return (
            <section className="keep-app">
                Keep App
            </section>
        )
    }

}