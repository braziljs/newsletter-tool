const UI = {
  currentIssue: null,
  currentWeekly: null,
  main: document.getElementById('container'),
  HTML: {
    main: document.getElementById('html-container'),
    title: document.getElementById('TAG_title'),
    contributors: document.getElementById('TAG_CONTRIBUTORS'),
    news: document.getElementById('TAG_NEWS_LIST'),
    categories: document.getElementById('TAG_CATEGORIES')
  },

  update(weekly, type = 'html') {
    if (typeof weekly === 'string' && UI.currentWeekly) {
      type = weekly
      weekly = UI.currentWeekly
    }
    UI.applyHeader(weekly, type)
    UI.HTML.news.innerHTML = '<strong>Tags:</strong> ' + UI.applyCategory(weekly, 'Notícias', type).join(' - ')
    //UI.applyCartoon(weekly, type)

    $('.comment-item').sortable({
      handle: '.drag-handler',
      placeholder: 'placeholder'
    })
    $('.category-item').disableSelection()
    $('.delete-handler').click(event => {
      if (window.confirm('Are you sure you want to remove this item?')) {
        let target = event.target.parentNode
        target.parentNode.removeChild(target)
      }
    })
    new Clipboard('.copy-btn')
    UI.currentWeekly = weekly
  },
  applyHeader(weekly) {
    UI.HTML.title.innerHTML = `${weekly.title}`
    UI.HTML.contributors.innerHTML = `
            Um agradecimento especial aos
            <strong>${Object.keys(weekly.contributors).length}</strong>
            <a href="${urlGithub}/${weekly.number}"
            target="_blank" style="ui_style">colaboradores</a> da edição nº
            <strong>${weekly.edition}</strong>!
            <br><br>
            ${Object.keys(weekly.contributors)
              .map(key => {
                let contrib = weekly.contributors[key]
                return `
                        <a href="${contrib.url}" style="ui_style">
                        <img 
                            alt="${contrib.login}" 
                            src="${contrib.avatar}"
                            title="${contrib.login}" 
                            width="40" 
                            class="contributors"></a>&nbsp;
                    `
              })
              .join(' ')}
        `
  },
  applyCategory(weekly, filterName, type) {
    let outputStr = ''

    const categoriesName = Object.keys(weekly.categories).sort()
    const notNews = categoriesName.filter(item => item !== filterName)
    const onlyNews = categoriesName.filter(item => item === filterName)

    onlyNews.forEach(item => {
      outputStr += UI.applyDesignCategory(weekly, item, type)
    })

    notNews.forEach(item => {
      outputStr += UI.applyDesignCategory(weekly, item, type)
    })

    UI.HTML.categories.innerHTML = outputStr
    return categoriesName
  },
  applyDesignCategory(weekly, cat, type) {
    let catsCollar = cat.split(' ').join('-')
    let categoryHTML = `
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
            
            <!--[if gte mso 9]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
            <![endif]-->

                <tbody>
                    <tr>
                        <td valign="top" class="style21">

                            <!--[if gte mso 9]>
                            <td align="center" valign="top" ">
                            <![endif]-->

                            <table width="100%" align="left" cellspacing="0" cellpadding="0" border="0" class="style24 style58">
                                <tbody>
                                    <tr>
                                        <td class="style25" valign="top">
                                            ${cat}&nbsp;&nbsp;
                                            <span class="copy-btn" data-clipboard-target="#${catsCollar}">📋</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!--[if gte mso 9]>
                            </td>
                            <![endif]-->

                            <!--[if gte mso 9]>
                            </tr>
                            </table>
                            <![endif]-->

                        </td>
                    </tr>
                </tbody>
            </table>
        `

    let listHTML = `
            <table width="100%">
                <tbody>
                    <tr>
                        <td valign="top">

                            <!--[if mso]>
                            <table align="left" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->

                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->

                            <table align="left" width="100%">
                                <tbody>
                                    <tr>
                                        <td valign="top" class="text_box">
                                            <div id="${catsCollar}" class="comment-item">
                                            ${
                                                weekly.categories[cat]
                                                .map(item => { return this.returnCategoryItem(type, item) })
                                                .join('')
                                            }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!--[if mso]>
                                </td>
                            <![endif]-->

                            <!--[if mso]>
                                </tr>
                                </table>
                            <![endif]-->

                        </td>
                    </tr>
                </tbody>
            </table>
        `
    return categoryHTML + listHTML;
  },
  applyCartoon(weekly) {
    // if (!weekly.categories.cartoon) {
    // }
  },
  returnCategoryItem(type, item) {
    var resultado = '<div class="category-item">';

    if(type === 'html')
        resultado += item.htmlBody;
    else if( type === 'md')
        resultado += item.mdBody;
    else
        resultado += item.outline;
    

    if(type !== 'outline')
        resultado += 
            `
            <br><em>Indicado por <a href="${item.author.url}" target="_blank" 
            style="ui_style">@${item.author.login}</a></em><br>
            `;

    return resultado += '</div>';
  }
}
