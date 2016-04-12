
var PORT = 9529;
var http = require('http');
var qs = require('qs');
var reply = require('./read_reply.js');
var TOKEN = 'sspku';

function checkSignature(params,token){
    //1.将token、timestamp、nonce三个参数进行字典序排序
    //2.将三个参数字符串拼接成一个字符串进行sha1加密
    //3.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信

    var key = [token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);

    return sha1.digest('hex') == params.signature;
}

var server = http.createServer(function(request,response){
    //解析URL中的query部分，用qs模块将query解析成json
    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);

    //console.log(params);
    //console.log("token-->",TOKEN);
    if(!checkSignature(params,TOKEN)){
        //如果签名不对，结束请求并返回
        response.end('signature fail');
        return;
    }
    if(request.method == "GET"){
        //如果请求是GET，返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{
        //否则是微信给开发者服务器的POST请求
        var postdata = "";
        request.addListener("data",function(postchunk){
            postdata += postchunk;
        });
        //获取到了POST数据
        request.addListener("end",function(){
            var parseString = require('xml2js').parseString;
            parseString(postdata,function(err,result){
                if(!err){
                    //将xml数据通过xml2js模块解析成json格式
                    // console.log(result);
                    var res = reply.replyText(result,'消息推送成功！');
                    // response.end('success');
                    response.end(res);
                }
            });
        });
    }
});

server.listen(PORT);
console.log("Server running at port: " + PORT + "." );
/**
 1、微信服务号接收到用户发过来的“文字”、“图片”、“语音”、“视频”、“小视频”、“位置”、“链接”类型的消息后，
    先将XML格式转换为JSON格式数据。
 2、根据用户发过来的信息类型，立刻返回一个预先定义好的相应类型的消息。
 3、参考https://github.com/akira-cn/wxdev程序，实现一个微信墙的应用。
 */