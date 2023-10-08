import { startDownload } from "./src/client/index.js";
import readline from 'readline';
import { LOGGER, VALIDATORS } from "./src/utils/index.js";


const r1 = readline.createInterface(({
    input: process.stdin,
    output: process.stdout
}))

/** prompt user for magnet url */

const promptUser = () => {
    r1.question('\nPlease paste your magnetURI:\n\n', (magnetURI) => {
        if(!VALIDATORS.isValidMagnetURL(magnetURI)) {
            LOGGER.error(`\nInvalid magnet URL ! Try again ...`);
            return promptUser();
        }
        startDownload(magnetURI);
        r1.close();
    });
}

promptUser();
