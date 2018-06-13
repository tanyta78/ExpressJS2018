module.exports = {
    viewAll: (id, url) => `
    <div class="meme">
        <a href="/memes/getDetails?id=${id}">
            <img class="memePoster" src="${url}" />
        </a>
    </div>`,
    genereOption: (id, title) => 
        `<option value="${id}">${title}</option>`,
    details: (url, title, description) => `
    <div class="content">
        <img src="${url}" alt="${title}" />
        <h3>Title ${title}</h3>
        <p>${description}</p>
        <button>
            <a href="${url}" download="${title}.jpg" >Download Meme</a>
        </button>
    </div>`,
    detailsLink: (id, url) => `
    <div class="meme">
        <a href="/getDetails?id=${id}" >
        <img class="memePoster" src="${url}"/>
    </div>`
};