import store from '../../store';
export const loginValidation = async (username, password) => {
    // empty field
    if (!username || !password) {
        return console.log('False 1');
    }

    // spaces only
    if (username.trim() === '' || password.trim() === '') {
        return console.log('False 2');
    }

    const URL = 'http://localhost:5555/api/v1/auth/login';

    const requestBody = {
        username,
        password
    };

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (data.message) return false;

    // create a state

    return true;
};

export default { loginValidation };
