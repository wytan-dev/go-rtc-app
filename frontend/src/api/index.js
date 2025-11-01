var socket = new WebSocket('ws://localhost:8080/ws');

let connect = () => {
    console.log("Attempting connection to WebSocket...");

    socket.onopen = () => {
        console.log("Connected to WebSocket");
    }

    socket.onmessage = (msg) => {
        console.log("Message received from WebSocket:", msg.data);
    }

    socket.onclose = () => {
        console.log("WebSocket connection closed");
    }

    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    }

}

let sendMessage = (message) => {
    console.log("Sending message to WebSocket:", message);
    socket.send(message);
}

export { connect, sendMessage };