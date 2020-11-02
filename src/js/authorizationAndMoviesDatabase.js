const apiKey = 'AIzaSyDsxdJLhBCH8GPBoSvuEngfZHh8KKwvWF0';
let userMoviesToQueue = null;


export class Movies {
    static addAndDeleteToQueue(movies) {
        return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestqueue${userMoviesToQueue}.json`, {
            method: 'PUT',
            body: JSON.stringify(movies),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.json()).catch(error => console.log(error));
    }

    static addAndDeleteToWatched(moviesId) {
        return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestowatched${userMoviesToQueue}.json`, {
            method: 'PUT',
            body: JSON.stringify(moviesId),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.json()).catch(error => console.log(error));
    }

    static getAllToQueueMovies() {
        return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestqueue${userMoviesToQueue}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.json()).catch(error => console.log(error));
    }

    static getAllToWatchedMovies() {
        return fetch(`https://filmoteka-dcbc5.firebaseio.com/moviestowatched${userMoviesToQueue}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.json()).catch(error => console.log(error));
    }
}


class RegistrationAdnAuthorization {

    static registrationWithEmailAndPassword(email, password) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
        }
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, options).then(response => response.json()).then(data => console.log(data));
    }

    static authWithEmailAndPassword(email, password) {
        const options = {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }

        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, options).then(response => response.json()).then(data => {
            userMoviesToQueue = data.localId;
        });
    }
}


// RegistrationAdnAuthorization.registrationWithEmailAndPassword('yula@gmail.com', '123456');

RegistrationAdnAuthorization.authWithEmailAndPassword('yula@gmail.com', '123456');