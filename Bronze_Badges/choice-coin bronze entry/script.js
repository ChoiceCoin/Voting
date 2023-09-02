document.getElementById('nav-toggle').onclick = function(){
  document.getElementById("nav-content").classList.toggle("hidden");
}

// let responsiveSlider = function() {
	
// 	let slider = document.getElementById("slider");
// 	let sliderWidth = slider.offsetWidth;
// 	let slideList = document.getElementById("slideWrap");
// 	let count = 1;
// 	let items = slideList.querySelectorAll("li").length;
// 	let prev = document.getElementById("prev");
// 	let next = document.getElementById("next");
	
// 	window.addEventListener('resize', function() {
// 	  sliderWidth = slider.offsetWidth;
// 	});
	
// 	let prevSlide = function() {
// 	  if(count > 1) {
// 		count = count - 2;
// 		slideList.style.left = "-" + count * sliderWidth + "px";
// 		count++;
// 	  }
// 	  else if(count = 1) {
// 		count = items - 1;
// 		slideList.style.left = "-" + count * sliderWidth + "px";
// 		count++;
// 	  }
// 	};
	
// 	let nextSlide = function() {
// 	  if(count < items) {
// 		slideList.style.left = "-" + count * sliderWidth + "px";
// 		count++;
// 	  }
// 	  else if(count = items) {
// 		slideList.style.left = "0px";
// 		count = 1;
// 	  }
// 	};
	
// 	next.addEventListener("click", function() {
// 	  nextSlide();
// 	});
	
// 	prev.addEventListener("click", function() {
// 	  prevSlide();
// 	});
	
// 	setInterval(function() {
// 	  nextSlide()
// 	}, 5000);
	
// 	};
	
// 	window.onload = function() {
// 	responsiveSlider();  
// 	}
	
//   const slideDelay = 5000;

// const dynamicSlider = document.getElementById("sliderText");

// let curSlide = 0;
// window.setInterval(()=>{
//   curSlide++;
//   if (curSlide === dynamicSlider.childElementCount) {
// 	curSlide = 0;
//   }


//   dynamicSlider.firstElementChild.style.setProperty("margin-left", "-" + curSlide + "00%");
// }, slideDelay);

