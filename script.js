/*const apiUrl = 'https://api.github.com';
let currentPage = 1;
let repositoriesPerPage = 10;
let totalRepositories = 0;
let userProfileLink = ''; // Variable to store GitHub user's profile link

function fetchRepositories() {
	
    
    const username = document.getElementById('username').value.trim();
    const searchQuery = document.getElementById('search').value.trim();
    const loader = document.getElementById('loader');
    const repositoriesContainer = document.getElementById('repositories');
    const paginationContainer = document.getElementById('pagination');
    const userAvatar = document.getElementById('user-avatar');
    const userBio = document.getElementById('user-bio');
    const userName = document.getElementById('user-name'); // New element for displaying GitHub user's name

    // Clear previous results
    repositoriesContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    loader.style.display = 'block';

    // Validate username
    if (!username) {
        loader.style.display = 'none';
        repositoriesContainer.innerHTML = '<p>Please enter a valid GitHub username.</p>';
        return;
    }

    // Fetch user information from GitHub API
    fetch(`${apiUrl}/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(userData => {
            // Store the GitHub user's profile link
            userProfileLink = userData.html_url;

            // Display user information
            userAvatar.src = userData.avatar_url;
            userBio.innerHTML = `<p>${userData.bio}</p><p>GitHub: <a href="${userProfileLink}" target="_blank">${userProfileLink}</a></p>`;

            // Display GitHub user's name
            userName.textContent = `GitHub User: ${userData.name || username}`;
            // Display additional user details
            document.getElementById('user-twitter').textContent = `Twitter: ${userData.twitter || 'Not available'}`;
            document.getElementById('user-email').textContent = `Email: ${userData.email || 'Not available'}`;
			console.log('User LinkedIn:', userData.blog); // "blog" field often used for personal website or LinkedIn
            document.getElementById('user-location').textContent = `Location: ${userData.location || 'Not available'}`;
            document.getElementById('user-followers').textContent = `Followers: ${userData.followers || 0}`;
            document.getElementById('user-following').textContent = `Following: ${userData.following || 0}`;
			const linkedInLink = userData.blog;
    const linkedInElement = document.getElementById('user-linkedin');

    if (linkedInLink) {
        linkedInElement.innerHTML = ` website: <a href="${linkedInLink}" target="_blank">${linkedInLink}</a>`;
    } else {
        linkedInElement.textContent = 'LinkedIn: Not available';
    }
            // Fetch repositories from GitHub API
            return fetch(`${apiUrl}/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`);
        })
        .then(response => {
            // Check if the response headers contain information about pagination
            const linkHeader = response.headers.get('link');
            if (linkHeader) {
                const match = linkHeader.match(/<([^>]+)>;\s*rel="last"/);
                if (match) {
                    const lastPageUrl = match[1];
                    totalRepositories = getLastPageNumber(lastPageUrl);
                }
            }
            return response.json();
        })
        .then(repositories => {
            loader.style.display = 'none';
            const filteredRepositories = filterRepositories(repositories, searchQuery);
            if (filteredRepositories.length === 0) {
                repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
            } else {
                displayRepositories(filteredRepositories);
                displayPagination();
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            repositoriesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}


function filterRepositories(repositories, searchQuery) {
    return repositories.filter(repository => repository.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

function getLastPageNumber(url) {
    const match = url.match(/&page=(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');

    repositories.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');

        // Display repository name and description
        repositoryElement.innerHTML = `<strong>${repository.name}</strong> - ${repository.description || 'No description available'}`;

        // Display languages used in the repository
        const languages = repository.language ? repository.language.split(',') : [];
        const languagesString = languages.length > 0 ? `Languages: ${languages.join(', ')}` :'Languages: Not specified';
        const languagesElement = document.createElement('p');
        languagesElement.innerHTML = languagesString;
        repositoryElement.appendChild(languagesElement);

        // Add event listener to open repository in a new page when clicked
        repositoryElement.addEventListener('click', () => {
            window.open(repository.html_url, '_blank');
        });

        repositoriesContainer.appendChild(repositoryElement);
    });
}

function displayPagination() {
    const paginationContainer = document.getElementById('pagination');

    // Calculate the total number of pages based on the total repositories and repositories per page
    const totalPages = Math.ceil(totalRepositories / repositoriesPerPage);

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            fetchRepositories();
        });
        paginationContainer.appendChild(button);
    }
}


// Add the following function to your existing script.js
function changeRepositoriesPerPage() {
    repositoriesPerPage = parseInt(document.getElementById('repositoriesPerPage').value, 10);
    currentPage = 1; // Reset to the first page when changing repositories per page
    fetchRepositories();
}*/
/*new const apiUrl = 'https://api.github.com';
let currentPage = 1;
let repositoriesPerPage = 10;
let totalRepositories = 0;
let userProfileLink = ''; // Variable to store GitHub user's profile link

function fetchRepositories() {
    const username = document.getElementById('username').value.trim();
    const searchQuery = document.getElementById('search').value.trim();
    const loader = document.getElementById('loader');
    const repositoriesContainer = document.getElementById('repositories');
    const userAvatar = document.getElementById('user-avatar');
    const userBio = document.getElementById('user-bio');
    const userName = document.getElementById('user-name'); // New element for displaying GitHub user's name

    // Clear previous results
    repositoriesContainer.innerHTML = '';
    loader.style.display = 'block';

    // Validate username
    if (!username) {
        loader.style.display = 'none';
        repositoriesContainer.innerHTML = '<p>Please enter a valid GitHub username.</p>';
        return;
    }

    // Fetch user information from GitHub API
    fetch(`${apiUrl}/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(userData => {
            // Store the GitHub user's profile link
            userProfileLink = userData.html_url;

            // Display user information
            userAvatar.src = userData.avatar_url;
            userBio.innerHTML = `<p>${userData.bio}</p><p>GitHub: <a href="${userProfileLink}" target="_blank">${userProfileLink}</a></p>`;

            // Display GitHub user's name
            userName.textContent = `GitHub User: ${userData.name || username}`;
            // Display additional user details
            document.getElementById('user-twitter').textContent = `Twitter: ${userData.twitter || 'Not available'}`;
            document.getElementById('user-email').textContent = `Email: ${userData.email || 'Not available'}`;
            console.log('User LinkedIn:', userData.blog);
            document.getElementById('user-location').textContent = `Location: ${userData.location || 'Not available'}`;
            document.getElementById('user-followers').textContent = `Followers: ${userData.followers || 0}`;
            document.getElementById('user-following').textContent = `Following: ${userData.following || 0}`;
            const linkedInLink = userData.blog;
            const linkedInElement = document.getElementById('user-linkedin');

            if (linkedInLink) {
                linkedInElement.innerHTML = ` website: <a href="${linkedInLink}" target="_blank">${linkedInLink}</a>`;
            } else {
                linkedInElement.textContent = 'website: Not available';
            }

            // Fetch repositories from GitHub API
            return fetch(`${apiUrl}/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`);
        })
        .then(response => {
            // Check if the response headers contain information about pagination
            const linkHeader = response.headers.get('link');
            if (linkHeader) {
                const match = linkHeader.match(/<([^>]+)>;\s*rel="last"/);
                if (match) {
                    const lastPageUrl = match[1];
                    totalRepositories = getLastPageNumber(lastPageUrl);
                }
            }
            return response.json();
        })
        .then(repositories => {
            loader.style.display = 'none';
            const filteredRepositories = filterRepositories(repositories, searchQuery);
            if (filteredRepositories.length === 0) {
                repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
            } else {
                displayRepositories(filteredRepositories);
                // No need to display pagination as there are no visible buttons
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            repositoriesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function filterRepositories(repositories, searchQuery) {
    return repositories.filter(repository => repository.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

function getLastPageNumber(url) {
    const match = url.match(/&page=(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');

    repositories.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');

        // Display repository name and description
        repositoryElement.innerHTML = `<strong>${repository.name}</strong> - ${repository.description || 'No description available'}`;

        // Display languages used in the repository
        const languages = repository.language ? repository.language.split(',') : [];
        const languagesString = languages.length > 0 ? `Languages: ${languages.join(', ')}` : 'Languages: Not specified';
        const languagesElement = document.createElement('p');
        languagesElement.innerHTML = languagesString;
        repositoryElement.appendChild(languagesElement);

        // Add event listener to open repository in a new page when clicked
        repositoryElement.addEventListener('click', () => {
            window.open(repository.html_url, '_blank');
        });

        repositoriesContainer.appendChild(repositoryElement);
    });
}


function changeRepositoriesPerPage() {
    repositoriesPerPage = parseInt(document.getElementById('repositoriesPerPage').value, 10);
    currentPage = 1; // Reset to the first page when changing repositories per page
    fetchRepositories();
}

// Example: Call changeRepositoriesPerPage function to set repositories per page to 20
// Uncomment the line below and replace '20' with the desired value
// changeRepositoriesPerPage(20);
*/
const apiUrl = 'https://api.github.com';
let currentPage = 1;
let repositoriesPerPage = 10;
let totalRepositories = 0;
let userProfileLink = ''; // Variable to store GitHub user's profile link

function fetchRepositories() {
    const username = document.getElementById('username').value.trim();
    const searchQuery = document.getElementById('search').value.trim();
    const loader = document.getElementById('loader');
    const repositoriesContainer = document.getElementById('repositories');
    const userAvatar = document.getElementById('user-avatar');
    const userBio = document.getElementById('user-bio');
    const userName = document.getElementById('user-name');
    const userTwitter = document.getElementById('user-twitter');
    const userEmail = document.getElementById('user-email');
    const userLocation = document.getElementById('user-location');
    const userFollowers = document.getElementById('user-followers');
    const userFollowing = document.getElementById('user-following');
    const userLinkedIn = document.getElementById('user-linkedin');

    // Clear previous results
    clearUserInfo();
    repositoriesContainer.innerHTML = '';
    loader.style.display = 'block';

    // Validate username
    if (!username) {
        loader.style.display = 'none';
        repositoriesContainer.innerHTML = '<p>Please enter a valid GitHub username.</p>';
        return;
    }

    // Fetch user information from GitHub API
    fetch(`${apiUrl}/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(userData => {
            // Store the GitHub user's profile link
            userProfileLink = userData.html_url;

            // Display user information
            userAvatar.src = userData.avatar_url;
            userBio.innerHTML = `<p>${userData.bio}</p><p>GitHub: <a href="${userProfileLink}" target="_blank">${userProfileLink}</a></p>`;

            // Display GitHub user's name
            userName.textContent = `GitHub User: ${userData.name || username}`;
            // Display additional user details
            userTwitter.textContent = `Twitter: ${userData.twitter || 'Not available'}`;
            userEmail.textContent = `Email: ${userData.email || 'Not available'}`;
            console.log('User LinkedIn:', userData.blog);
            userLocation.textContent = `Location: ${userData.location || 'Not available'}`;
            userFollowers.textContent = `Followers: ${userData.followers || 0}`;
            userFollowing.textContent = `Following: ${userData.following || 0}`;
            const linkedInLink = userData.blog;
            const linkedInElement = document.getElementById('user-linkedin');

            if (linkedInLink) {
                linkedInElement.innerHTML = ` website: <a href="${linkedInLink}" target="_blank">${linkedInLink}</a>`;
            } else {
                linkedInElement.textContent = 'website: Not available';
            }

            // Fetch repositories from GitHub API
            return fetch(`${apiUrl}/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`);
        })
        .then(response => {
            // Check if the response headers contain information about pagination
            const linkHeader = response.headers.get('link');
            if (linkHeader) {
                const match = linkHeader.match(/<([^>]+)>;\s*rel="last"/);
                if (match) {
                    const lastPageUrl = match[1];
                    totalRepositories = getLastPageNumber(lastPageUrl);
                }
            }
            return response.json();
        })
        .then(repositories => {
            loader.style.display = 'none';
            const filteredRepositories = filterRepositories(repositories, searchQuery);
            if (filteredRepositories.length === 0) {
                repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
            } else {
                displayRepositories(filteredRepositories);
                // No need to display pagination as there are no visible buttons
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            repositoriesContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function filterRepositories(repositories, searchQuery) {
    return repositories.filter(repository => repository.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

function getLastPageNumber(url) {
    const match = url.match(/&page=(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
}

function displayRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');

    repositories.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('repository');

        // Display repository name and description
        repositoryElement.innerHTML = `<strong>${repository.name}</strong> - ${repository.description || 'No description available'}`;

        // Display languages used in the repository
        const languages = repository.language ? repository.language.split(',') : [];
        const languagesString = languages.length > 0 ? `Languages: ${languages.join(', ')}` : 'Languages: Not specified';
        const languagesElement = document.createElement('p');
        languagesElement.innerHTML = languagesString;
        repositoryElement.appendChild(languagesElement);

        // Add event listener to open repository in a new page when clicked
        repositoryElement.addEventListener('click', () => {
            window.open(repository.html_url, '_blank');
        });

        repositoriesContainer.appendChild(repositoryElement);
    });
}

function clearUserInfo() {
    const userFields = [
        'user-avatar', 'user-bio', 'user-name', 'user-twitter', 'user-email',
        'user-location', 'user-followers', 'user-following', 'user-linkedin'
    ];

    userFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            if (element.tagName === 'IMG') {
                element.src = '';
            } else {
                element.textContent = '';
            }
        }
    });
}

function changeRepositoriesPerPage() {
    repositoriesPerPage = parseInt(document.getElementById('repositoriesPerPage').value, 10);
    currentPage = 1; // Reset to the first page when changing repositories per page
    fetchRepositories();
}

