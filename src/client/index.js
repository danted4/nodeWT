import { SingleBar, Presets } from "cli-progress";
import WebTorrent from "webtorrent";
import { error, formatETA, formatSize, formatSpeed, getDisplayFormat, isValidMagnetURL, log } from "../utils/index.js";


export const startDownload = (magnetURI) => {

    //EARLY EXIT
    if (!isValidMagnetURL(magnetURI)) return error('\nInvalid magnet URL !\nPlease update the link in server.js file.');
    log('Initializing torrent client...\n')
    const client = new WebTorrent();

    // Add a torrent (replace with your magnet link)
    client.add(magnetURI, { path: './downloads' }, (torrent) => {
        log('Torrent is downloading...\n');

        const singleBar = new SingleBar({
            format: getDisplayFormat()
        }, Presets.shades_classic);


        singleBar.start(100, 0); // start progress

        torrent.on('download', () => {

            const { downloadSpeed, length, downloaded, progress } = torrent;

            // Calculate remaining bytes
            const remaining = length - downloaded;
            // Calculate ETA in seconds
            const eta = remaining / downloadSpeed;

            // formatted data
            const have = formatSize(downloaded);
            const fullSize = formatSize(length);
            const estimate = formatETA(eta);
            const speed = formatSpeed(downloadSpeed);

            // Update the progress bar with progress, ETA, and speed
            singleBar.update(progress * 100, {
                have,
                fullSize,
                estimate,
                speed
            });

            // Check if the download is complete
            (progress === 1) && log('\nTorrent download finished') && singleBar.stop();

        });

        torrent.on('done', () => log('\nDone!'));
        torrent.on('error', (err) => error(err));
    });
}