import React from 'react'


function BookCard(props) {
    return (
        <div className="card">
            <img src={props.book.img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.book.title}</h5>
                <p className="card-text">{props.book.description}</p>
                <p className="card-text"><small className="text-muted">Status:{props.book.status}</small></p>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" checked={props.book.status === 'todo'}/>
                    <label className="btn btn-outline-primary" for="btnradio1">To Read</label>

                    <input type="radio" className="btn-check" name="btnradio" checked={props.book.status === 'inprogress'}/>
                    <label className="btn btn-outline-primary" for="btnradio2">Reading</label>

                    <input type="radio" className="btn-check" name="btnradio" checked={props.book.status === 'done'}/>
                    <label className="btn btn-outline-primary" for="btnradio3">Done</label>
                </div>
            </div>
        </div>
    )
}

export default function Books(props) {
    return (
        <div className="card-group">
            {
                props.books.map((book, i) => {
                    return <BookCard book={book} key={i}></BookCard>
                })
            }
        </div>
    )
}