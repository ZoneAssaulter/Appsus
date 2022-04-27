import { utilService } from "../../../services/util.service.js"

export function NoteFilter({ notesTypes, onSetTypeFilter, currType }) {

    return (
        <section className="filter-by">
            <h2>Filter notes by type:</h2>
            <div className="filter-btns">
                {notesTypes.map(type => {
                    return <button title={utilService.capitalFirstLetter(type)} className={type === currType ? 'active' : ''}
                        key={type} onClick={() => onSetTypeFilter(type)} >
                        <img src={`assets/img/${type}.jpg`} />
                    </button>
                })}
            </div>
        </section>
    )
}