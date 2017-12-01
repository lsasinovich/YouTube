var INLINE_BLOCK = "inline-block";
var INDICATOR = "indicator";
var INDICATORS = "indicators";

function createIndicator(index, i, indicatorsParent) {
    let newIndicator = document.createElement("div");

    newIndicator.setAttribute("class", INDICATOR);
    newIndicator.setAttribute("name", INDICATOR);
    newIndicator.innerHTML = `<span>${index+1+i}</span>`;
    newIndicator.setAttribute("checked", "false");
    newIndicator.style.display = "none";
    newIndicator.addEventListener("click", setSlide(index+i));

    indicatorsParent.appendChild(newIndicator);
}

function showIndicators(num) {
  if (indicators.length <= 4) {
    for( var i = 0; i<indicators.length; i++)
       indicators[i].style.display = INLINE_BLOCK ;
     return;
  }

  if( num == 0 ) {
    indicators[num].style.display = INLINE_BLOCK ;
    indicators[num+1].style.display = INLINE_BLOCK ;
    indicators[num+2].style.display = INLINE_BLOCK ;
    indicators[num+3].style.display = INLINE_BLOCK ;
  } else if (num == indicators.length-1) {
    indicators[num].style.display = INLINE_BLOCK ;
    indicators[num-1].style.display = INLINE_BLOCK ;
    indicators[num-2].style.display = INLINE_BLOCK ;
    indicators[num-3].style.display = INLINE_BLOCK ;
  } else {
    indicators[num].style.display = INLINE_BLOCK ;
    indicators[num-1].style.display = INLINE_BLOCK ;
    indicators[num+1].style.display = INLINE_BLOCK ;
    if ( num == 1 ) 
      indicators[num+2].style.display = INLINE_BLOCK ;
    else  indicators[num-2].style.display = INLINE_BLOCK ;
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

function addIndicators(index) {
    for (var i = 0; i < 4; i++) {
        createIndicator(index, i, indicatorsParent);
    }
    indicatorsCount = indicators.length;
}

function carouselShow(num) {
        indicators[num].setAttribute('data-state', 'active');
        indicators[num].setAttribute("checked", "true");
        console.log(num);
        if (num === indicatorsCount-1) {
            addIndicators(num + 1);
            getNextItems(elements, str);
        }

        showIndicators(num);

        for (var i = 0; i < itemsCount; i++) {
          if (num*itemsCount + i < slides.length) {
            slides[num*itemsCount + i].setAttribute('data-state', 'active');
            slides[num*itemsCount + i].style.display = INLINE_BLOCK;
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
        createIndicator(i, 0, indicatorsParent);
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
            createIndicator(i, 0, indicatorsParent);
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
        x.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=' + elements.items[i].id.videoId + '&key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&part=snippet,statistics', false);
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

function getNextItems(elements, str) {
    console.log(elements.nextPageToken);    var x = new XMLHttpRequest();
    x.open('GET', ' https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&type=video&part=snippet&maxResults=12&q=' + str + '&pageToken=' + elements.nextPageToken, false);
    x.send();

    return JSON.parse(x.responseText).items;
}

function request(event) {
    var input = document.querySelector('.searchTerm');
    str = input.value;

    if(str != "") {
        var x = new XMLHttpRequest();
        x.open('GET', ' https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&type=video&part=snippet&maxResults=12&q=' + str, false);
        x.send();
        if (x.status != 200) {
            console.log( x.status + ': ' + x.statusText );
        } else {
           elements = JSON.parse(x.responseText);

            if(elements.items.length === 0) {
                console.log( "No such videos ");
            } else {
                fillResultItems(elements, str);
            }
        }
    }
}
var elements;
var str = "";
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
var indicators = carousel.getElementsByClassName(INDICATOR);
var indicatorsParent = carousel.querySelector('.' + INDICATORS);
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
    createIndicator(i, 0, indicatorsParent);
}

showIndicators(0);
indicators[0].setAttribute("checked", "true");
indicators[0].setAttribute("data-state", "active");

for (let i = 0; i < itemsCount; i++) {
    if (slides[i] !== undefined)
     slides[i].setAttribute('data-state', 'active');
}
