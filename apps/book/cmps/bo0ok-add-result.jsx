export function BookAddResults({ items }) {
    return (
        <ul className='results'>
            {items && items.map((item, idx) =>
                idx < 5 &&
                (<li key={item.id}>
                    {item.volumeInfo.title} <span>+</span>
                </li>
                ))}
        </ul>
    )
}
