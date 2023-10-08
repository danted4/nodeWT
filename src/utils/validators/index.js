/**
 * isValidMagnetURL - Function to validate a magnet URL
 * @param {string} magnetURI - magnet URI
 * @returns 
 */
export const isValidMagnetURL = (magnetURI) => {
    // A simple regex pattern to match a magnet URL
    const magnetPattern = /^magnet:\?xt=urn:[a-zA-Z0-9-]+:[a-zA-Z0-9]{32}/;
    return magnetPattern.test(magnetURI);
}
