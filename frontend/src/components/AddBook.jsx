import React, { useState } from 'react'

const bookPaceholder = {
    id: 0,
    title: 'xxxx',
    author: '',
    description: '',
    img: '',
    status: 'todo'
}

export default function AddBook() {
    const [bookFromData, setBookFromData] = useState(() => bookPaceholder);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        !bookFromData.id ?
        setBookFromData({
            ...bookFromData,
            id:Math.round(Math.random() * 10000),
            [name]: value,
        }) :
        setBookFromData({
            ...bookFromData,
            [name]: value,
        });
    };

    const handleSave = () => {
        let isFormDataValid = true;
        Object.values(bookFromData).forEach((val) => {
            if (!val)
                isFormDataValid = false;
        });
        if(!isFormDataValid) return console.error('All input fields are mandatory',bookFromData);
        fetch('http://localhost:3001/books', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookFromData)
        }).then(res => console.log("Status of adding a book:" + res.status));
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Book to read list</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 row">
                            <label htmlFor="staticEmail" className="col-sm-4 col-form-label">id</label>
                            <div className="col-sm-8">
                                <input type="text" readOnly className="form-control-plaintext" name="bookId" id="bookId" value={bookFromData.id} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="bookTitle" className="col-sm-4 col-form-label">Book Title</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="bookTitle" name='title' value={bookFromData.title} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="author" className="col-sm-4 col-form-label">Author</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="author" name='author' value={bookFromData.author} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="description" className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="description" name='description' value={bookFromData.description} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="imgUrl" className="col-sm-4 col-form-label">Image Url</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="imgUrl" name='img' value={bookFromData.img} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="status" className="col-sm-4 col-form-label">Reading Status</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="status" id="status" aria-label="Default select example" value={bookFromData.status} onChange={handleInputChange}>
                                    <option value="todo">To Do</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
