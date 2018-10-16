window.markdown = {
  toHTML(str) {
    str = markdown.applyLinks(str)
    str = markdown.applyBold(str)
    str = markdown.applyItalic(str)
    str = markdown.applyNewLines(str)
    return str
  },
  applyNewLines(str) {
    return str.trim().replace(/(\n\r?)|(\<br\/?\>)/g, '<br/>')
  },
  applyBold(str) {
    const boldRX = /[\*_][\*_](.+)[\*_][\*_]/
    while ((link = str.match(boldRX))) {
      str = str.replace(boldRX, '<strong>$1</strong>')
    }
    return str
  },
  applyItalic(str) {
    const italicRX = /[\*_](.+)[\*_]/
    while ((link = str.match(italicRX))) {
      str = str.replace(italicRX, '<em>$1</em>')
    }
    return str
  },
  applyLinks(str) {
    const linkRX = /\[([^\]]+)\]\(([^\)]+)\)/
    while ((link = str.match(linkRX))) {
      str = str.replace(linkRX, '<a href="$2"target="_blank">$1</a>')
    }
    return str
  }
}
