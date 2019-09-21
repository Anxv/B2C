$(function () {
	app.initContentTabs();
	app.initSwiper();
})

var app = {

	// initIframe: function () {
	// 	var heights = document.documentElement.clientHeight - 100;
	// 	document.getElementById('rightIfram').height = heights;
	// },

	// hideAside: function () {
	// 	$('.aside-ul>li:nth-child(-n+10) ul').hide()
	// 	$('.aside h4').click(function () {
	// 		$(this).siblings('ul').slideToggle();
	// 	})
	// },
	initSwiper:function(){
		var mySwiper = new Swiper('.swiper-container', {
			// autoplay:true,
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
			},
			// direction: 'vertical', // 垂直切换选项
			loop: true, // 循环模式选项
	
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			},
	
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	},
	initContentTabs: function () {
		$('.detail_info .detail_info_item:first').addClass('active');
		$('.detail_list li:first').addClass('active');
		$('.detail_list li').click(function () {
			var index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');

			$('.detail_info .detail_info_item').removeClass('active').eq(index).addClass('active');
		})
	},

}