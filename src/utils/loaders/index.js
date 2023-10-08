const spinner = ['/', '-', '\\', '|']; // Characters for animation
let currentIndex = 0; // Index to track the current character

/**
 * updateSpinner - Function to update and display the spinner
 * @param {string} text - prefix text
 * @returns {void}
 */
export const updateSpinner = (text = '') => {
  process.stdout.clearLine(); // Clear the previous line
  process.stdout.cursorTo(0); // Move the cursor to the beginning of the line
  const s1 = spinner[currentIndex];
  const s2 = spinner[(currentIndex + 1) % spinner.length];
  const s3 = spinner[(currentIndex + 2) % spinner.length];
  const s4 = spinner[(currentIndex + 3) % spinner.length];
  const spinners = `${s4}${s2}${s1}${s3}`
  process.stdout.write(`${spinners}\t${text}\t${spinners}`); // Write the current character
  currentIndex = (currentIndex + 1) % spinner.length; // Increment the index
}
