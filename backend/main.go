package main

import (
	"fmt"
	"net/http"
	"log"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,

	CheckOrigin: func(r *http.Request) bool {return true},
}

func reader (conn *websocket.Conn) { 
	for {
		messageType, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println(string(msg))

		if err = conn.WriteMessage(messageType, msg); err != nil {
			log.Println(err)
			return
		}
	}
}

func serveWs (w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	ws , err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Backend")
	})

	http.HandleFunc("/ws", serveWs)
}


func main(){
	fmt.Println("Chat App v0.01")
	setupRoutes()
    fmt.Println("Starting server on :8080...")
	http.ListenAndServe(":8080", nil)
}