const username = 'zayyanese';
const maxPages = 3;
const hideForks = true;


// get list of user's public repos
const getRepos = async () => {
    let repos = [];
    let res;
    for (let i = 1; i <= maxPages; i++) {
        res = await fetch(
            `https://api.github.com/users/${username}/repos?&sort=pushed&per_page=100&page=${i}`
            // {
            //     headers: {
            //         Accept: 'application/vnd.github+json',
            //         Authorization:
            //             'token your-personal-access-token-here'
            //     }
            // }
        );
        let data = await res.json();
        repos = repos.concat(data);
    }
    repos.sort((a, b) => b.forks_count - a.forks_count);
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    

    displayRepos(repos);
};
getRepos();

// display list of all user's public repos
const displayRepos = (repos) => {
    const userHome = `https://github.com/${username}`;
   // filterInput.classList.remove('hide');
    for (const repo of repos) {
        if (repo.fork && hideForks) {
            continue;
        }

        const langUrl = `${userHome}?tab=repositories&q=&language=${repo.language}`;
        const starsUrl = `${userHome}/${repo.name}/stargazers`;
        const forksUrl = `${userHome}/${repo.name}/network/members`;
        const repoUrl = `${userHome}/${repo.name}`;

        let listItem = document.createElement('li');
        listItem.classList.add('repo');
        listItem.innerHTML = `
            <h3 style="text-decoration: bold; color: white;">${repo.name}</h3>
            <a target=_blank href="${repoUrl}">
            <span style="color: white; text-decoration: underline white;">> check it out on github</span><a>&nbsp&nbsp</a><i style="color:white;" class="fa-brands fa-github"></i></a>`;

        if (repo.stargazers_count > 0) {
            listItem.innerHTML += `<a href="${starsUrl}">
            <span>⭐ ${repo.stargazers_count}</span></a>`;
        }

        if (repo.forks_count > 0) {
            listItem.innerHTML += `<a href="${starsUrl}">
            <span>${devicons['Git']} ${repo.forks_count}</span></a>`;
        }

        console.log(listItem);
        
        var repoList = document.querySelector('.repo-list');


        repoList.append(listItem);
    }
};