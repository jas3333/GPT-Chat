import { useState } from 'react';

const Prompt = ({ question, setQuestion, onSubmit, loading }) => {
    const [rows, setRows] = useState(1);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.shiftKey && rows !== 5) {
            setRows(rows + 1);
        } else if (event.key === 'Del') {
            setRows(rows - 1);
        } else if (event.keyCode === 13) {
            event.preventDefault();
            onSubmit();
        }
    };
    return (
        <div className='container auto content-center align mg-bot-lg '>
            <form onSubmit={onSubmit}>
                <textarea
                    rows={rows}
                    resize='none'
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    cols='50'
                    className='input-text'
                    onKeyDown={handleKeyDown}
                    autoFocus={true}
                />
            </form>
            <div className='loader '>{loading && <div className='spinner'></div>}</div>
        </div>
    );
};

export default Prompt;
