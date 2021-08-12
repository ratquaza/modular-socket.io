const fs = require('fs');
const path = require('path');

const createEvents = function(eventDirectory) {
    let events = fs.readdirSync(eventDirectory).filter((f) => fs.lstatSync(path.join(eventDirectory, f)).isFile());
    let eventNames = events.map((e) => path.basename(path.join(eventDirectory, e), '.js'));
    let functions = events.map((e) => require(path.join(eventDirectory, e)));

    let func = function(socket) {
        for (let i = 0; i < events.length; i++) {
            if (typeof(eventNames[i]) !== "string" || typeof(functions[i]) !== "function") continue;
            socket.on(eventNames[i], (...args) => {
                functions[i](socket, ...args);
            })
        }
    };

    return func;
}

module.exports = createEvents;