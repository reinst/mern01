const net = require('net');
const { exec } = require('child_process');


const pingDatabase = (host, port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(3000);  // 3 seconds timeout

        socket.once('connect', () => {
            resolve(true);
            socket.destroy();
        });

        socket.once('timeout', () => {
            resolve(false);
            socket.destroy();
        });

        socket.once('error', () => {
            resolve(false);
        });

        socket.connect(port, host);
    });
};


const pingHost = (host) => {
    return new Promise((resolve, reject) => {
        exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
            if (error) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
};


module.exports = { pingHost, pingDatabase };