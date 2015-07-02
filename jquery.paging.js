//페이지 출력 플러그인 111226 by ASRAHI
(function($){
	var opt = {
		link : "#page=",
		scale : 20,
		pageScale : 10,
		page : 1,
		totalCount : 0,
		prev : '이전',
		next : '다음',
		first : '처음',
		last : '끝'
	};

	var public = {
		init:function(options){
			if(options) $.extend(opt,options);

			var page = {
				now : Number(opt.page),
				total : Math.ceil(opt.totalCount / opt.scale),
				start : Math.floor((opt.page-1) / opt.pageScale) * opt.pageScale + 1,
				end : (Math.floor((opt.page-1) / opt.pageScale) * opt.pageScale) + (opt.pageScale)
			}
			page.end = (page.end < page.total) ? page.end : page.total;
			page.prev = (opt.page > 10) ? opt.page - 1 : false;
			page.next = Math.floor(opt.page / opt.pageScale) + 1 ? Number(opt.page) + 1 : false;

			var return_html = '';

			//총갯수가 스케일보다 작으면 1페이지만 출력
			if(Number(opt.totalCount) < Number(opt.scale)){
				return_html = private.tag_now(1);
			} else {
				if(opt.page > 1){
					return_html += private.tag_a(1,opt.first,'first');
					if((page.start+1) > 10) return_html += private.tag_a(page.start-1,opt.prev,'prev');
				}
				for(var i = page.start; i <= page.end; i++){
					return_html+= (i == opt.page) ?  private.tag_now(i) : private.tag_a(i);
				}
				if(opt.page < page.total){
					if((page.end+1) < page.total) return_html += private.tag_a(page.end+1,opt.next,'next');
					return_html += private.tag_a(page.total,opt.last,'last');
				}
			}

			//출력
			this.html(return_html);
			return this;
		}
	}

	var private = {
		tag_a : function(no,str,class_str){
			if(!class_str) class_str = "num";
			if(no < 1) return '';
			if(!str) var str = no;
			return '<a href="'+(opt.link)+(no)+'" class="' + class_str + '">'+ str +'</a>';
		},
		tag_now:function(no){
			return '<span class="now">'+no+'</span>';
		}

	}

	$.fn.paging = function(method){
		if ( method && public[method] ) {
			return public[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return public.init.apply( this, arguments );
		} else {
			alert('No Find Method:: ' +  method );
		}

	};
})(jQuery);
