// Show error message
const handleError = (message) => {
    document.getElementById('error').textContent = message;
    document.getElementById('msg').classList.remove('hidden');
};

// Send post request of given url and data
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.redirect) {
        window.location = result.redirect;
    }

    if (result.error) {
        handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
};

// Hide error message
const hideError = () => {
    document.getElementById('msg').classList.add('hidden');
};

module.exports = {
    handleError,
    sendPost,
    hideError,
};