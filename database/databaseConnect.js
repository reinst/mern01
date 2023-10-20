const mongoose = require('mongoose');
const dbts = require('../utils/dbTroubleshooting');

const maxRetries = 2;
let retries = 0;
const hostIP = '192.168.1.25';
const dbPort = 27017;


const run = async () => {
    try {
        await mongoose.connect(`mongodb://${hostIP}:${dbPort}/courseDB`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Error:", err.message);

        retries++;
        if (retries < maxRetries) {
            // Wait for 5 seconds before retrying
            setTimeout(() => {
                console.log(`Retrying... Attempt ${retries + 1}`);
                run();
            }, 1000);
        } else {
            console.log("Max retries reached. Checking connectivity...");

            const canPingDB = await dbts.pingDatabase(hostIP, dbPort); //uses a TCP socket with port
            const canPingHost = await dbts.pingHost(hostIP); // uses ICMP 
            
            if (canPingDB) {
                console.log("DB can be pinged but still unable to connect... Any authenitcation? Exiting...");
            } else if (canPingHost) {
                console.log("Host can be pinged, try restarting the DB. Exiting...");
            } else {
                console.log("The host can't be pinged. Check Firewall rules. Exiting...")
            }
        }
    }
};

module.exports = run;