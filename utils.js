function getJSON (path, options) {
    return new Promise((resolve, reject) => {
        fetch(path, options)
        .then(result => {
            result.json()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
}

function getText (path, options) {
    return new Promise((resolve, reject) => {
        fetch(path, options)
        .then(result => {
            result.text()
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
}





