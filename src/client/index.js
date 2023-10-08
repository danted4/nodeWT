import { SingleBar, Presets } from "cli-progress";
import WebTorrent from "webtorrent";

import { LOGGER , LOADERS, FORMATTERS, VALIDATORS } from '../utils/index.js';

const { log, error } = LOGGER;
const { updateSpinner } = LOADERS;
const { formatETA, formatSize, formatSpeed, getDisplayFormat } = FORMATTERS;
const { isValidMagnetURL } = VALIDATORS;

export const startDownload = (magnetURI) => {

    //EARLY EXIT
    if (!isValidMagnetURL(magnetURI)) return error('\nInvalid magnet URL !\nPlease update the link in server.js file.');
    log('\n');
    let memoryRef = setInterval(()=>updateSpinner('Initializing torrent client & verifying data'),50);
    const client = new WebTorrent();

    // Add a torrent (replace with your magnet link)
    client.add(magnetURI, { path: './downloads' }, (torrent) => {
        clearInterval(memoryRef);
        log('\n\nTorrent is downloading\n');

        const singleBar = new SingleBar({
            format: getDisplayFormat()
        }, Presets.shades_classic);


        singleBar.start(100, 0); // start progress

        torrent.on('download', () => {

            const { timeRemaining, downloadSpeed, length, downloaded, progress, numPeers } = torrent;

            // formatted data
            const have = formatSize(downloaded);
            const fullSize = formatSize(length);
            const estimate = formatETA(timeRemaining);
            const speed = formatSpeed(downloadSpeed);

            // Update the progress bar with progress, ETA, and speed
            singleBar.update(progress * 100, {
                have,
                fullSize,
                estimate,
                numPeers,
                speed
            });

            // Check if the download is complete
            (progress === 1) && log('\nTorrent download finished') && singleBar.stop();

        });

        torrent.on('done', () => log('\nDone!'));
        torrent.on('error', (err) => error(err));
    });
}
