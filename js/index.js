"use strict";
var ld=layer.load();
$(function(){
	layer.close(ld);
	var move={
		content:$(".move .content"),
		type:$(".type span"),
		nav:$(".nav li"),
		stat0:"",
		sort_key:"16",
		pn:"0",
		page:$(".page span"),
		init:function(){
			this.getData();
			this.typeClick();
			this.navClick();
			this.pageClick();
		},
		typeClick:function(){
			var _this=this;
			this.type.click(function(){
				_this.stat0=$(this).html();
				_this.pn="0",
				_this.sort_key=_this.sort_key;
				console.log(_this.stat0);
				$(this).addClass("active").siblings().removeClass("active");
				_this.page.eq(0).addClass("active").siblings().removeClass("active");
				_this.getData();
			})
		},
		navClick:function(){
			var _this=this;
			this.nav.click(function(){
				$(this).addClass("active").siblings().removeClass("active");
				_this.stat0=_this.stat0;
				_this.sort_key=$(this).attr("sort_key");
				_this.pn="0";
				_this.page.eq(0).addClass("active").siblings().removeClass("active");
				_this.getData();
			})
		},
		pageClick:function(){
			var _this=this;
			this.page.click(function(){
				$(this).addClass("active").siblings().removeClass("active");
				_this.pn = ($(this).html()-1)*8;
				_this.stat0=_this.stat0;
				_this.sort_key=_this.sort_key;
				_this.getData();
			})
		},
		getData:function(){
			var _this=this;
			$.ajax({
				type:"get",
				url:"https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8",
				data:{
					stat0:_this.stat0=="全部"?"":_this.stat0,
					sort_key:_this.sort_key,
					pn:_this.pn
				},
				dataType:"jsonp",
				jsonp:"cb",
				success:function(data){
					_this.handleData(data);
				}
			})
		},
		handleData:function(r){
			console.log(r);
			var con="";
			var result=r.data[0].result;
			console.log(result);
			for(var i=0,len=result.length;i<len;i++){
				con+=`<div class="content_list">
				<img src="${result[i].kg_pic_url}"/>
				<h3><a href="#">${result[i].ename}'</a></h3>
				<p>${result[i].additional}</p></div>`;
			}
			this.content.html(con);
			
		}
	};
	move.init();
});