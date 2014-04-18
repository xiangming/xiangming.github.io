/*
* JavaScript Template v0.1
* Copyright 2013, Jason Xiang
* www.xiguabaobao.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 2013-12-24
*/


/* Table of Content
==================================================
	#Basic Scripts
	#Site Scripts 
	#Page Scripts */


/* #Basic Scripts
==================================================*/
	
	/**
	 * 返回元素的下一个兄弟元素
	 * @param  className class名称，字符串
	 */
	function next(className){
		var n = this.nextSibling;
		for ( ; n; n = n.nextSibling) {
			//不筛选
			if (arguments.length == 0 && n.nodeType === 1) {
				return n;
			};
			//根据className筛选
			if (arguments.length > 0 && n.nodeType === 1 && n.className.indexOf(className) > -1) {
				return n;
			};
		};
	}


	/**
	 * 给元素添加/移除一个class
	 * @param  className class名称，字符串
	 */
    function toggleClass(className){
    	if (!this.className) {
    		this.className = className;
    	}else if (this.className.indexOf(className) > -1) {
    		//已经包含需要添加的className
    		var reg = new RegExp("(^|\\s)"+className+"(\\s|$)");//使用字符串参数时，不需要首尾的斜杠/;括号是分组，不能省略。
    		this.className = this.className.replace(reg,"");//如果使用拼接的方式，可以将字符串eval(str)一下
    	}else{
    		var newClassName = this.className + ' ' + className;
    		this.className = newClassName;
    	}
    }


    /**
     * 拓展DOM功能
     */
    if (window.HTMLElement) {
    	HTMLElement.prototype.toggleClass = document.toggleClass = toggleClass;
    	HTMLElement.prototype.next = document.next = next;
    }else{
    	document.toggleClass = toggleClass;
    	document.next = next;
    	var e = document.all;
    	for (var i = 0; i < e.length; i++) {
    		e[i].toggleClass = toggleClass;
    		e[i].next = next;
    	};
    }


/* #Site Scripts
==================================================*/


/* #Page Scripts
==================================================*/
	window.onload = function(){

		var logo = document.getElementById('logo');
		
		/**
		 * 页面加载完成执行一次
		 */
		logo.toggleClass('rotate');

		/**
		 * onmouseover 鼠标移动到logo添加旋转效果
		 */
		logo.onmouseover = function(){
			this.toggleClass('rotate');
		};
		
		/**
		 * onmouseout 鼠标离开logo添加旋转效果
		 */
		logo.onmouseout = function(){
			this.toggleClass('rotate');
		};

		/**
		 * 首页启动轮播图
		 */
		if (document.getElementById('slide')) 
			slide_Init();
		
	};


	/**
	 * 启动轮播slide
	 */
	function slide_Init(){
		/**
		 * [w 页面宽度]
		 * [h 页面高度]
		 * @type {[number]}
		 */
		var w = window.innerWidth?window.innerWidth:document.documentElement.clientWidth;
		var h = window.innerHeight?window.innerHeight:document.documentElement.clientHeight;

		/**
		 * 获取幻灯片主容器
		 */
		var slide = document.getElementById('slide');

		/**
		 * 根据分辨率幻灯片自适应居中
		 */
		slide.style.left = (w-800)/2-700 + 'px';

		setInterval(function(){
			//获取第一张
			var first_slide = slide.children[0];
			var second_slide = slide.children[1];
			var third_slide = slide.children[2];
			//删除第一个
			slide.removeChild(first_slide);
			//插入到最后
			slide.appendChild(first_slide);
			//免激活第2张
			second_slide.toggleClass('active');
			//激活第3张幻灯片
			third_slide.toggleClass('active');
		},3000);
	}


	/**
	 * 展开/收起下拉列表
	 */
	function option_Init(option){
		if (!option) return false;
		var option_result = option.children[0];
		var option_list = option.children[3];
		var option_list_style = option_list.style.display;
		if (option_list_style == 'block') {
			option_list.style.display = 'none';
		}else{
			option_list.style.display = 'block';
		}

		/**
		 * [设置option的值] 使用事件委托优化（即事件绑定到父元素）
		 */
		option_list.onclick = function(e){
			option_result.value = e.target.childNodes[0].nodeValue;
		}
		/**
		 * [设置option的值] 未优化时，逐个绑定
		 */
		// for (var i = 0; i < option_list.children.length; i++) {
		// 	option_list.children[i].onclick = function(){
		// 		option_result.value = this.childNodes[0].nodeValue;
		// 	}
		// };
	}


	/**
	 * contact表单验证
	 */
	function checkForm(obj){
		//获取当前表单
		var form = obj;

		var nameTip = new Tooltip(form.name);
		var emailTip = new Tooltip(form.email);
		var titleTip = new Tooltip(form.title);

		nameTip.hide();
		emailTip.hide();
		titleTip.hide();

		//姓名name验证
		if (form.name != undefined && form.name.value == '') {
			//未通过验证
			nameTip.setContent('请填写您的姓名');
			nameTip.show();
			//阻止页面跳转
			return false;
		}else{
			//通过验证
        	nameTip.hide();
        }

		//邮箱email验证
		var email = new RegExp(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);//用于邮箱格式验证
        if(form.email != undefined && form.email.value == ''){
        	//不允许为空
        	emailTip.setContent('请填写您的邮箱');
        	emailTip.show();
        	//阻止页面跳转
        	return false;
        }else if(form.email != undefined && !email.test(form.email.value)){
        	//未通过验证
        	emailTip.setContent('邮箱格式不正确');
        	emailTip.show();
        	//阻止页面跳转
        	return false;
        }else{
        	//通过验证
        	emailTip.hide();
        }

        //邮件主题title验证
		if (form.title != undefined && form.title.value == '') {
			//未通过验证
			titleTip.setContent('请填写邮件主题');
			titleTip.show();
			//阻止页面跳转
			return false;
		}else{
			//通过验证
        	titleTip.hide();
        }

        /**
         * JSONP表单提交
         */
        var script = document.createElement('script');
        script.src = 'http://xiguabaobao.com/mail.php?callback=jsonpCallback';
        document.body.appendChild(script);

  		//阻止页面跳转
		return false;
	}


	/**
	 * JSONP自动回调函数
	 */
	function jsonpCallback(data){
		alert(data);
	}


	/**
	 * tooltip组件 触发指定对象obj的提示信息content
	 */
	function Tooltip(obj){
		this.tooltip = obj.next('tooltip');
	}

	Tooltip.prototype = {
		constructor:Tooltip,
		show: function(){
			this.tooltip.style.zIndex = '99999';
		},
		hide: function(){
			this.tooltip.style.zIndex = '-99999';
		},
		setContent: function(content,bgColor){
			this.tooltip.style.backgroundColor = bgColor;
			this.tooltip.innerHTML = content;
		},
		getContent: function(){
			return this.tooltip.innerHTML;
		},
		hasContent: function(){
			return this.getContent();
		}
	}

