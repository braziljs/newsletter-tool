
class Github {
    static get urls () {
        return {
            allWeeklyIssues: "https://api.github.com/repos/braziljs/weekly/issues?labels=campaign&state=all",
            inCampaign: "https://api.github.com/repos/braziljs/weekly/issues?labels=campaign",
            issue: "https://api.github.com/repos/braziljs/weekly/issues/:issue",
            comments: "https://api.github.com/repos/braziljs/weekly/issues/:issue/comments?per_page=99"
        }
    }

    static parseURL (path, options = {}) {
        const tokens = path.match(/:[^\/]+/g)

        tokens && tokens.forEach(token => {
            const key = token.substr(1)
            path = path.replace(token, options[key])
            delete options[key]
        });

        if (Object.keys(options).length) {
            path += '?' + querystring.stringify(options);
        }

        return path
    }
    
    static get (url, options = {}) {
        return new Promise((resolve, reject) => {
            url = this.parseURL(this.urls[url] || url, options)
            getJSON(url).then(resolve).catch(reject)
        })
    }
}
