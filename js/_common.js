getRequest = () => {  
  let urlObj = location.href.split('#'),url = urlObj && urlObj[1];
  let theRequest = new Object();  
  if (url&&url.indexOf("/") != -1) {  
      let str = url.substr(1);  
      strs = str.split("&");  
      for(let i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);  
      }  
  }
  return theRequest;  
}

 //文件上传
 /**
  * 
  * @param {*} type 类型
  * @param {*} size 尺寸 
  */
changeFile=(type,size)=>{
  $('.file-input').on('change',function(changeEvent){
      let _type = $(this).data('type'),file = this.files[0];
      // 对type和size做限制
      type = type || ['image/png','image/pdf','image/jpeg','image/jpg'];
      size = size || 4;
      if(type.indexOf(file.type) == -1)return alert('图片格式只能为JPG/JPEG/PNG/PDF');
      if(file.size>size*Math.pow(1024,2)) return alert(`图片大小不超过${size}M`);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
          $(".id-"+_type).attr("src", e.target.result);
      }
  })
}
// 一二代身份证正则

//验证一二代身份证
validateCertificate = (value) =>{
  const REGCERTIFICATEGE = /^[1-9]\d{5}\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
        REGCERTIFICATEBI= /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/;
  // let flag = REGCERTIFICATEGE.test(value) || REGCERTIFICATEBI.test(value)
  return REGCERTIFICATEGE.test(value) || REGCERTIFICATEBI.test(value)
}
matchCode = (val) =>{
    return new Promise((resolve,reject)=>{
      if(!val || !validateCertificate(val)){alert('请输入正确的身份证号');return false;reject()}resolve();
    })
}

countdown=(timer)=>{
  var temp = timer || 60;
  var interval;
  return {
      run: function (callback, cancelCallback) {
          var that = this;
          if (interval) return;
          callback(--timer);
          interval = setInterval(function () {
              callback(--timer);
              if (timer <= 0) {
                  timer = temp;
                  that.cancel(cancelCallback);
              }
          }, 1000);
          return this;
      },
      cancel: function (callback) {
          window.clearInterval(interval);
          interval = null;
          if (callback) callback();
      }
  }
};

matchPhone = (tel) =>{
  let errorMsg = '手机号码有误，请重新输入';
  return new Promise((resolve,reject)=>{
    if(Array.isArray(tel)){
      let flag = tel.some(item=>{
        return (!item || item.length != 11)
      })
      if(flag) {alert(errorMsg);return false;reject()}resolve();
    }
    else{
      if(!tel || tel.length != 11) {alert(errorMsg);return false;reject()}resolve();

    }
  })
}

getCode =(tel,conx)=>{
  const that = conx;
  matchPhone(tel).then((()=>{
    console.log('dddddd')
    let countdowns = countdown(60);
    countdowns.run(function(s) {
      that.text("重新获取" + s + "s").attr('disabled','disabled');
    }, function() {
      that.text("获取验证码").removeAttr('disabled');
    });
    return false;
  }))
}

