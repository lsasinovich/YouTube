/* Hiding carousele (set attribetes display:none and data-state: "")*/
function showIndicators(num) {
  if (indicators.length <= 4) {
    for( var i = 0; i<indicators.length; i++)
       indicators[i].style.display = "inline-block";
     return;
  }

  if( num == 0 ) {
    indicators[num].style.display = "inline-block";
    indicators[num+1].style.display = "inline-block";
    indicators[num+2].style.display = "inline-block";
    indicators[num+3].style.display = "inline-block";
  } else if (num == indicators.length-1) {
    indicators[num].style.display = "inline-block";
    indicators[num-1].style.display = "inline-block";
    indicators[num-2].style.display = "inline-block";
    indicators[num-3].style.display = "inline-block";
  } else {
    indicators[num].style.display = "inline-block";
    indicators[num-1].style.display = "inline-block";
    indicators[num+1].style.display = "inline-block";
    if ( num == 1 ) 
      indicators[num+2].style.display = "inline-block";
    else  indicators[num-2].style.display = "inline-block";
  }
}

function carouselHide() {
      for (var i = 0; i<slides.length; i++) {
            slides[i].setAttribute('data-state', '');
            slides[i].style.display = 'none';
        }

        for (var i = 0; i < indicators.length; i++) {
            indicators[i].setAttribute('data-state', '');
            indicators[i].setAttribute("checked", "false");
            indicators[i].style.display = 'none';
        }
}

function carouselShow(num) {
        indicators[num].setAttribute('data-state', 'active');
        indicators[num].setAttribute("checked", "true");

        showIndicators(num);

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
          node.style.display = "none";
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
          node.style.display = "none";
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

function fillResultItems(elements) {

    [].forEach.call(slides, function(item, i) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=' + elements[i].id.videoId + '&key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&part=snippet,statistics', false);
        x.send();

        var result =  JSON.parse(x.responseText).items[0];

        item.querySelector(".item-img").lastElementChild.src = result.snippet.thumbnails.medium.url;
        item.querySelector(".item-upload-date").lastElementChild.textContent = result.snippet.publishedAt.slice(0, 10);
        item.querySelector(".item-name").textContent = result.snippet.title;
        item.querySelector(".item-author").lastElementChild.textContent = result.snippet.channelTitle;
        item.querySelector(".item-count-view").lastElementChild.textContent = result.statistics.viewCount;
        item.querySelector(".item-description").textContent = result.snippet.description;
    });
}

function request(event) {
    var input = document.querySelector('.searchTerm');
    var str = input.value;

    if(str != "") {
        var x = new XMLHttpRequest();
        x.open('GET', ' https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&type=video&part=snippet&maxResults=15&q=' + str, false);
        x.send();

        if (x.status != 200) {
            console.log( x.status + ': ' + x.statusText );
        } else {
            var mas = JSON.parse(x.responseText).items;

            if(mas.length === 0) {
                console.log( "No such videos ");
            } else {
                fillResultItems(mas);
            }
        }
    }
}

var searchButton = document.querySelector('.searchButton');
var searchInput = document.querySelector('.searchTerm');
searchInput.onkeypress = function(e){
    if(e.keyCode==13){
        request();
    }
};
searchButton.addEventListener("click", request);
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
    node.style.display = "none";
    node.setAttribute("checked", "false");
    indicatorsParent.appendChild(node);
}

showIndicators(0);
indicators[0].setAttribute("checked", "true");
indicators[0].setAttribute("data-state", "active");

for (let i = 0; i < itemsCount; i++) {
    if (slides[i] !== undefined)
     slides[i].setAttribute('data-state', 'active');
}
