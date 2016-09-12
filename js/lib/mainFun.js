/**
 ****** mainFun()公共功能构造 ******
 @ 基于jquery
 @ 里面为网站公共功能函数
 @ 函数名称遵循驼峰命名规则，ex:goToUp()
 @ author: 277040350@qq.com
 @ 创建时间2016-5-10
 */
var $ = require('jquery');
var mainFun = function(){
	'use strict';  //符合ECMAScript 5标准
	this.versions = "1.1.0";  //版本号
	this.loading = $('<div class="loading-gif"></div>');  //loading标签
	this.loading_cell = $('<div class="loading-type swiper-slide" id="loading-type"><i class="loading-small"></i>正在努力加载</div>');
	/**
	 @ 通用关闭按钮
	 @ 标签上需要添加2个属性<div class="close" data-dome="dome1" data-black="dome2"></div>
	 @ param: data-dome属性 -- 要关闭的标签class名或者id名
	 @ param: data-black属性 -- 是否有遮罩层，如果有隐藏掉
	 @ return: null
	 */
	$("body .close,body #close").on('click', function(event) {
		'use strict';  //符合ECMAScript 5标准
		var dome = $(this).data('dome'),
			black = $(this).data('black');
		black && $('.'+black).fadeOut();
	 		$('.'+dome) && $('.'+dome).remove();
	 		$('#'+dome) && $('#'+dome).remove();
	}); //通用关闭按钮结束
};

mainFun.prototype = {
	/**
	 @ getUrlParam:获取url所带参数
	 @ param: null
	 @ return: obj(array类型) -- 返回url参数值 
	 */
	getUrlParam : function(){
		'use strict';  //符合ECMAScript 5标准
		var src = location.href,
	        data = src.substr(src.indexOf("?")+1,src.length-1),
	        obj = {};
	    $(data.split("&")).each(function(index, el) {
	        var a = el.split("=");
	        obj[a[0]] = a[1];
	    });
	    return obj;
	},
	ajax : function(param){   //ajax方法
		'use strict';  //符合ECMAScript 5标准
		$.ajax({
			url: param.url,
			type: param.type,
			dataType: 'json',
			data: param.data,
			success : param.success,
			error : param.error
		});
	},
	getJSON : function(param){   //跨域方法
		'use strict';  //符合ECMAScript 5标准
		$.getJSON(param.url,
            	  param.data,
                  param.success
        );
	},
	loadingStart : function(){
		$("body").append(this.loading);
	},
	loadingEnd : function(){
		$("body").remove(this.loading);
	},
	/**
	 @ timeFormat:时间戳转换为yyyy-mm-dd hh:ss格式
	 @ param: time(number类型) -- 需要转换的时间戳
	 @ return: time(string类型) -- 新的时间格式
	 */
	timeFormat : function(time){   //时间戳转换为yy-mm-dd hh:ss格式
		'use strict';  //符合ECMAScript 5标准
		var formattedDate = new Date(parseInt(time)),
            y = formattedDate.getFullYear(),
            m =  formattedDate.getMonth() + 1,
            d = formattedDate.getDate(),
            h = formattedDate.getHours(),
            s = formattedDate.getMinutes();
        m = m < 10 ? "0"+m : m;
        d = d < 10 ? "0"+d : d;
        s = s < 10 ? "0"+s : s;
      	var time = y+"-"+m+"-"+d +" "+h+":"+s;
        return time;
	},
	getTranslateY : function(node){   //获取translateY值，返回int数值
		'use strict';  //符合ECMAScript 5标准
        var regRule = /translate(Y|\dd)?\(\s*(\w+\s*,)?\s*([^,]+)(\s*,[^)]+)?\s*\)/;
        var regRule2 = /matrix\(.*,\s*(\w+)\s*\)/;
        var transform = node.style.transform;
        var reg;
        if(!transform){
            return null;
        }
        reg = regRule.exec(transform);
        if(null === reg){
            reg = regRule2.exec(transform);
            return reg ? reg[1] : null;
        }
        return reg[3].replace("px","")*1;
    },
    /**
	 @ formValidation:表单验证函数
	 @ param: dome(string) -- 标签元素(id/class)
	 @ return: booleans
	 */
    formValidation : function(dome){
    	'use strict';  //符合ECMAScript 5标准
	    var $this = this;
	    var dome = dome || this.msg("未找到dom元素"),
	        action = true;
	    $(dome+" input").each(function(index, el) {
	        var req = $(this).attr("data-required"),
	            text_req = $(this).attr("text-required"),
	            reg = RegExp($(this).attr("data-pattern")),
	            text_reg = $(this).attr("text-pattern"),
	            val = $(this).val();
	            if (action && req && text_req && (val == null || val == '')){
	                $this.msg(text_req);
	                action = false;
	                return false;
	            }else if(action && reg && text_reg && (val != null || val != '') && !reg.test(val)){ 
	                $this.msg(text_reg);
	                action = false;
	                return false;
	            }
	    });
	    return action;
	},
	/**
	 @ timeDown:倒计时函数(参数为object)
	 @ objectParam: dome(string类型) -- 标签元素(id/class)
	 @ objectParam: time(number类型) -- 倒计时秒数
	 @ objectParam: callback(function类型) -- 倒计时结束要执行的回调
	 @ return: null
	 */
	timeDown : function(setting){
		'use strict';  //符合ECMAScript 5标准
	    setting = $.extend(true,{
	        time  : 60,
	        callback : function(){
	            this.msg("倒计时结束");
	        }
	    },setting);
	    var dome = $(setting.dome);
	    dome.html(setting.time);
	    var vali = setInterval(function(){
	        var s = dome.text() * 1;
	        s--;
	        if(s == 0){
	            clearInterval(vali);
	            setting.callback && setting.callback();
	        }
	        dome.html(s < 10 ? "0"+s : s);
	    }, 1000);
	},
	/**
	 @ msg:弹窗提示函数
	 @ param: text(string类型) -- 要弹出提示的内容
	 @ param: callback(function类型) -- 弹窗消失后执行的回调函数
	 @ return: null
	 */
	msg : function(text,callback){   //msg弹出式提示
		'use strict';  //符合ECMAScript 5标准
		if(text && "string" == typeof text){
			var box = $("<div class='popup-msg'>"+text+"</div>"),
				z = new Date().getTime();
			$("body").append(box);
			box.attr("style","z-index:"+z).animate({
				"opacity" : 1
			},2500).animate({
				"opacity" : 0
			},500,function(){
				$(this).remove();
				setTimeout(function(){
					callback && "function" == typeof callback && callback();
				}, 600);
			});
		}
	},
	/**
	 @ iosGetJs:IOS端js调用
	 @ param: callback -- IOS端传递过来的方法
	 @ return: null
	 */
	iosGetJs : function(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    },
    /**
	 @ isIOS:判断是否是ios客户端
	 @ param: null
	 @ return: Boolean
	 */
    isIOS : function(){
    	return (navigator.userAgent.match("GGXUECHE") && navigator.userAgent.match("iOS"));
    },
    /**
	 @ isAndroid:判断是否是ios客户端
	 @ param: null
	 @ return: Boolean
	 */
    isAndroid : function(){
    	return (navigator.userAgent.match("GGXUECHE") && navigator.userAgent.match("Android"));
    },
    appBtn : function(name){
    	try {
    		this.isIOS && this.iosGetJs(function(bridge) {
	            bridge.callHandler(name);
	        });
	        this.isAndroid && window.stub[name]();
    	} catch(e) {
    		this.msg(e);
    	}
    }
}
//对象暴露出来
module.exports = mainFun;