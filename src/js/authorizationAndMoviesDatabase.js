import { error, success } from './pnotify';
import { monitorButtonStatusText } from './filmDetailsPage';

const apiKey = 'AIzaSyDsxdJLhBCH8GPBoSvuEngfZHh8KKwvWF0';
let userMoviesToQueue = null;
let userAuth = false;


const addAndDeleteToQueue = (movies) => {
    if(!userMoviesToQueue) return;
    return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestoqueue${userMoviesToQueue}.json`, {
        method: 'PUT',
        body: JSON.stringify(movies),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json()).catch(error => console.log(error));
};


const addAndDeleteToWatched = (moviesId) => {
    if(!userMoviesToQueue) return;
    return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestowatched${userMoviesToQueue}.json`, {
        method: 'PUT',
        body: JSON.stringify(moviesId),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json()).catch(error => console.log(error));
};


const getAllToQueueMovies = () => {
    return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestoqueue${userMoviesToQueue}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json()).catch(error => console.log(error));
};


const getAllToWatchedMovies = () => {
    return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestowatched${userMoviesToQueue}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json()).catch(error => console.log(error));
};


const registrationWithEmailAndPassword = (email, password) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
    }

    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, options).then(response => response.json());
};


const authWithEmailAndPassword = (email, password) => {
    const options = {
        method: "POST",
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        }
    }

    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, options).then(response => {
        if (!response.ok) {
            throw('The username or password you entered is incorrect. Try again!')
        } 
        return response.json();
    }).catch( err => {
        new error({
            title: 'Error!!!',
            text: `${err}`,
            delay: 1500, 
        });
    });
};


const userRegistration = async (event, cb) => {
    event.preventDefault();
    const modalUserReg = document.querySelector('#modal-user-reg');
    const [ email, password, rePassword] = event.currentTarget.elements;

    if(password.value !== rePassword.value) {
        new error({
            title: 'Error!!!',
            text: 'Passwords are not the same! Try again!',
            delay: 1500, 
        });
    } else {
        try {
            await registrationWithEmailAndPassword(email.value, password.value).then(data => {
                if(data.error) {
                    const { error: {message } } = data;
                    throw (message);
                } else {
                    userMoviesToQueue = data.localId;
                    modalUserReg.classList.remove('is-open');
                    success({
                        title: 'Congratulations!',
                        text: 'You have successfully registered in the system!',
                    });
                }
                userAuth = true;
                monitorButtonStatusText(userAuth);
                cb && cb(userAuth);
            });
        } catch(err) {
            new error({
                title: 'Error!!!',
                text: `${err}`,
                delay: 1500, 
            });
        }
    }

    event.currentTarget.reset();
};


const userAuthorization = (event, cb) => {
    event.preventDefault();
    const modalUserReg = document.querySelector('#modal-user-reg');
    const [ email, password ] = event.currentTarget.elements;

    authWithEmailAndPassword(email.value, password.value).then(data => {
        if(!data) return;
        userMoviesToQueue = data.localId;
        modalUserReg.classList.remove('is-open');
        success({
            title: 'Congratulations!',
            text: 'You signed in successfully!',
        });
        userAuth = true;
        monitorButtonStatusText(userAuth);
        cb && cb(userAuth);
    });

    event.currentTarget.reset();
};


const logOut = (cb) => {
    userMoviesToQueue = null;
    userAuth = false;
    monitorButtonStatusText(userAuth);
    cb && cb(userAuth);
}


// const clearInput = (email, password, rePassword) => {
//     email.value = '';
//     password.value = '';
//     if (rePassword) rePassword.value = '';
// };


export { 
    addAndDeleteToQueue,
    addAndDeleteToWatched,
    getAllToQueueMovies,
    getAllToWatchedMovies,
    registrationWithEmailAndPassword,
    authWithEmailAndPassword,
    userRegistration,
    userAuthorization,
    logOut,
    userAuth
};