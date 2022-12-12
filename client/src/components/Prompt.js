import { useState } from 'react';

const Prompt = ({ question, setQuestion, onSubmit, loading }) => {
    const [rows, setRows] = useState(1);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
            setRows(rows + 1);
        }
    };
    const handleSubmit = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            setRows(1);
            onSubmit(event);
        }
    };
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <div className='container'>
                <form onKeyDown={handleKeyDown} className=''>
                    <textarea
                        rows={rows}
                        resize='none'
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        cols='50'
                        className='input-text'
                        onKeyDown={handleSubmit}
                        autoFocus={true}
                        placeholder='Ask a question'
                    />
                </form>
                <div className='loader '>{loading && <div className='spinner '></div>}</div>
            </div>
        </div>
    );
};

export default Prompt;
