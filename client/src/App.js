import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Conversations from './pages/Conversations';
import Home from './pages/Home';

function App() {
    // Values for Home
    const [chatResponse, setChatResponse] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState('question');
    const [title, setTitle] = useState('');

    const forHome = {
        // Functions
        setChatResponse,
        setShowModal,
        setCategory,
        setTitle,

        // State
        chatResponse,
        showModal,
        category,
        title,
    };

    return (
        <div className='container '>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home {...forHome} />} />
                    <Route
                        path='/conversations'
                        element={<Conversations setChatResponse={setChatResponse} chatResponse={chatResponse} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
