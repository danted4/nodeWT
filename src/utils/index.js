
/**
 * export logger
 */
export const { log, error, info } = console;
export const getDisplayFormat = () => `Progress: [{bar}] {percentage}% | Downloaded: {have} / {fullSize} | ETA: {estimate} | Speed: {speed}`;


/**
 * formatETA - Function to format ETA in appropriate units (e.g., weeks, days, hours , minutes)
 * @param {number} seconds - estimated time in seconds
 * @returns 
 */
export const formatETA = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) {
        return 'N/A';
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4.345); // Approximate average days in a month
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} year${years === 1 ? '' : 's'}`;
    }
    if (months > 0) {
        return `${months} month${months === 1 ? '' : 's'}`;
    }
    if (weeks > 0) {
        return `${weeks} week${weeks === 1 ? '' : 's'}`;
    }
    if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'}`;
    }
    if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'}`;
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    }
    return 'less than a minute';
}


/**
 * formatSpeed - Function to format speed in appropriate units (e.g., KB/s, MB/s, GB/s)
 * @param {number} speed - speed in bytes/second
 * @returns 
 */
export const formatSpeed = (speed) => {
    if (speed < 1024) {
        return `${speed.toFixed(2)} B/s`;
    } else if (speed < 1024 * 1024) {
        return `${(speed / 1024).toFixed(2)} KB/s`;
    } else if (speed < 1024 * 1024 * 1024) {
        return `${(speed / (1024 * 1024)).toFixed(2)} MB/s`;
    } else {
        return `${(speed / (1024 * 1024 * 1024)).toFixed(2)} GB/s`;
    }
}

/**
 * formatSize - Function to format size in appropriate units (e.g., B, KB, MB, GB)
 * @param {number} size size in bytes
 * @returns 
 */
export const formatSize = (size) => {
    if (size < 1024) {
        return `${size.toFixed(2)} B`;
    } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
        return `${(size / (1024 * 1024 * 1024)).toFixed(3)} GB`;
    }
}


// Function to validate a magnet URL
export const isValidMagnetURL = (magnetURI) => {
    // A simple regex pattern to match a magnet URL
    const magnetPattern = /^magnet:\?xt=urn:[a-zA-Z0-9-]+:[a-zA-Z0-9]{32}/;
    return magnetPattern.test(magnetURI);
}
