const fs = require('fs');

function renderImages(req, res) {
    fs.readFile('./views/results.html', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            res.write('<h1>404 Not Found !');
            res.end();
            return;
        }

        let html = '';
        for (let img of req.images) {
            html += `<fieldset id => <legend>${img.imageTitle}:</legend> 
                                    <img src="${img.imageUrl}">
                                    </img><p>${img.description}<p/>
                                    <button onclick='location.href="/delete?id=${img._id}"'class='deleteBtn'>Delete
                                    </button> 
                                 </fieldset>`;
        }

        let output = data.toString().replace('<div class=\'replaceMe\'></div>', html);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(output);
        res.end();

    })
}

module.exports = {
    renderImages
}