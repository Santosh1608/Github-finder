class Http {
  repos = [];
  async getData(url, callback) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      callback(null, data);
    } catch {
      callback("error occured", null);
    }
  }

  async getRepos(url, callback) {
    try {
      const res = await fetch(url);
      const repos = await res.json();
      repos.reverse();
      for (let i = 0; i < repos.length; i++) {
        if (i > 4) {
          break;
        }
        this.repos.push(repos[i]);
      }
      if (this.repos.length != 0) {
        callback(null, this.repos);
      } else {
        callback("no repos to show", null);
      }
    } catch {
      callback("error occured", null);
    }
  }
}
