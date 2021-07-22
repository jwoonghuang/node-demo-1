var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个用户发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if(path === '/'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
            <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width">
                  <link rel="stylesheet" href="/x">
                  <title>网络一线牵，珍惜这段缘</title>
                </head>
                <body>
                <div class="heart">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="square"></div>
                </div>
                </body>
                </html>
        `)
        response.end()
    } else if(path === '/x'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`
            * {
              margin: 0;
              padding: 0;
            }
            .heart {
              position: relative;
              margin: 200px;
              display:inline-block;
              animation: RedHeart .3s infinite alternate;
              
            }
            @keyframes RedHeart{
              0%{
                transform: scale(1.0);
              }
              100%{
                transform: scale(1.5);
              }
            }
            .circle1 {
              width: 100px;
              height: 100px;
              background: red;
              position: absolute;
              bottom: 100px;
              right: 100px;
              transform: rotate(45deg) translateX(60px);
              border-radius: 50% 0 0 50%;
            }
            .circle2 {
              width: 100px;
              height: 100px;
              background: red;
              position: absolute;
              bottom: 100px;
              left: 100px;
              transform: rotate(45deg) translateY(60px);
              border-radius: 50% 50% 0 0;
            }
            .square {
              width: 100px;
              height: 100px;
              background: red;
              transform: rotate(45deg)
            }
            `)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用浏览器打开 http://localhost:' + port)

