//Asynchronous
//console.log('Before');
//getUser(1, getRepositories);
//console.log('After');

// Callbacks
// Promises
// Async/await

/*
getUser(1)
    .then((user) => getRepositories(user.gitHubUsername))
    .then((repos) => getCommits(repos[0]))
    .then((commits) => console.log("Commits", commits))
    .catch((error) => console.log('Error', error.message));
*/

// Async and Await approach
async function displayCommits() { // async: this func is declared as async func
    try {
        const user = await getUser(1); // await: it waits till returning value
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (error) {
        console.log('Error', error.message);
    }

};
displayCommits();

/*
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
};

function getCommits(repos) {
    getCommits(repos, displayCommits);
};

function displayRepositories(repos) {
    console.log('Repos', repos);
};

function displayCommits(commits) {
    console.log(commits);
};
*/

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { //asynchronous function
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' }); // if the value is ready, callback send teh value
        }, 2000); // after 2000ms, the function is called
    });

};

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error("Couldn't get the repos."));
        }, 2000);
    });

};

function getCommits(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting Commits...');
            resolve(['commits1', 'commit2', 'commit3']);
        }, 2000);
    });

}