import { useEffect, useState } from "react"
import { databases, client } from '../lib/appwrite'
import { DATABASE_ID, COLLECTION_ID } from "../appwrite/conf"
import { ID, Query } from "appwrite"
import { Trash2 } from "react-feather"

export default function Room() {
    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        getMessage()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.tables.${COLLECTION_ID}.rows`, response => {
            if(response.events.includes("databases.*.tables.*.rows.*.create")){
                setMessages(prev => [response.payload, ...prev])
            }

            if(response.events.includes("databases.*.tables.*.rows.*.delete")){
                setMessages(prev => prev.filter(message => message.$id !== response.payload.$id))
            }
        });

        return () => {
            unsubscribe()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload = {
            body: messageBody
        }

        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            payload
        )

        setMessageBody('')
    }

    const getMessage = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(10)
            ]
        )
        setMessages(response.documents)
    }

    const deleteMessage = async (message_id) => await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, message_id)

    const allMessages = messages.map(message => (
        <div key={message.$id} className="message--wrapper">
            <div className="message--header">
                <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                <Trash2
                    onClick={() => deleteMessage(message.$id)}
                    className="delete--btn"
                />
            </div>
            <div className="message--body">
                <span>{message.body}</span>
            </div>
        </div>
    ))

    return (
        <main className="container">
            <div className="room--container">
                <form
                    onSubmit={handleSubmit}
                    id="message-form"
                >
                    <div>
                        <textarea
                            required
                            maxLength="1000"
                            placeholder="Say Something"
                            onChange={(e) => setMessageBody(e.currentTarget.value)}
                            value={messageBody}
                        >
                        </textarea>
                    </div>
                    <div className="send-btn--wrapper">
                        <input type="submit" value="Send" className="btn btn--secondary" />
                    </div>
                </form>

                <div>
                    {allMessages}
                </div>
            </div>
        </main>
    )
}
