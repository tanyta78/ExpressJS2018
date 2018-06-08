const fs = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const shortid = require('shortid');
const db = require('../config/dataBase');

const memeDir = './public/memeStorage/new/';

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/viewAll.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let content = '';
            let memes = db.getDb()
                .filter(m => m.privacy === 'off')
                .sort((a, b) => b.dateStamp - a.dateStamp);

            for (const meme of memes) {
                content += `
                <div class="meme">
                    <a href="/getDetails?id=${meme.id}">
                    <img class="memePoster" src="${meme.memeSrc}"/>
                </div>`
            }

            let html = data.toString().replace('{{replaceMe}}', content);

            res.write(html);
            res.end();

        });
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/addMeme.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        let meme = {};

        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err);
                return;
            }

            let file = files.meme;
            let tempPath = file.path;
            let fileExtension = file.name.split('.').pop();
            let fileName = shortid.generate() + ('.') + fileExtension;

            fs.rename(tempPath, memeDir + fileName, err => {
                if (err) {
                    console.log(err);
                    return;
                }

                meme.id = shortid.generate();
                meme.title = fields.memeTitle;
                meme.memeSrc = memeDir + fileName;
                meme.description = fields.memeDescription;
                meme.privacy = fields.status ? 'off' : 'on';
                meme.dateStamp = Date.now();

                db.add(meme);
                db.save().then(() => {
                    res.writeHead(302, {
                        Location: '/viewAllMemes'
                    });

                    res.end();
                });
            });
        });

    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/details.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let id = qs.parse(url.parse(req.url).query).id;
            let targetedMeme = db.getDb().filter(m => m.id === id)[0];

            let content =
                `<div class="content">
                    <img src="${targetedMeme.memeSrc}" alt=""/>
                    <h3>Title  ${targetedMeme.title}</h3>
                    <p> ${targetedMeme.description}</p>
                    <button><a href="${targetedMeme.memeSrc}" download>Download Meme</a></button>
                </div>`;

            let html = data.toString().replace('{{replaceMe}}', content);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
}