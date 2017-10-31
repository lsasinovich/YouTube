var carousel = document.getElementById('carousel');
  

function carouselHide() {
      for (var i = 0; i<slides.length; i++) {
            slides[i].setAttribute('data-state', '');
            slides[i].style.display = 'none';
        }

        for (var i = 0; i < indicators.length; i++) {
            indicators[i].setAttribute('data-state', '');            
        }
}

function carouselShow(num) {
        indicators[num].setAttribute('data-state', 'active');
        indicators[num].checked = true;

        for (var i = 0; i<count; i++) {
            slides[num*count + i].setAttribute('data-state', 'active');
            slides[num*count+i].style.display = 'inline-block';
        }
}

function setSlide(slide) {
    return function() {               
        
        carouselHide();
        
        carouselShow(slide);

    };
}



if (carousel) {
    var slides = carousel.querySelectorAll('.result-item');
    var indicators = carousel.querySelectorAll('.indicator');
    var indicator = indicators[0];

    if (window.innerWidth >800) {
        var count = 4;
        var j=3;
    } else if (window.innerWidth > 480) {
        var count = 2;
        var j=1;
    }
    else {
        var count = 1;
        var j=0;
    }
    while (j !== -1) {
        slides[j].setAttribute('data-state', 'active');
        j--;
    }

    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", setSlide(i));
    }
};

window.onresize = resize;

function resize() {
    
    if (window.innerWidth > 800 && count != 4) {
        count = 4;
        j=3;
        var c = indicators.length;
        for (var i=0; i<c/2; i++) {
            document.querySelector(".indicators").removeChild(document.querySelector(".indicators").lastChild);
        }
    } else if (window.innerWidth <= 800 && window.innerWidth > 480 && count != 2) {
        count = 2;
        j=1;
        var c = indicators.length;
        for (var i=0; i<c; i++) {
            var node = document.createElement('input');
            node.setAttribute('class', 'indicator');
            node.setAttribute('name', 'indicator');
            node.setAttribute('type', 'radio');

            document.querySelector(".indicators").append(node);

        }
    }
    else if (window.innerWidth <= 480){
        count = 1;
        j=0;
    }

    indicators = carousel.querySelectorAll('.indicator');
     for (var i = 0; i<slides.length; i++) {
            slides[i].setAttribute('data-state', '');
            slides[i].style.display = 'none';
        }
    for (var i=0; i<indicators.length; i++) {
        if(indicators[i].getAttribute("data-state") == "active") {

            carouselShow(i); 
        }
    }
    
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", setSlide(i));
    }
}

