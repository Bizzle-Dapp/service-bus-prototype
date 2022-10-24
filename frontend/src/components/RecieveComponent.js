import React from "react";
import axios from 'axios';

const RecieveComponent = () => {

    const retrieveMessages = async (runType) => {
        try {
            const response = await axios.get(`http://localhost:3001/bus/${runType}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={{ display: 'flex', margin: "2rem", minWidth: "100vw", minHeight: "10vh",alignContent: "stretch",
        justifyContent: "space-evenly" }}>
            {/* RECIEVE THREAD */}
            <button onClick={() => { retrieveMessages("local-api") }} >Begin retrieval from Queue Process for local-api</button>
            <button onClick={() => { retrieveMessages("local-api2") }} >Begin retrieval from Queue Process for local-api2</button>
            <button onClick={() => { retrieveMessages("both") }} >Begin retrieval from Queue Process for both</button>
        </div>
    )
}

export default RecieveComponent;