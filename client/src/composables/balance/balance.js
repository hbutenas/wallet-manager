export const getBalance = async () => {
    const URL = 'http://localhost:5555/api/v1/balance';

    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data.response;
};

export const updateBalance = async (amount, action) => {
    const URL = `http://localhost:5555/api/v1/balance/action?action=${action}`;

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
    });

    const data = await response.json();

    return data.response;
};

export const createBalance = async amount => {
    const URL = 'http://localhost:5555/api/v1/balance';

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ total_balance: amount })
    });

    const data = await response.json();

    return data.response;
};

export default { getBalance, updateBalance, createBalance };
