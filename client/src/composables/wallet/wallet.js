export const getWallet = async () => {
    const URL = 'http://localhost:5555/api/v1/wallet';

    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data.response;
};

export const createWallet = async walletName => {
    const URL = 'http://localhost:5555/api/v1/wallet';

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wallet_name: walletName })
    });

    const data = await response.json();

    return data.response;
};

export const deleteWallet = async () => {
    const URL = 'http://localhost:5555/api/v1/wallet';

    const response = await fetch(URL, {
        method: 'DELETE',
        credentials: 'include'
    });

    const data = await response.json();

    return data.response;
};

export default { getWallet, createWallet, deleteWallet };
