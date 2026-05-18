const socket = io()

const messages =
    document.getElementById("messages")

socket.on("message", data => {

    messages.innerHTML += `
        <p>
            <strong>${data.user}:</strong>
            ${data.text}
        </p>
    `

})

function sendMessage() {

    const input =
        document.getElementById("chatInput")

    socket.emit(
        "message",
        input.value
    )

    input.value = ""

}