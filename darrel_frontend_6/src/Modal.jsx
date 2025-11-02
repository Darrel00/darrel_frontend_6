import { useRef, useEffect } from 'react';

function Modal({ onClose, onAddBook }) {
  const modalRef = useRef();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  function handleSubmit() {
    const formData = new FormData();
    const inputs = modalRef.current.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.value.trim()) {
        formData.append(input.name, input.value.trim());
      }
    });

    if (onAddBook && formData.get('title') && formData.get('author') && formData.get('image')) {
      onAddBook({
        title: formData.get('title'),
        author: formData.get('author'),
        image: formData.get('image'),
        publisher: formData.get('publisher') || '',
        publicationYear: formData.get('publication year') || '',
        language: formData.get('language') || '',
        pages: formData.get('pages') || ''
      });
    }

    handleClose();
  }

  function handleClose() {
    if (modalRef.current) {
      modalRef.current.close();
    }
    if (onClose) {
      onClose();
    }
  }

  return (
    <dialog className="modal" ref={modalRef}>
        <h2>Add a New Book</h2>
      <div className='category'>
        <h3>Title</h3>
        <input className='input' type="text" name="title" placeholder='Book Title...'/>
      </div>
      <div className='category'>
        <h3>Author</h3>
        <input className='input' type="text" name="author" placeholder='Author Name...'/>
      </div>
      <div className='category'>
        <h3>Publisher</h3>
        <input className='input' type="text" name="publisher" placeholder='Publisher Name...'/>
      </div>
      <div className='category'>
        <h3>Publication Year</h3>
        <input className='input' type="text" name="publication year" placeholder='e.g. 2012'/>
      </div>
      <div className='category'>
        <h3>Language</h3>
        <input className='input' type="text" name="language" placeholder='e.g. English...'/>
      </div> 
      <div className='category'>
        <h3>Pages</h3>
        <input className='input' type="number" name="pages"/>
        </div>
      <div className='category'>
        <h3>Book Cover</h3>
        <input className='input' type="url" name="image" placeholder='https://example.com/image.jpg'/>
      </div>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </dialog>
  );
}

export default Modal;