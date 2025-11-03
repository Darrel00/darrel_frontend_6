function Book(props) {
    return (
        <div>
            <div
                className={`book ${props.selected ? 'book-selected' : ''}`}
                onClick={props.onSelect}
            >
                {props.image && <img src={props.image} alt={props.title}
                className="book-image" />}
            </div>
            <h2 className="title">
                {props.title}
                {props.status === 'on loan' && <span className="loan-indicator"> - on loan</span>}
            </h2>
            <p className="author">{props.author}</p>
            <p className="price">{props.price}</p>
            <a href={props.url} target="_blank" className="url">More Info</a>
        </div>
    );
}

export default Book;