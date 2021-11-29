 import store from '@/store/index'
//美洽客服
  (function(m, ei, q, i, a, j, s) {
    m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments)
    };
    j = ei.createElement(q),
    s = ei.getElementsByTagName(q)[0];
    j.async = true;
    j.charset = 'UTF-8';
    j.src = 'https://static.meiqia.com/widget/loader.js';
    s.parentNode.insertBefore(j, s);
 })(window, document, 'script', '_MEIQIA');

   let phone=sessionStorage.getItem('phone') ? sessionStorage.getItem('phone') : '11111111111'
   let userName=sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : "未登录用户"

  _MEIQIA('metadata', {avatar: 'http://china.caderworld.com/favicon.ico'})//用户头像
  _MEIQIA('entId', '8ed40830cda2fb74621ec98f8e782f2d');//企业id
  _MEIQIA('metadata', {name:userName+' __ '+phone})//用户的名称和手机号
  _MEIQIA('withoutBtn');//隐藏默认按钮
  _MEIQIA('manualInit');//手动模式
  _MEIQIA('getUnreadMsg', readMessage); // 获取未读消息

 function readMessage(msg) {  //未读的消息数量传入vuex在首页显示
    var num=store.state.user.unread
    if(msg === 'hasBeenRead'){
        num = 0;
        store.commit('Unread',num)
    }else if (typeof (msg) === 'object'){
         num+=msg.length
      store.commit('Unread',num)
  }
}








