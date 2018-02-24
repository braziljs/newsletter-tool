
(function () {
    let url = Github.urls.inCampaign
    if (UI.currentIssue) {
        url = Github.parseURL(Github.urls.issue, { issue: (UI.currentIssue.number || UI.currentIssue) })
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

