function getRequest() {  
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
function changeFile(type,size){
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