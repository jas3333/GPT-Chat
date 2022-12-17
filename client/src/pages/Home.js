import { useEffect, useState } from 'react';
import axios from 'axios';

import personas from './../data/personas';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';
import Modal from '../components/Modal';

const Home = ({
    chatResponse,
    setChatResponse,
    showModal,
    setShowModal,
    title,
    setTitle,
    category,
    setCategory,
    showSettings,
}) => {
    const [loading, setLoading] = useState(false);

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [persona, setPersona] = useState(personas.default);
    const [threadSize, setThreadSize] = useState(1);

    // Values for Prompt
    // const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState('');

    // Sets the prompt with instructions.
    const promptOptions = `Respond in markdown and use a codeblock with the language if there is code. ${persona} STOP`;

    const onSave = async (event) => {
        event.preventDefault();
        const packedConversation = { title, category, conversation: [...chatResponse] };
        setChatResponse([]);
        setConversation('');
        setTitle('');
        setShowModal(false);

        if (title && chatResponse.length !== 0) {
            console.log(packedConversation);
            try {
                const post = await axios.post('http://localhost:5001/api', packedConversation);
            } catch (error) {
                console.log(error);
            }
        }
    };

    console.log(conversation);

    const onSubmit = async (event, question) => {
        event.preventDefault();
        console.log(question);

        setLoading(true);
        const options = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const promptData = {
            model: selectedModel,
            prompt: `${promptOptions}${conversation}\nUser: ${question}.\n`,
            top_p: Number(nucleus),
            max_tokens: Number(tokens),
            temperature: Number(temperature),
            n: 1,
            stream: false,
            logprobs: null,
            stop: ['STOP', 'User:'],
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/completions', promptData, options);
            console.log(response);
            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
                totalTokens: response.data.usage.total_tokens,
            };

            setLoading(false);
            setChatResponse([...chatResponse, newChat]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Scrolls to bottom of the page as new content is created
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [chatResponse]);

    useEffect(() => {
        if (chatResponse.length > threadSize) {
            const newArray = [...chatResponse];
            newArray.splice(0, newArray.length - threadSize);
            setConversation(newArray.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
        } else {
            setConversation(chatResponse.map((chat) => `${chat.promptQuestion}\n${chat.botResponse}\n`));
        }
    }, [chatResponse, threadSize]);

    // Props for Prompt component
    const forPrompt = { onSubmit, loading };

    // Props for PromptController
    const forPrompController = {
        // Functions
        setTemperature,
        setTokens,
        setSelectedModel,
        setNucleus,
        setPersona,
        setThreadSize,
        setChatResponse,
        setShowModal,
        onSave,

        // State
        temperature,
        tokens,
        nucleus,
        persona,
        personas,
        threadSize,
        showModal,
        showSettings,
    };

    const forModal = {
        // Functions
        setTitle,
        setShowModal,
        setCategory,
        onSave,

        // State
        title,
        category,
    };

    return (
        <div className='container-col auto mg-top-vlg radius-md size-lg '>
            <div className='container-col '>
                {chatResponse && chatResponse.map((item, index) => <Completion {...item} key={index} />)}
            </div>
            {showModal && <Modal {...forModal} />}
            <PromptController {...forPrompController} />
            <Prompt {...forPrompt} />
        </div>
    );
};

export default Home;
