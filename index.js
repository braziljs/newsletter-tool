
(function () {
    let issueNumber;

    if(window.location.hash) {
        issueNumber = window.location.hash.substring(1).match(/\d+/)[0];
    }

    let url = Github.urls.inCampaign;

    if (issueNumber) {
        UI.currentIssue = issueNumber;
    }

    if (UI.currentIssue) {
        url = Github.parseURL(Github.urls.issue, { issue: (UI.currentIssue.number || UI.currentIssue) });
    }

    getJSON(url)
    .then(result => {
        if (Array.isArray(result)) {
            for (let edition of result) {
                if (Weekly.isValid(edition)) {
                    new Weekly(edition)
                    break
                }
            }
        } else {
            new Weekly(result)
        }
    })
})()
