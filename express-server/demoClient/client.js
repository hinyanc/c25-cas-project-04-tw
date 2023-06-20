// let URL = "http://localhost:8080";

// let mySocketId = "";

// let socket = io(URL, { autoConnect: false });

// socket.connect();

// socket.on("connect", () => {
//   console.log("check my socket id", socket.id);
//   mySocketId = socket.id;
// });

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

// document.querySelector("#send").addEventListener("click", () => {
//   console.log("hi");
//   let userId = document.querySelector("#userId").value;
//   let message = document.querySelector("#message").value;
//   console.log("check", userId, message);
//   socket.emit("message", { data: message, to: userId, from: mySocketId });
// });

// socket.on("message", ({ data, from }) => {
//   console.log("received message", data, "from socket", from);
// });
