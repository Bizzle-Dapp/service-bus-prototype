import React, { useState } from "react";

const SendComponent = () => {

    const DEFAULT_PACKET = {
        name: '',
        text: ''
    }

    const [messages, setMessages] = useState([])
    const [packet, setPacket] = useState(DEFAULT_PACKET);

    const addPacketToMessages = () => {
        if (packet.name.length < 1 || packet.text.length < 1) return;
        const a = [...messages, packet];
        setPacket(DEFAULT_PACKET);
        setMessages(a);
    }

    const handlePacketChange = (e) => {
        setPacket({
            ...packet,
            [e.target.id]: e.target.value
        });
    }

    const dispatchMessages = async () => {
        try{
            await fetch('http://localhost:3001/bus', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: messages })
            })
        } catch(e) {
            console.log(e)
        } finally {
            setMessages([]);
        }
    }

    return (
        <div style={{ display: 'flex', margin: "2rem", minWidth: "70vw", justifyContent: "space-between" }}>
            {/* SEND FORM */}
            <div style={{
                display: "flex",
                margin: "1rem",
                flexDirection: "column",
                alignContent: "space-around",
                alignItems: "center",
            }}>
                Some Form:
                <div>
                    <button onClick={() => addPacketToMessages()} >Add Packet</button>
                </div>
                <div style={{ padding: '0.5rem' }}>
                    {`(Fields needs content)`}<br />
                    <input id="name"
                        placeholder="Name"
                        onChange={handlePacketChange}
                        value={packet.name} />
                </div>
                <div style={{ padding: '0.5rem' }}>
                    {`(Fields needs content)`}<br />

                    <input id="text"
                        placeholder="Some other text"
                        onChange={handlePacketChange}
                        value={packet.text} />
                </div>
                
            </div>
            
            {/* Awaiting to be sent: */}
            <div style={{
                display: "flex",
                margin: "1rem",
                flexDirection: "column",
                alignContent: "space-around",
                alignItems: "center",
            }}>
                Awaiting Send:
                <div>
                    <button
                        onClick={() => { dispatchMessages() }} >Send to Azure!</button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "stretch",
                    padding: '0.5rem'
                }}>
                    {messages.map((m, i) => (
                        <div style={{
                            padding: "0.5rem",
                            border: "0.2rem white ridge",
                            color: "black",
                            backgroundColor: "ghostwhite"

                        }}
                            key={i}>
                            Name: {m.name} <br />
                            Text: {m.text}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default SendComponent;