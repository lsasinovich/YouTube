(function() {

    const DEFAULT_CAROUSEL_ELEMENT = ".defaultCarouselElement";
    const DEFAULT_CAROUSEL = ".defaultCarousel";
    const INDICATOR = "indicators-item";
    const COMPUTED_MARGIN = 25;
    let startingX;
    let endingX;

    let carousel = document.querySelector("#carousel");
    let allCarouselImage = carousel.children;
    let slideCount = 0;
    let slideIndex = 0;
    let indicators = carousel.nextElementSibling;
    let allIndicators = indicators.children;
    let indicatorsCount = 0;
    const width = 1200;

        let SLIDES = [
        {
            src: 'images/1.jpg',
            name: 'LOVE$ROMANSE1',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/2.jpg',
            name: 'LOVE$ROMANSE2',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/3.jpg',
            name: 'LOVE$ROMANSE3',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/4.jpg',
            name: 'LOVE$ROMANSE4',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/1.jpg',
            name: 'LOVE$ROMANSE5',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/2.jpg',
            name: 'LOVE$ROMANSE6',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/3.jpg',
            name: 'LOVE$ROMANSE7',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/4.jpg',
            name: 'LOVE$ROMANSE8',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
            {
                src: 'images/1.jpg',
                name: 'LOVE$ROMANSE9',
                author: 'SHOP NOW!',
                date: '',
                views: "452556",
                description: "sdkgushdiguhsdigh"
            },
            {
                src: 'images/2.jpg',
                name: 'LOVE$ROMANSE10',
                author: 'SHOP NOW!',
                date: '',
                views: "452556",
                description: "sdkgushdiguhsdigh"
            },
            {
                src: 'images/3.jpg',
                name: 'LOVE$ROMANSE11',
                author: 'SHOP NOW!',
                date: '',
                views: "452556",
                description: "sdkgushdiguhsdigh"
            },
            {
                src: 'images/4.jpg',
                name: 'LOVE$ROMANSE12',
                author: 'SHOP NOW!',
                date: '',
                views: "452556",
                description: "sdkgushdiguhsdigh"
            }
    ]

    setSlides(SLIDES);
    setIndicators();

    carousel.addEventListener("touchstart", touchStart);
    carousel.addEventListener("touchmove", touchMove);
    carousel.addEventListener("touchend", touchEnd);

    let searchButton = document.querySelector('.search-button');
    let searchInput = document.querySelector('.search-input');

    searchButton.addEventListener("click", request.bind(null, carousel));
    searchInput.onkeypress = function(e){
        if(e.keyCode == 13){
            request.bind(null, carousel)();
        }
    };



    function createCarouselItem() {
        let item = document.createElement("div");
        item.setAttribute("class", "carousel-item");

        let image = document.createElement("div");
        image.setAttribute("class", "item-image");

        let name = document.createElement("div");
        name.setAttribute("class", "item-name");

        let author = document.createElement("div");
        author.setAttribute("class", "item-author");
        let authorI = document.createElement("i");
        let authorP = document.createElement("p");
        authorI.setAttribute("class", "fa fa-female fa-2x");
        authorI.setAttribute("aria-hidden", "true");

        author.appendChild(authorI);
        author.appendChild(authorP);

        let date = document.createElement("div");
        date.setAttribute("class", "item-upload-date");

        let dateI = document.createElement("i");
        let dateP = document.createElement("p");
        dateI.setAttribute("class", "fa fa-calendar fa-2x");
        dateI.setAttribute("aria-hidden", "true");

        date.appendChild(dateI);
        date.appendChild(dateP);

        let view = document.createElement("div");
        view.setAttribute("class", "item-count-view");

        let viewI = document.createElement("i");
        let viewP = document.createElement("p");
        viewI.setAttribute("class", "fa fa-eye fa-2x");
        viewI.setAttribute("aria-hidden", "true");

        view.appendChild(viewI);
        view.appendChild(viewP);

        let description = document.createElement("div");
        description.setAttribute("class", "item-description");

        item.appendChild(image);
        item.appendChild(name);
        item.appendChild(author);
        item.appendChild(date);
        item.appendChild(view);
        item.appendChild(description);

        return item;
    }

    function setSlides(SLIDES) {
        for (let i = 0; i<SLIDES.length; i++) {
            let item = createCarouselItem();
            item.querySelector(".item-image").style.backgroundImage = "url(" + SLIDES[i].src + ")";
            item.querySelector(".item-image").style.backgroundSize = "cover";
            item.querySelector(".item-name").innerText = SLIDES[i].name;
            item.querySelector(".item-author").lastElementChild.innerText = SLIDES[i].author;
            item.querySelector(".item-upload-date").lastElementChild.innerText = SLIDES[i].date;
            item.querySelector(".item-count-view").lastElementChild.innerText = SLIDES[i].views;
            item.querySelector(".item-description").innerText = SLIDES[i].description;
            item.classList.add(DEFAULT_CAROUSEL_ELEMENT);

            carousel.appendChild(item);
            slideCount++;
        }

        carousel.classList.add(DEFAULT_CAROUSEL);
    }

    function setIndicators() {
        for (let i = 0; i<Math.round(allCarouselImage.length/4); i++) {
            let newIndicator = document.createElement("div");

            newIndicator.setAttribute("class", INDICATOR);
            newIndicator.setAttribute("name", INDICATOR);
            newIndicator.innerHTML = `${1+i}`;
            newIndicator.setAttribute("checked", "false");
            newIndicator.addEventListener("click", clickIndicator.bind(null, i));

            indicators.appendChild(newIndicator);
            indicatorsCount++;
        }
        allIndicators = indicators.children;
        allIndicators[0].setAttribute("active", "true");
        allIndicators[0].setAttribute("checked", "true");
    }

    function clickIndicator(index) {
        for(let i = 0; i < allIndicators.length; i++) {
            allIndicators[i].setAttribute("active", "false");
            allIndicators[i].setAttribute("checked", "false");
        }

        allIndicators[index].setAttribute("active", "true");
        allIndicators[index].setAttribute("checked", "true");
        switchSlideByIndicator.bind(null, index)();
    }


    function touchStart(event) {
        startingX = event.changedTouches[0].clientX;
    }

    function touchMove(event) {
        var touch = event.changedTouches[0];
        var change = startingX - touch.clientX;

        allCarouselImage[0].style.marginLeft = -change -1200*slideIndex + "px";
    }

    function touchEnd(event) {
        endingX = event.changedTouches[0].clientX;
        if (startingX - endingX > 0) {
            slideIndex++;
        } else {
            if (startingX - endingX === 0) {

            } else {
                slideIndex--;
            }
        }
        switchSlide(slideIndex);
    }

    function switchSlideByIndicator(index) {
        allCarouselImage[0].style.marginLeft = 1.5*COMPUTED_MARGIN + (-(index) * (width+5)) + "px";
    }

    function switchSlide(index) {
        console.log(index);
        if (index >= Math.round(slideCount/4)) {
            allCarouselImage[0].style.marginLeft = COMPUTED_MARGIN + (-(index - 1) * (width+5)) + "px";
            slideIndex = Math.round(slideCount/4) - 1;
        } else {
            if (index <= 0) {
                allCarouselImage[0].style.marginLeft = COMPUTED_MARGIN + "px";
                slideIndex = 0;
            } else {
                allCarouselImage[0].style.marginLeft = COMPUTED_MARGIN + (-(index) * (width+5)) + "px";
            }
        }

        for(let i = 0; i < allIndicators.length; i++) {
            allIndicators[i].setAttribute("active", "false");
            allIndicators[i].setAttribute("checked", "false");
        }

        allIndicators[slideIndex].setAttribute("active", "true");
        allIndicators[slideIndex].setAttribute("checked", "true");
    }

    function request() {
    let input = document.querySelector('.search-input');
    let str = input.value;

    carousel.innerHTML = "";
    console.log(carousel);
    if(str != "") {
        var x = new XMLHttpRequest();
        x.open('GET', ' https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&type=video&part=snippet&maxResults=22&q=' + str, false);
        x.send();
        if (x.status != 200) {
            console.log( x.status + ': ' + x.statusText );
        } else {
            let slides = JSON.parse(x.responseText);

            if(slides.items.length === 0) {
                console.log( "No such videos ");
            } else {
                fillResultItems(slides);
            }
        }
    }
}

function fillResultItems(slides) {

    [].forEach.call(slides.items, function(item) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=' + item.id.videoId + '&key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&part=snippet,statistics', false);
        x.send();
        var result =  JSON.parse(x.responseText).items[0];
        var element = createCarouselItem();
        element.querySelector(".item-image").style.backgroundImage = "url(" + result.snippet.thumbnails.medium.url + ")";
        element.querySelector(".item-image").style.backgroundSize = "cover";
        element.querySelector(".item-name").innerText =  result.snippet.title;
        element.querySelector(".item-author").lastElementChild.innerText = result.snippet.channelTitle;
        element.querySelector(".item-upload-date").lastElementChild.innerText = result.snippet.publishedAt.slice(0, 10);
        element.querySelector(".item-count-view").lastElementChild.innerText = result.statistics.viewCount;
        element.querySelector(".item-description").innerText =  result.snippet.description;
        carousel.appendChild(element);
    });
    allCarouselImage = carousel.children;
    slideCount = allCarouselImage.length;
    indicators.innerHTML = "";
        for (let i = 0; i<Math.round(allCarouselImage.length/4); i++) {
            let newIndicator = document.createElement("div");

            newIndicator.setAttribute("class", "indicators-item");
            newIndicator.setAttribute("name",  "indicators-item");
            newIndicator.innerHTML = `${1+i}`;
            newIndicator.setAttribute("checked", "false");
            newIndicator.addEventListener("click", clickIndicator.bind(null, i));

            carousel.nextElementSibling.appendChild(newIndicator);
        }
        allIndicators = indicators.children;
        allIndicators[0].setAttribute("active", "true");
        allIndicators[0].setAttribute("checked", "true");
}

})();