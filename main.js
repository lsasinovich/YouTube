/* Hiding carousele (set attribetes display:none and data-state: "")*/
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

        for (var i = 0; i<itemsCount; i++) {
            slides[num*itemsCount + i].setAttribute('data-state', 'active');
            slides[num*itemsCount+i].style.display = 'inline-block';
        }
}

function setSlide(slide) {
    return function() {

        carouselHide();

        carouselShow(slide);

    };
}

function addIndicator(start, count, parent) {
    for (let i = start; i < count; i++) {
        let node = document.createElement("input");

        node.setAttribute("class", "indicator");
        node.setAttribute("name", "indicator");
        node.setAttribute("type", "radio");
        node.setAttribute("data-slide", `${i}`);
        node.addEventListener("click", setSlide(i));

        parent.appendChild(node);
    }
}

function resize() {
    if (window.innerWidth <= 800 && itemsCount == 4) {
        for (let i = 0; i < 3; i++) {
            let node = document.createElement("input");

            node.setAttribute("class", "indicator");
            node.setAttribute("name", "indicator");
            node.setAttribute("type", "radio");
            node.setAttribute("data-slide", `${indicatorsCount + i}`);
            node.addEventListener("click", setSlide(indicatorsCount + i));

            indicatorsParent.appendChild(node);
        }
        itemsCount = 2;
        indicatorsCount = Math.ceil(slides.length/itemsCount);

        for (let i = 0; i < indicatorsCount; i++) {
            if( indicators[i].checked ==  true) {
                console.log('here');
                setSlide(i*2)();
                break;
            }
        }
    }

    if (window.innerWidth > 800 && itemsCount == 2) {

        for (let i = 0; i < 3; i++) {
            if(indicatorsParent.lastElementChild.checked == true) {
              console.log("ok");
              indicatorsParent.lastElementChild.previousElementSibling.checked = true;
            }
            indicatorsParent.removeChild(indicatorsParent.lastElementChild);
        }
        itemsCount = 4;
        indicatorsCount = Math.floor(slides.length/itemsCount);

        for (let i = 0; i < indicatorsCount; i++) {
            if( indicators[i].checked ==  true) {
                console.log('here')
                setSlide(Math.floor(i/2))();
                break;
            }
        }
    }

    if (window.innerWidth <= 480 && itemsCount == 2) {
        for (let i = 0; i < 6; i++) {
            let node = document.createElement("input");

            node.setAttribute("class", "indicator");
            node.setAttribute("name", "indicator");
            node.setAttribute("type", "radio");
            node.setAttribute("data-slide", `${indicatorsCount + i}`);
            node.addEventListener("click", setSlide(indicatorsCount + i));

            indicatorsParent.appendChild(node);
        }
        itemsCount = 1;
        indicatorsCount = Math.ceil(slides.length/itemsCount);

        for (let i = 0; i < indicatorsCount; i++) {
            if( indicators[i].checked ==  true) {
                console.log('here');
                setSlide(i*2)();
                break;
            }
        }
    }

    if (window.innerWidth > 480 && itemsCount == 1) {

        for (let i = 0; i < 6; i++) {
            if(indicatorsParent.lastElementChild.checked == true) {
              console.log("ok");
              indicatorsParent.lastElementChild.previousElementSibling.checked = true;
            }
            indicatorsParent.removeChild(indicatorsParent.lastElementChild);
        }
        itemsCount = 2;
        indicatorsCount = Math.ceil(slides.length/itemsCount);

        for (let i = 0; i < indicatorsCount; i++) {
            if( indicators[i].checked ==  true) {
                console.log('here')
                setSlide(Math.floor(i/2))();
                break;
            }
        }
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
    let node = document.createElement("input");

    node.setAttribute("class", "indicator");
    node.setAttribute("name", "indicator");
    node.setAttribute("type", "radio");
    node.setAttribute("data-slide", `${i}`);
    node.addEventListener("click", setSlide(i));

    indicatorsParent.appendChild(node);
}

indicators[0].checked = "true";

for (let i = 0; i < itemsCount; i++) {
    slides[i].setAttribute('data-state', 'active');
}
