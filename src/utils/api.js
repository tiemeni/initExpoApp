const json = `application/json`;

/**
 * 
 * @param {*string} contentType 
 * @param {*string} method 
 * @param {*string} url 
 * @param {*} data 
 * @returns Promise
 */
const unAuthRequest = async (contentType, method, url, data) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': contentType
        },
        body: JSON.stringify(data)
    })
    if (response)
        return response.json();
    throw new Error("Api call failed");
};

export const postUnauthRequest = (url, data) => unAuthRequest(json, 'POST', url, data);
export const getUnauthRequest = (url) => unAuthRequest(json, 'GET', url);