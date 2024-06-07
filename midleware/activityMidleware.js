const HistoriqueActivite = require('../models/historiqueActivityModel');

const logRequest = async (req, res, next) => {
    const { method, url, body, user } = req;
    const utilisateur = user ? user.username : 'anonymous'; // Assuming req.user contains the authenticated user
    const action = method;
    const cible = url;
    const details = body;
    const source = 'web'; // Example source, you can adjust based on your context
  
    // Wrapping res.send to capture the response data
    const originalSend = res.send.bind(res);
    const originalJson = res.json.bind(res);
    
    const logResponse = async (result) => {
        const logEntry = new HistoriqueActivite({
            date: new Date(),
            utilisateur,
            action,
            cible,
            details: { request: details, response: result },
            source,
        });
    
        try {
            await logEntry.save();
            console.log('Request logged:', logEntry);
        } catch (error) {
            console.error('Error logging request:', error);
        }
    };

    // Intercept res.send
    res.send = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            logResponse(data);
        }
        return originalSend(data);
    };
    
    // Intercept res.json
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            logResponse(data);
        }
        return originalJson(data);
    };

    next();
};

module.exports = logRequest;