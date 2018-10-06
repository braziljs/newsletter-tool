const style = "mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: #2BAADF;font-weight: normal;text-decoration: underline;"

const UI = {
    currentIssue: null,
    currentWeekly: null,
    main: document.getElementById('container'),
    HTML: {
        main: document.getElementById('html-container'),
        title: document.getElementById('TAG_title'),
        contributors: document.getElementById('TAG_CONTRIBUTORS'),
        news: document.getElementById('TAG_NEWS_LIST'),
        categories: document.getElementById('TAG_CATEGORIES'),
    },

    update (weekly, type = 'html') {
        if (typeof weekly === 'string' && UI.currentWeekly) {
            type = weekly
            weekly = UI.currentWeekly
        }
        UI.applyHeader(weekly, type)
        UI.HTML.news.innerHTML = '<strong>Tags:</strong> ' + UI.applyCategory(weekly, 'Notícias', type).join(' - ')
        //UI.applyCartoon(weekly, type)

        $(".comment-item").sortable({
			handle: ".drag-handler",
			placeholder: "placeholder"
        })
        $(".category-item").disableSelection();
        $(".delete-handler").click(event => {
            if (window.confirm('Are you sure you want to remove this item?')) {
                let target = event.target.parentNode
                target.parentNode.removeChild(target)
            }
        })
        new Clipboard('.copy-btn')
        UI.currentWeekly = weekly
    },
    applyHeader (weekly) {
        UI.HTML.title.innerHTML = `${weekly.title}`
        UI.HTML.contributors.innerHTML = `
            Um agradecimento especial aos
            <strong>${Object.keys(weekly.contributors).length}</strong>
            <a href="${urlGithub}/${weekly.number}"
            target="_blank" style=${style}>colaboradores</a> da edição nº
            <strong>${weekly.edition}</strong>!
            <br><br>
            ${
                Object.keys(weekly.contributors).map(key => {
                    let contrib = weekly.contributors[key]
                    return `
                        <a href="${contrib.url}" style=${style}>
                        <img 
                            alt="${contrib.login}" 
                            src="${contrib.avatar}"
                            title="${contrib.login}" 
                            width="40" 
                            style="border: 0;height: auto !important;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"
                        ></a>&nbsp;
                    `
                }).join(' ')
            }
        `
    },
    applyCategory (weekly, filterName, type) {
        let outputStr = ''

        const categoriesName = Object.keys(weekly.categories).sort()
        const notNews = categoriesName.filter( item => item !== filterName)
        const onlyNews = categoriesName.filter( item => item === filterName)

        onlyNews.forEach( item => {
            outputStr += UI.applyDesignCategory(weekly, item, type)
        })

        notNews.forEach( item => {
            outputStr += UI.applyDesignCategory(weekly, item, type)
        })
        
        UI.HTML.categories.innerHTML = outputStr
        return categoriesName
    },
    applyDesignCategory (weekly, cat, type) {
        let categoryHTML = `
            <table class="mcnBoxedTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
            
            <!--[if gte mso 9]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%">
            <![endif]-->

                <tbody class="mcnBoxedTextBlockOuter">
                    <tr>
                        <td class="mcnBoxedTextBlockInner" valign="top" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

                            <!--[if gte mso 9]>
                            <td align="center" valign="top" ">
                            <![endif]-->

                            <table style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnBoxedTextContentContainer" width="100%" align="left" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="padding-top: 9px;padding-left: 18px;padding-bottom: 9px;padding-right: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                            <table class="mcnTextContentContainer" style="min-width: 100% !important;background-color: #404040;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" cellspacing="0" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="mcnTextContent" style="padding: 18px;color: #F2F2F2;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;line-height: 150%;" valign="top">
                                                            ${cat}&nbsp;&nbsp;
                                                            <span class="copy-btn" data-clipboard-target="#${cat}">📋</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">

                            <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->

                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->

                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                    <tr>
                                        <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #202020;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;">
                                            <div id="${cat}" class="comment-item" style="margin: 0px 0px 2px;padding: 5px;position: relative;color: #000000;font-family: &quot;Times New Roman&quot;;font-size: medium;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: normal;orphans: 2;text-align: start;text-indent: 0px;text-transform: none;white-space: normal;widows: 2;word-spacing: 0px;-webkit-text-stroke-width: 0px;text-decoration-style: initial;text-decoration-color: initial;">
                                            ${
                                                weekly.categories[cat].map(item => {
                                                    return `
                                                        <div class="category-item" style="padding: 1rem 0;">
                                                        ${
                                                            type === 'html'
                                                                ? item.htmlBody
                                                                : type === 'md'
                                                                    ? item.mdBody
                                                                    : item.outline
                                                        }
                                                        ${
                                                            type !== 'outline'
                                                                ? `
                                                                <br>
                                                                <em>Indicado por&nbsp;
                                                                    <a 
                                                                        href="${item.author.url}" target="_blank"
                                                                        style="${style}">@${item.author.login}
                                                                    </a>
                                                                </em>`
                                                                : ''
                                                        }
                                                        <br>
                                                        </div>
                                                    `
                                                }).join('')
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
    return categoryHTML + listHTML
    },
    applyCartoon (weekly) {
    // if (!weekly.categories.cartoon) {
        
    // }
    }
}




