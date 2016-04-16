/**
 * Created by chen on 16/4/16.
 */
var express = require('express');
var app = express();

app.get('/index',function(req,res){
    var options = {
        root:__dirname,
        headers:{
            'Upgrade':'websocket'
        }
    }
    res.sendFile('/index.html',options);
});
