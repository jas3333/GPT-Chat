const Conversation = ({ data, restoreConversation }) => {
    const content = data.conversation[0].botResponse.substr(0, 200);
    console.log(content);
    return (
        <div
            className='card pad-lg radius-md shadow mg-top-md pointer mg-left-md '
            onClick={() => restoreConversation(data._id)}
        >
            <h3 className='text-center mg-top-sm size-sm'>{data.title}</h3>
            <div className='underline-mid'></div>
            {data.category === 'tutorial' && <img src={require('./../images/tutorial.jpg')} alt='' />}
            {data.category === 'article' && <img src={require('./../images/article.jpg')} alt='' />}
            {data.category === 'story' && <img src={require('./../images/story.webp')} alt='' />}
            {data.category === 'question' && <img src={require('./../images/question.jpg')} alt='' />}
            {data.category === 'conversation' && <img src={require('./../images/conversation.jpg')} alt='' />}
            <h3>{`Category: ${data.category}`}</h3>
            <div className='underline-full mg-top-sm'></div>
            <p className='size-sm'>{`${content}...`}</p>
        </div>
    );
};

export default Conversation;
