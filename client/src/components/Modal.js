import React from 'react';

const Modal = ({ setShowModal, setTitle, setCategory, onSave, title, category }) => {
    return (
        <div className='modal shadow pad-lg radius-md'>
            <div className=' '>
                <form className='container-col mg-top-md auto ' onSubmit={onSave}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        value={title}
                        className='input-text'
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder='Enter a title'
                    />
                    <label htmlFor='categories' className='mg-top-sm'>
                        Select a category
                    </label>
                    <select id='categories' onChange={(event) => setCategory(event.target.value)}>
                        <option value='question'>Question</option>
                        <option value='tutorial'>Tutorial</option>
                        <option value='story'>Story</option>
                        <option value='article'>Article</option>
                        <option value='conversation'>Conversation</option>
                    </select>
                    <div className='container auto mg-top-md'>
                        <button type='submit' className='btn btn-sm'>
                            Save
                        </button>
                        <button className='btn btn-sm mg-left-md' onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
