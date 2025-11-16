/**
 * Business: Create order in getviewers.pro API
 * Args: event with httpMethod, body containing tariff_id, count_items, url_value
 * Returns: HTTP response with order details or error
 */

exports.handler = async (event, context) => {
    const { httpMethod, body } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            body: ''
        };
    }
    
    if (httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const apiKey = process.env.GETVIEWERS_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'API key not configured' })
        };
    }

    try {
        const orderData = JSON.parse(body || '{}');

        const response = await fetch('https://getviewers.pro/api/v1/tariffs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tariff_id: orderData.tariff_id,
                count_items: orderData.count_items,
                url_value: orderData.url_value,
                chatbots: orderData.chatbots || false,
                auto_start: orderData.auto_start || false,
                auto_renewal: orderData.auto_renewal || false,
                interval: orderData.interval || 5,
                float_viewers: orderData.float_viewers || false
            })
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    error: 'Order creation failed', 
                    details: result 
                })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                success: true,
                order: result
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
