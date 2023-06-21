const { config } = require('dotenv');
const express = require('express');
const app = express();

// Middleware function to validate API key
const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Assuming the API key is sent in the 'x-api-key' header

    // Validate the API key against the stored list of valid keys
    const isValidApiKey = await validateApiKeyFromStorage(apiKey);

    if (!isValidApiKey) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    next();
};
async function validateApiKeyFromStorage(apiKey) {
    const validApiKeys = [process.env.Api_key, 'api_key_2', 'api_key_3'];
    const isValidApiKey = validApiKeys.includes(apiKey);
    return isValidApiKey;
}
module.exports = validateApiKey;