

module.exports = (socket) => (message, callback) => {
  try {
    // Add to DB here
    socket.broadcast.emit('message:new', message);
    callback({
      status: 201,
      message: message
    });
  } catch (error) {
    console.log(error); //  Logger
    callback({
      status: 500,
      message: "Internal Server Error"
    });
  }
}
