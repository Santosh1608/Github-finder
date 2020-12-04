const UIinput = document.querySelector("input");
const UIimage = document.querySelector("img");
const UIrepos = document.querySelector(".repos");
const UIgists = document.querySelector(".gists");
const UIfollowers = document.querySelector(".followers");
const UIfollowing = document.querySelector(".following");
const UIcompanyName = document.querySelector(".company-name");
const UIwebsite = document.querySelector(".website");
const UIlocation = document.querySelector(".location");
const UIdate = document.querySelector(".date");
const UIrepoName = document.querySelector(".repoName");
const UIstars = document.querySelector(".stars");
const UIwatchers = document.querySelector(".watchers");
const UIforks = document.querySelector(".forks");
const repos = document.querySelector("#repos");
const section = document.querySelector("section");
const nav = document.querySelector("nav");
// -----------------------------------------------
let image,
  reposNum,
  gists,
  followers,
  following,
  companyName,
  website,
  loc,
  date,
  stars,
  watchers,
  forks;
section.style.display = "none";
// ADD EVENT LISTENERS----------
UIinput.addEventListener("keyup", (e) => {
  if (e.target.value.trim() !== "") {
    const http = new Http();
    http.getData(
      `https://api.github.com/users/${e.target.value}`,
      (err, data) => {
        if (data && data.message !== "Not Found") {
          console.log(data);
          UIimage.src = data.avatar_url;
          UIcompanyName.textContent = data.company;
          UIdate.textContent = data.created_at;
          UIfollowers.textContent = data.followers;
          UIfollowing.textContent = data.following;
          UIlocation.textContent = data.location;
          UIrepos.textContent = data.public_repos;
          UIgists.textContent = data.public_gists;
          UIwebsite.textContent = data.html_url;
          http.getRepos(data.repos_url, (err, data) => {
            if (data) {
              if (repos.hasChildNodes()) {
                const arr = Array.from(repos.children);
                arr.forEach((node) => {
                  node.remove();
                });
              }
              data.forEach((repo) => {
                createRepo(
                  repo.name,
                  repo.watchers_count,
                  repo.forks_count,
                  repo.stargazers_count
                );
              });
              section.style.display = "block";
            }
          });
        } else {
          console.log(err);
          showTop("NO USER WITH THAT NAME", "red");
        }
      }
    );
  } else {
    section.style.display = "none";
  }
});

function createRepo(repoName, watchers, forks, stars) {
  const repo = document.createElement("div");
  repo.className = "repo";
  repo.innerHTML = `
  <div class="leftpart">
    <span class="repoName">${repoName}</span>
  </div>
  <div class="rightpart">
    <button class="bg-primary btn">Stars<span class="stars">${stars}</span></button>
    <button class="bg-secondary btn">Watchers<span class="watchers">${watchers}</span></button>
    <button class="bg-last btn">Forks<span>${forks}</span class="forks"></button>
  </div>`;
  repos.appendChild(repo);
}

function showTop(msg, color) {
  const first = document.body.firstElementChild;
  if (first.nodeName === "NAV") {
    const h3 = document.createElement("h3");
    const text = document.createTextNode(msg);
    h3.appendChild(text);
    h3.style.color = color;
    h3.style.textAlign = "center";
    document.body.insertBefore(h3, nav);
    setTimeout(() => {
      h3.remove();
    }, 2000);
  }
}
