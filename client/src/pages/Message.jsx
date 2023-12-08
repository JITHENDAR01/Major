import React, { useEffect, useState } from 'react'
import Chat from '../components/Chat';
import { useSelector } from 'react-redux';
import Conversations from '../components/Conversations';

const Message = () => {
    const { currentUser } = useSelector(state => state.user)
    const [conversations, setConversation] = useState([])
    const [conversationLoading, setConversationLoading] = useState(true)

    const [trackConversation, setTrackConversation] = useState({
        sender: "",
        receiver: "",
        conversationActive: null,
    })








    // Load Current user Conversations
    useEffect(() => {
        (async () => {
            try {
                setConversationLoading(true)
                const res = await fetch(`/api/conversation/${currentUser._id}`)
                const getConversations = await res.json();
                if (getConversations.success === false) {
                    setConversationLoading(false)
                    console.log(getConversations.message);
                }
                else {
                    setConversationLoading(false)
                    setConversation(getConversations)
                }
            } catch (error) {
                setConversationLoading(false)
                console.log(error);
            }
        })()
    }, [])



    return (
        <>
            <section className="main_container">
                <div>
                    {
                        conversations.length === 0 ?
                            <div>

                                <p className='bg-white text-center text-sm sm:text-2xl mt-20 font-heading font-bold flex flex-col items-center justify-center max-w-3xl mx-auto py-10 text-black px-5 rounded shadow-md'>
                                    <span> Hey welcome! &#x1F604;</span>
                                    <span> This is a blank canvas waiting for your first conversation.</span>
                                </p>

                            </div>
                            :
                            <div className="chats_container custom_scrollbar grid grid-cols-12 ">

                                <div className="chat_people_container bg-white col-span-3  py-4 sm:py-5 flex sm:items-start items-center justify-start flex-col gap-2 overflow-y-scroll ">

                                    {
                                        conversationLoading
                                            ?
                                            <div className='w-full'>
                                                <p className='text-center mt-10 font-bold font-heading text-sm text-black'>Conversation Loading...</p>
                                            </div>
                                            :
                                            <>
                                                <h3 className='font-heading  px-2 mb-3 sm:px-3 text-sm sm:text-3xl text-black'>Chats...</h3>
                                                {
                                                    conversations.length !== 0 &&
                                                    conversations.map((conversation) =>
                                                        <Conversations
                                                            conversationInfo={
                                                                {
                                                                    conversation,
                                                                    trackConversation,
                                                                    setTrackConversation,
                                                                }
                                                            }
                                                            key={conversation._id}
                                                        />
                                                    )

                                                }
                                            </>
                                    }
                                </div>

                                {
                                    trackConversation.conversationActive
                                        ?
                                        <div className="conversation_container col-span-9 ">
                                            <Chat conversationInfo={{
                                                trackConversation,
                                                setTrackConversation,
                                                conversations,
                                                setConversation,
                                            }} />
                                        </div>
                                        :
                                        <div className="conversation_container col-span-9 ">

                                            <p className='mt-20 text-sm sm:text-2xl text-center font-heading '>No Conversation is Selected 	&#128580;</p>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </section>


        </>
    )
}

export default Message