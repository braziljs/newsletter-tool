const { apiUrl } = require('../constants');

class Weekly {
    constructor (data) {
        this.applyData(data)
        this.state = "partial"
        this.loadComments().then(UI.update)
        this.contributors = {}
        this.categories = {}
    }
    static isValid (data) {
        if (
            data.title.startsWith('Edição ') &&
            data.repository_url === apiUrl
        ) {
            if (data.labels.find(item => item.name === "campaign")) {
                return true
            }
        }
        return false
    }
    applyData (data) {
        this.id = data.id
        this.title = data.title
        this.number = data.number
        this.edition = this.title.match(' ([0-9]+) ')[1] || 0,
        this.created_at = data.created_at
        this.closed_at = data.closed_at
        this.state = data.state
    }
    filterData (data) {
        const { id, number, created_at, closed_at, title, state } = data
        return {
            id,
            number,
            edition: this.title.match(' ([0-9]+) ')[1] || 0,
            created_at,
            closed_at,
            title,
            state
        }
    }
    loadComments () {
        return new Promise((resolve, reject) => {
            if (this.comments) {
                return resolve(this.comments)
            }
            Github.get('comments', { issue: this.number })
            .then(comments => {
                comments.forEach(data => {
                    this.addComment(new Comment(data))
                })
                resolve(this)
            })
        })
    }
    addComment (comment) {
        this.contributors[comment.author.id] = comment.author
        this.categories[comment.category] = this.categories[comment.category] || []
        this.categories[comment.category].push(comment)
    }
}
