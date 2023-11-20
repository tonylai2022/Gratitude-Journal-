// Function to change and store font size
function changeAndStoreFontSize(delta) {
    const body = document.querySelector('body');
    const currentFontSize = window.getComputedStyle(body, null).getPropertyValue('font-size');
    const currentSize = parseFloat(currentFontSize);

    const newSize = currentSize + delta;
    body.style.fontSize = `${newSize}px`;

    // Store the font size in local storage for persistence
    localStorage.setItem('fontSize', newSize);
}

// Function to apply stored font size on page load
function applyStoredFontSize() {
    const storedSize = localStorage.getItem('fontSize');

    if (storedSize) {
        document.querySelectorAll('body, h1, h2, h3, h4, h5, h6, p, a').forEach(element => {
            element.style.fontSize = `${storedSize}px`;
        });
    }
}

// Function to increase font size
document.getElementById('increaseFontSize').addEventListener('click', function () {
    changeAndStoreFontSize(2); // Increase font size by 2px
    applyStoredFontSize(); // Apply the new font size immediately
});

// Function to decrease font size
document.getElementById('decreaseFontSize').addEventListener('click', function () {
    changeAndStoreFontSize(-2); // Decrease font size by 2px
    applyStoredFontSize(); // Apply the new font size immediately
});

// Call the function to apply stored font size when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    applyStoredFontSize();
});





let isBlackScheme = false; // Variable to track the current color scheme

// Function to apply the stored color scheme on page load
function applyStoredColorScheme() {
    const body = document.querySelector('body');
    const footer = document.querySelector('footer'); // Select the footer element
    console.log(footer); // This will log the footer element if it exists
    const storedScheme = localStorage.getItem('colorScheme');

    if (storedScheme === 'black') {
        // Apply black color scheme
        body.style.color = '#ffffff'; // White text color
        body.style.backgroundColor = '#000000'; // Black background color
        changeTextToWhiteOnBlack(); // Change text to white for better readability
        footer.style.color = '#ffffff'; // Change footer text color to white
        isBlackScheme = true;
    } else {
        // Apply white color scheme (default)
        body.style.color = ''; // Default text color
        body.style.backgroundColor = ''; // Default background color
        footer.style.color = '';  // Default footer text color
        isBlackScheme = false;
    }
}

// Function to change the color scheme
function toggleColorScheme() {
    const body = document.querySelector('body');
    const footer = document.querySelector('footer'); // Select the footer element

    if (!isBlackScheme) {
        // Change to black color scheme
        body.style.color = '#ffffff'; // White text color
        body.style.backgroundColor = '#000000'; // Black background color
        changeTextToWhiteOnBlack(); // Change text to white for better readability
        footer.style.color = '#ffffff'; // Change footer text color to white
        isBlackScheme = true;
        localStorage.setItem('colorScheme', 'black'); // Store color scheme preference
    } else {
        // Change to white color scheme
        body.style.color = ''; // Default text color
        body.style.backgroundColor = ''; // Default background color
        footer.style.color = ''; // Reset footer text color to default
        isBlackScheme = false;
        localStorage.setItem('colorScheme', 'white'); // Store color scheme preference
    }
}

// Event listener for the color scheme toggle button
document.getElementById('toggleColorScheme').addEventListener('click', function () {
    toggleColorScheme(); // Toggle the color scheme
});

// Function to change text to white when the background is black
function changeTextToWhiteOnBlack() {
    // Change text color to white for specific elements on a black background
    // (same as the previous function)
}

// Apply stored color scheme on page load
document.addEventListener('DOMContentLoaded', function () {
    applyStoredColorScheme();
});





