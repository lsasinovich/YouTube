/* Hiding carousele (set attribetes display:none and data-state: "")*/
function carouselHide() {
      for (var i = 0; i<slides.length; i++) {
            slides[i].setAttribute('data-state', '');
            slides[i].style.display = 'none';
        }

        for (var i = 0; i < indicators.length; i++) {
            indicators[i].setAttribute('data-state', '');
            indicators[i].setAttribute("checked", "false");
        }
}

function carouselShow(num) {
        indicators[num].setAttribute('data-state', 'active');
        indicators[num].setAttribute("checked", "true");

        for (var i = 0; i < itemsCount; i++) {
          if (num*itemsCount + i < slides.length) {
            slides[num*itemsCount + i].setAttribute('data-state', 'active');
            slides[num*itemsCount + i].style.display = 'inline-block';
          }
        }
}

function setSlide(slide) {
    return function() {

        carouselHide();

        carouselShow(slide);

    };
}

function resize() {
    if (window.innerWidth <= 800 && window.innerWidth > 480 &&  itemsCount == 4) {
      itemsCount = 2;

    for (let i = indicatorsCount; i < Math.round(slides.length/2); i++) {
          let node = document.createElement("div");

          node.setAttribute("class", "indicator");
          node.setAttribute("name", "indicator");
          node.innerHTML = `<span>${i+1}</span>`;
          node.setAttribute("checked", "false");
          node.addEventListener("click", setSlide(i));

          indicatorsParent.appendChild(node);
      }

    indicatorsCount = indicators.length;

      for (let i = 0; i < indicatorsCount; i++) {
          if( indicators[i].getAttribute("checked") ==  "true") {
              setSlide(i*2)();
              break;
          }
      }
}

    if (window.innerWidth > 800 && itemsCount != 4) {
      let num;
      itemsCount = 4;
       for (let i = 0; i < indicators.length; i++) {
            if( indicators[i].getAttribute("checked") ==  "true") {
                num = i;
            }
        }

       for (let i = indicatorsCount-1; i >= Math.ceil(slides.length/itemsCount); i--) {
            indicatorsParent.removeChild(indicatorsParent.lastElementChild);
        }
        indicatorsCount = indicators.length;

        setSlide(Math.floor(num/2))();
    }

    if (window.innerWidth <= 480 && itemsCount != 1) {
      itemsCount = 1;
      let num;
        for (let i = indicatorsCount; i < slides.length; i++) {

            let node = document.createElement("div");

          node.setAttribute("class", "indicator");
          node.setAttribute("name", "indicator");
          node.innerHTML = `<span>${i+1}</span>`;
          node.setAttribute("checked", "false")
          node.addEventListener("click", setSlide(i));

          indicatorsParent.appendChild(node);
        }

        indicatorsCount = indicators.length;

        for (let i = 0; i < indicatorsCount; i++) {
            if( indicators[i].getAttribute("checked") ==  "true") {
                setSlide(i*2)();
                break;
            }
        }
    }

    if (window.innerWidth > 480 && window.innerWidth <= 800 &&  itemsCount == 1) {
      let num;
      itemsCount = 2;
        for (let i = 0; i < indicators.length; i++) {
            if( indicators[i].getAttribute("checked") ==  "true") {
                num = i;
            }
        }

       for (let i = indicatorsCount-1; i >= Math.ceil(slides.length/itemsCount); i--) {
            indicatorsParent.removeChild(indicatorsParent.lastElementChild);
        }

        indicatorsCount = indicators.length;

        setSlide(Math.floor(num/2))();
    }
}

var carousel = document.getElementById('carousel');
var slides = carousel.getElementsByClassName('result-item');
var indicators = carousel.getElementsByClassName('indicator');
var indicatorsParent = carousel.querySelector('.indicators');
window.onresize = resize;

var itemsCount;
var indicatorsCount;

if(window.innerWidth > 800) {
    itemsCount = 4;
} else if (window.innerWidth > 480) {
    itemsCount = 2;
} else {
    itemsCount = 1;
}

indicatorsCount = Math.ceil(slides.length/itemsCount);

for (let i = 0; i < indicatorsCount; i++) {
    let node = document.createElement("div");

    node.setAttribute("class", "indicator");
    node.setAttribute("name", "indicator");
    node.innerHTML = `<span>${i+1}</span>`;
    node.addEventListener("click", setSlide(i));
    node.setAttribute("checked", "false");
    indicatorsParent.appendChild(node);
}

indicators[0].setAttribute("checked", "true");
indicators[0].setAttribute("data-state", "active");

for (let i = 0; i < itemsCount; i++) {
    slides[i].setAttribute('data-state', 'active');
}
