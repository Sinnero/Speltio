// Constants
const USERS_KEY = 'speltio_users';
const LOGGED_IN_USER_KEY = 'speltio_loggedInUser';

// User Management Functions
function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setLoggedInUser(username) {
    localStorage.setItem(LOGGED_IN_USER_KEY, username);
}

function getLoggedInUser() {
    return localStorage.getItem(LOGGED_IN_USER_KEY);
}

function isUserLoggedIn() {
    // Check if the user is logged in by checking if the logged-in user key exists in localStorage
    // and if it is not null or undefined.
    return !!getLoggedInUser();
}

function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
}

// Form Handling
function handleRegistration(form) {
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;
    const termsAccepted = form.terms.checked;

    if (!username || !email || !password || !confirmPassword) {
        return { success: false, message: 'All fields must be filled in.' };
    }

    if (username.length > 20) {
        return { success: false, message: 'Your username is too long. Max 20 characters.' };
    }

    if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match.' };
    }

    if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    if (!termsAccepted) {
        return { success: false, message: 'You must accept the terms and conditions.' };
    }

    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim; // Regex for mail taken from https://regex101.com/library/SOgUIV
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email address. Example of format: test.test@mail.org' };
    }

    const users = getUsers();
    if (users.find(user => user.username === username)) {
        return { success: false, message: 'Username is already taken.' };
    }

    users.push({ username, email, password });
    saveUsers(users);
    return { success: true, message: 'Registration succeeded congrats!' };
}

function handleLogin(username, password) {
    if (!username || !password) {
        return { success: false, message: 'All fields must be filled in.' };
    }

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        setLoggedInUser(username);
        return { success: true, message: 'Login succeeded' };
    } else {
        return { success: false, message: 'Wrong username or password.' };
    }
}
