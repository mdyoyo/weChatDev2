function replyText(msg, replyText){
  //if(msg.xml.MsgType[0] !== 'text'){
  //  return '';
  //}
  console.log(msg);

  //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
  var tmpl = require('tmpl');
  var replyTmpl = '<xml>' +
    '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
    '<CreateTime><![CDATA[{time}]]></CreateTime>' +
    '<MsgType><![CDATA[{type}]]></MsgType>' +
    '<Content><![CDATA[{content}]]></Content>' +
    '</xml>';

  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: 'text',
    time: Date.now(),
    content: replyText
  });
}

function replyImage(msg){
  if(msg.xml.MsgType[0] !== 'image'){
    return '';
  }
  console.log(msg);

  //将要返回的消息通过一个简单的tmpl模板（npm install tmpl）返回微信
  var tmpl = require('tmpl');
  var replyTmpl = '<xml>' +
      '<ToUserName><![CDATA[{toUser}]]></ToUserName>' +
      '<FromUserName><![CDATA[{fromUser}]]></FromUserName>' +
      '<CreateTime><![CDATA[{time}]]></CreateTime>' +
      '<MsgType><![CDATA[{type}]]></MsgType>' +
      '<MediaId><![CDATA[{media_id}]]></MediaId>' +
      '</xml>';

  return tmpl(replyTmpl, {
    toUser: msg.xml.FromUserName[0],
    fromUser: msg.xml.ToUserName[0],
    type: 'image',
    time: Date.now(),
    media_id: 'DJtimkqGw6lbaJzPIGiXGJl0NPbWSU31VoH2kSUe2RHY2_8R4Y4STChp6KW35u76'
  });
}

module.exports = {
  replyText: replyText,
  replyImage:replyImage
};