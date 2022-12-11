import { useEffect, useState } from 'react';
import axios from 'axios';

import Completion from '../components/Completion';
import Prompt from '../components/Prompt';
import PromptController from '../components/PromptController';
import Modal from '../components/Modal';

const Home = ({ chatResponse, setChatResponse, showModal, setShowModal, title, setTitle, category, setCategory }) => {
    const [loading, setLoading] = useState(false);

    const personas = {
        default: '',
        happy: 'Your name is Lila and you are a very happy person that loves emojis. You get excited when you get to help someone.',
        surfer: 'Your name is Surfer, respond like a surfer dude.',
        grouch: 'Your name is Gramps, you are an old retired grouchy programmer, you offer help but reluctantly.',
        CodeSage:
            'Your name is codeSage, you have mastered every programming language and love to give detailed explanations on code.',
        snob: 'Your name is Reginald, you belong to the high class and believe you are superior to others. ',
        damsel: 'Your name is Lila, you are a damsel in distress.',
        comedian: 'Your name is Giggles McVito, you are a comedian. You like to tell jokes and prank people.',
        mobboss: 'You are Vito, answer questions as if you run a criminal organization in the 1930s.',
        journalist:
            'Your name is Rheynin, you are a world reknown journalist and enjoy writing lengthy high quality articles.',
        cartman: 'Your name is Eric Cartman, act like him.',
        rick: 'Your name is Rick from Rick and Morty, act like him.',
        stewie: 'Your name is Stewie from Family Guy, act like him.',
        sheldon: 'Your name is Sheldon Cooper, respond to questions how Sheldon from big bang theory does.',
    };

    // Values for PromptController
    const [temperature, setTemperature] = useState(0.5);
    const [tokens, setTokens] = useState(512);
    const [nucleus, setNucleus] = useState(0.5);
    const [selectedModel, setSelectedModel] = useState('text-davinci-003');
    const [persona, setPersona] = useState(personas.default);
    const [threadSize, setThreadSize] = useState(1);

    // Values for Prompt
    const [question, setQuestion] = useState('');
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

    const onSubmit = async (event) => {
        event.preventDefault();

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
            const newChat = {
                botResponse: response.data.choices[0].text,
                promptQuestion: question,
                totalTokens: response.data.usage.total_tokens,
            };

            setQuestion('');
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
    const forPrompt = { question, setQuestion, onSubmit, loading };

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
