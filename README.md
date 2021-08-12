# modular-socket.io
The modular-socket.io package can be used to load events for a (socket.io)[https://socket.io] WebSocket from a given directory.

## Usage example:

```js
const io = require("socket.io");

const path = require("path");
const fs = require("fs");

const mod = require("modular-socket.io");
const publicEvents = mod(path.join(__dirname, "api", "events"));
const adminEvents = mod(path.join(__dirname, "api", "admin", "events"));

...

io.on("connect", (socket) => {
    publicEvents(socket);
    if (/* authorized */) {
        adminEvents(socket);
    }
});
```

## Documentation

`require("modular-socket.io")`

Returns the `createEvents` function

`createEvents(directory)`

Attempts to load all `.js` files within the given directory. 

Returns a function that sets the events up for passed in sockets using the files within the given directory.

Files must export a function by default, that can take as many arguments as you wish. The first argument will always
be the socket that emitted the event.  