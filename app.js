const fs = require('fs');
const http = require('http')

///get the todo list
function getToDos(){
    ///get the todos json file
    const todosText = fs.readFileSync('./assets/db.json',{encoding:'utf-8'})
    var obj = JSON.parse(todosText);
    var ToDos = obj.ToDos;
    
    ///get only titles of todos
    function getTitle(todo) {
        return `<h2>${todo.title}</h2>`;
    }
    ToDos = ToDos.map(getTitle)

    var html1 = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ToDos</title>
                    <link rel="stylesheet" href="/stylesheet">
                </head>
                <body>
                        <h1>ToDos</h1>
                        ${ToDos.join('')}
                        <a href="/imgs" class="nature">Nature</a>
                        <a href="/quotes" class="quotes">Quotes</a>
                </body>
                </html>`

    fs.writeFileSync('./views/index.html',html1);
}



//--------------
///get the imgs
function getImgs(){

    var imgsHtml = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Images</title>
                        <link rel="stylesheet" href="/stylesheet">
                    </head>
                    <body>
                            <h3><a href="/" class="breadcrumbs">Home</a> > <a href="#" class="breadcrumbs">Images</a></h3>
                            <img src="/nature.jpg" alt="">
                            <img src="/car.jpg" alt="">
                    </body>
                    </html>`

    fs.writeFileSync('./views/imgs.html',imgsHtml);
}

//--------
///get the quotes
function getQoutes(){
    const quotesText = fs.readFileSync('./assets/qts.txt',{encoding:'utf-8'})
    ///get only titles of todos
    function getQuote(q) {
        return `<p>${q}</p>`;
    }
    let quotes = quotesText.split('\n')
    quotes = quotes.map(getQuote)
const qoutesHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quotes</title>
        <link rel="stylesheet" href="/stylesheet">
    </head>
    <body>
            <h3><a href="/" class="breadcrumbs">Home</a> > <a href="#" class="breadcrumbs">Quotes</a></h3>
            ${quotes.join('')}    
    </body>
    </html>`

fs.writeFileSync('./views/quotes.html',qoutesHtml);
}




//this callback fn fired when requests fired
const server = http.createServer((req,res)=>{

    res.setHeader('Content-Type', 'text/html');
    let path = './views/'

    switch(req.url){
        ////main routes
        case '/':
            getToDos();
            path +='index.html';
            res.statusCode = 200;
            break;
        case '/imgs':
            getImgs();
            res.statusCode = 200;
            path += 'imgs.html'
            break;
        case '/quotes':
            getQoutes();
            res.statusCode = 200;
            path +='quotes.html';
            break;
        ///assets routes 
        case '/nature.jpg':
            res.setHeader('Content-Type', 'image/jpg');
            res.statusCode = 200;
            path = './assets/1.jpg'
            break;
        case '/car.jpg':
            res.setHeader('Content-Type', 'image/jpg');
            res.statusCode = 200;
            path = './assets/2.jpg'
            break;
        case '/stylesheet':
            res.setHeader('Content-Type', 'text/css');
            res.statusCode = 200;
            path = './assets/style.css';
            break;
        ///routes for not found urls
        default:
            res.statusCode = 404;
            path +='404.html';
    }
    fs.readFile(path,(err,data)=>{
        if(err)
            console.log(err)
        else
            res.write(data);
            
        res.end();
    })

})


server.listen(3000,'localhost',()=>{
    console.log("listening for req on port 3000")
})