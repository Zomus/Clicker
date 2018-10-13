var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);

//Sends HTML file
app.get('/', function(req, res)
{
    res.sendFile(__dirname + "/index.html");
}
)

//Listens on port 2000
http.listen(2000, function()
{
    console.log("listening on 2000")
}
)

io.on('connection', function(socket)
{
    console.log("user connected");
    io.on('disconnect', function()
    {
        console.log('user disconnected');
    }
    );
}
);

io.on('connection', function(socket)
{
    socket.on('chatMessage', function(msg)
    {
        console.log('message: '+msg);
        io.emit('chatMessage', msg);
    }
    );
});