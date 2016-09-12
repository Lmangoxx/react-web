/************web app banner滑动构造函数**************
 **** 构造函数:Slider()
 **** 创建时间：2015-7-6
 **** 版本型号：1.0
****************************************************/
var Slider = function (opts){  
	this.wrap = opts.dom;
	this.dataList = opts.dataList;
	this.auto = opts.auto;
	this.autoTime = opts.autoTime;

	//构造三部曲
	this.init();   //初始化参数
	this.renderDOM();   //添加DOM元素
	this.bindDOM();   //给DOM绑定事件

}

Slider.prototype.init = function(){
	this.scaleW = window.innerWidth;   //设定滑动一次的宽度（相当于一屏）
	this.idx = 0;   //设置初始ID值，默认为0
}

Slider.prototype.renderDOM = function(){
	var wrap = this.wrap;
	var dataList = this.dataList;
	this.dataLen = dataList.length > 4 ? 4 : dataList.length;
	this.ul = document.createElement('ul');
	this.cur = document.createElement('div');
	this.cur.setAttribute('class','ulCur display-box');
	for(var i = 0; i<this.dataLen; i++){
		var li = document.createElement('li');
		var scaleW = this.scaleW;
		var data = dataList[i];
		li.style.width = scaleW + "px";
		li.style.left = -i*scaleW + "px";
		li.style.webkitTransform = 'translate3d('+ i*scaleW +'px,0,0)';
		var img = data['picture'] ? data['picture'].split(",")[0] : "http://www.ggxueche.com/static/images/cms/gg-default.jpg";
		li.innerHTML = "<a href=http://www.ggxueche.com/main/article/pages/detail/"+ data['id'] +"><img width='100%' height='"+this.scaleW/16*9+"' src='"+ img +"' /></a>";				
		this.ul.appendChild(li);
	}


	var spanJav = document.createElement("span");
	spanJav.setAttribute('class','indexNum');
	this.spanI = document.createElement("i");
	this.spanI.innerHTML = this.idx + 1;
	spanJav.appendChild(this.spanI);
	var spanE = document.createElement('em');
	spanE.innerHTML = this.dataLen;
	spanJav.appendChild(spanE);
	this.cur.appendChild(spanJav);
	this.spanT = document.createElement('div');
	this.spanT.setAttribute('class', 'indexTitle box-flex over-ell');
	this.spanT.innerHTML = dataList[this.idx].title;
	this.cur.appendChild(this.spanT);
	this.spanN = document.createElement('span');
	this.spanN.setAttribute('class', 'lookNum');
	this.spanN.innerHTML = '<i class="icon-iconfontbukejian"></i>' + dataList[this.idx].click;
	this.cur.appendChild(this.spanN);
	
	this.wrap.innerHTML = "";
	this.wrap.appendChild(this.ul);
	this.ul.style.width = this.dataLen * this.scaleW + "px";
	this.wrap.appendChild(this.cur);
}

Slider.prototype.bindDOM = function(){
	var self = this;
	var ul = self.ul;

	if(self.auto){
		var inne = setInterval(function(){
			self.autoPlay();
		},self.autoTime);
	}

	var touchStart = function(event){
		clearInterval(inne);
		self.startX = event.touches[0].pageX;   //记录手指触摸点X坐标值
		self.offsetX = 0;   //手指触摸屏幕滑动结束后，初始化手指移动距离为0
		self.startTime = new Date() * 1;   //记录手指开始触摸屏幕时间
	};

	var touchMove = function(event){
		event.preventDefault();   //阻止浏览器的默认事件，某些浏览器默认情况下滑动会进行切入下一页操作，这里阻止默认操作
		self.offsetX = event.touches[0].pageX - self.startX;   //移动结束点坐标减去开始点坐标，算出移动位移大小

		var lis = ul.getElementsByTagName('li');       //获取li的节点集合
		var i = self.idx - 1;   //获取当前idx的前一个元素
		var m = self.idx + 1;	//获取当前idx的后一个元素

		for(i; i <= m ; i++){					
			lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ( (i-self.idx)*self.scaleW + self.offsetX ) +'px,0,0)');
			lis[i] && (lis[i].style.webkitTransitionDuration = '0ms');					
		}
	};
	var touchEnd = function(event){
		var boundary = self.scaleW/4;   //滑动切换临界点，判断滑动距离是否超过临界点(默认为屏幕的1/4)
		var endTime = new Date() * 1;
		var lis = ul.getElementsByTagName('li');
		if((endTime - self.startTime) > 800){
			if(self.offsetX < -boundary){
				//self.offsetX为负数时，对应的操作为进入下一页
				self.go("+1");
			}else if(self.offsetX > boundary){
				//self.offsetX为正数时，对应的操作为进入上一页
				self.go("-1");
			}else{
				//停留在本页
				self.go("0");
			}
		}else{
			//滑动操作时间小于800毫秒时，该操作为快操作，快操作下offsetX移动距离为50时就可以进行切换操作
			if(self.offsetX > 50){
				self.go("-1");
			}else if(self.offsetX < -50){
				self.go("+1");
			}else{
				self.go("0");
			}
		}

		if(self.auto){
			inne = setInterval(function(){
				self.autoPlay();
			},self.autoTime);
		}
	};
	ul.addEventListener("touchstart", touchStart);
	ul.addEventListener("touchmove", touchMove);
	ul.addEventListener("touchend", touchEnd);
}

Slider.prototype.go = function(n){
	var idx = this.idx;
	var cidx;
	var lis = this.ul.getElementsByTagName('li');
	var alis = this.cur;
	var len = lis.length;

	//判断当前操作要去的索引值
	if(typeof n !== "0"){
		cidx = idx + n * 1;
	}else{
		cidx = idx;
	}
	//判断索引值是否在可操作范围
	if(cidx > (len-1)){
		cidx = len -1;
	}else if(cidx < 0){
		cidx = 0;
	}
	for(var i = 0; i<lis.length; i++){
		if(this.idx == -1 && i == lis.length-1){
			lis[i].style.webkitTransitionDuration = '500ms';
		}else{
			lis[i].style.webkitTransitionDuration = '0ms';
		}
		lis[i].style.webkitTransform = 'translate3d('+ this.scaleW +'px, 0, 0)';
	}
	this.spanI.innerHTML = cidx+1;
	this.spanT.innerHTML = this.dataList[cidx].title;
	this.spanN.innerHTML = '<i class="icon-iconfontbukejian"></i>' + this.dataList[cidx].click;
	if(this.idx > 0){
		lis[0].style.webkitTransform = 'translate3d(-'+ this.scaleW +'px, 0, 0)';
	}

	this.idx = cidx;

	//改变过渡的方式，从无动画变为有动画
	lis[cidx] && (lis[cidx].style.webkitTransitionDuration = '500ms');
	lis[cidx-1] && (lis[cidx-1].style.webkitTransitionDuration = '500ms');
	lis[cidx+1] && (lis[cidx+1].style.webkitTransitionDuration = '500ms');

	//改变动画后所应该的位移值
	lis[cidx] && (lis[cidx].style.webkitTransform = 'translate3d(0, 0, 10px)');
	lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+ this.scaleW +'px, 0, 0)');
	lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+ this.scaleW +'px, 0, 0)');
	
}

Slider.prototype.autoPlay = function(){
	var idx = this.idx;
	var lis = this.ul.getElementsByTagName('li');
	if(idx >= (this.dataLen-1)){
		this.idx = -1;
	}else{
		this.idx = idx;
	}
	this.go("+1");
}
module.exports = Slider;
