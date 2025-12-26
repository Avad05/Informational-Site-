const http = require('http');
const fs = require('fs');
const url = require('url')
const path = require('path')

const myServer = http.createServer((request, response) =>{
    const now = new Date();
    const log = `${now}, "${request.url}" requested the page\n`;
    fs.appendFile('log.txt', log, (err, data) =>{
        if(err) console.log(err);
         let pathName = '';

        switch(request.url){
            case'/':
            pathName = 'index.html';
            break;

            case'/about':
            pathName = 'about.html';
            break;

            case '/contact':
                pathName = 'contact-me.html';
                break;

            default:
                pathName = '404.html';
                response.statusCode = 404;
         
        }

        fs.readFile(path.join(__dirname, pathName), (err, content)=>{
            response.writeHead(response.statusCode || 200, {"Content-Type":"text/html"});
            response.end(content);
        })
    })

})

myServer.listen(8000, () => {console.log('Server Started')})