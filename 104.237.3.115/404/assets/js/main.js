/*
AUTHOR   : lifeinsys
VERSION  : 1.0

TABLE OF CONTENTS
1.0 Spirit Bubbles Formation
3.0 document.ready FUNCTION
	2.1 activate wow js
	2.2 activate wordsrotator
*/

(function ($) {
	"use strict";

	/*-- ================================ --
        1.0 Spirit Bubbles Formation
	/*-- ================================ --*/
	var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

	// Main
	initHeader();
	addListeners();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		target = {
			x: 0,
			y: height
		};

		largeHeader = document.getElementById('wrapper-large');
		largeHeader.style.height = height + 'px';

		canvas = document.getElementById('canvas');
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext('2d');

		// create particles
		circles = [];
		for (var x = 0; x < width * 0.5; x++) {
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}

	// Event handling
	function addListeners() {
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeHeader.style.height = height + 'px';
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	// Canvas manipulation
	function Circle() {
		var _this = this;

		// constructor
		(function () {
			_this.pos = {};
			init();
		})();

		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.3;
			_this.scale = 0.1 + Math.random() * 0.3;
			_this.velocity = Math.random();
		}

		this.draw = function () {
			if (_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
			ctx.fill();
		};
	}
	//-- end Spirit Bubbles Formation

	/*-- ================================ --
        2.0 document.ready FUNCTION
	/*-- ================================ --*/
	$(document).ready(function () {
		//-- 2.1 activate wow js
		new WOW().init();

		//-- 2.2 activate wordsrotator
		$("#sub-title").wordsrotator({
			autoLoop: true, //auto rotate words
			randomize: false, //show random entries from the words array
			stopOnHover: false, //stop animation on hover
			changeOnClick: false, //force animation run on click
			animationIn: "flipInX", //css class for entrace animation
			animationOut: "flipOutX", //css class for exit animation
			speed: 3000, //delay in milliseconds between two words
			words: ['<span class=purple>OOPS</span>, page not found', 'Please try again!'] //Array of words, it may contain HTML values
		});

	});
	//-- end document.ready function
})(jQuery);

//Init color buttons
function initColor($wrapper,$colorPick,$given_url) {
    $colorPick.on('click',function() {
        $.each($colorPick,function(index,value){
            $(value).removeClass('bg_active');
        });
        $given_url.removeClass('bg_active');
        $(this).addClass('bg_active');
        var image = $(this).data("image");
        //CSS
        $wrapper.css( "background", function( index ) {
            return '#0D0D1A url(assets/img/'+ image +') no-repeat';
        });
    });
}

//Init open/close button	
function initClose($wrapper) {
    $('#color_open_close').on('click',function(e) {
        $wrapper.toggleClass('opened-settings');
        e.preventDefault();	
    });
}

function initSetUrlPic($wrapper,$colorPick,$given_url){
    $('#set_url_pic').on('click',function() {
        $.each($colorPick,function(index,value){
            $(value).removeClass('bg_active');
        });
        $given_url.addClass('bg_active');
        $wrapper.attr('style', 'background: #0D0D1A url('+$(".given_url").val()+') no-repeat;');
    });
}


$(document).ready(function() {
    var $wrapper = $('.wrapper');
    var $colorPick = $('.color_pick_wrap section span');
    var $given_url = $(".given_url");
    
    initColor($wrapper,$colorPick,$given_url);	
    initClose($wrapper);
    initSetUrlPic($wrapper,$colorPick,$given_url);
});