const FADE = "fade"; /** @constant */
const NORMAL = "default"; /** @constant */
const FADE_CAROUSEL_ACTIVE_ELEMENT = "fadeCarouselActiveElement"; /** @constant */
const FADE_CAROUSEL_ELEMENT = "fadeCarouselElement";  /** @constant */
const FADE_CAROUSEL = "fadeCarousel"; /** @constant */
const DEFAULT_CAROUSEL = "defaultCarousel"; /** @constant */
const DEFAULT_CAROUSEL_ELEMENT = "defaultCarouselElement";  /** @constant */
const CAROUSEL_ITEM = ".carousel-item"; /** @constant */
const INDICATORS = ".indicators"; /** @constant */
const INDICATOR = "indicators-item"; /** @constant */
const COMPUTED_MARGIN = 23;  /** @constant */

function clickIndicator(index) {
    for(let i = 0; i < this.allIndicators.length; i++) {
        this.allIndicators[i].setAttribute("active", "false");
        this.allIndicators[i].setAttribute("checked", "false");
    }

    this.allIndicators[index].setAttribute("active", "true");
    this.allIndicators[index].setAttribute("checked", "true");
    switchSlide.bind(this,index)();
}

function switchSlide(index) {
    if (index === this.slideCount) {
        if (this.animationType === FADE) {
            this.allCarouselImage[this.slideIndex-1].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
        } else {
            this.firstCarouselImage.style.marginLeft = COMPUTED_MARGIN + (-(index - 1) * (this.width+5)) + "px";
        }
    } else {
        if (index === -1) {
            if (this.animationType === FADE) {
                this.allCarouselImage[0].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
            } else {
                this.firstCarouselImage.style.marginLeft = 0 + "px";
            }
        } else {
            if (this.animationType === FADE) {
                this.allCarouselImage[index].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
            } else {
                this.firstCarouselImage.style.marginLeft = COMPUTED_MARGIN + (-(index) * (this.width+5)) + "px";
            }
        }
    }
}

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


function Carousel () {
    this.slideIndex = 0;

    let startingX;
    let endingX;
    /**Add background-image to our carousel items, text and link to buttons
     *
     * @param {array} SLIDES
     */

    this.setSlides = function(SLIDES) {
        for (let i = 0; i<SLIDES.length; i++) {
            let item = this.createCarouselItem();
            item.querySelector(".item-image").style.backgroundImage = "url(" + SLIDES[i].src + ")";
            item.querySelector(".item-image").style.backgroundSize = "cover";
            item.querySelector(".item-name").innerText = SLIDES[i].name;
            item.querySelector(".item-author").lastElementChild.innerText = SLIDES[i].author;
            item.querySelector(".item-upload-date").lastElementChild.innerText = SLIDES[i].date;
            item.querySelector(".item-count-view").lastElementChild.innerText = SLIDES[i].views;
            item.querySelector(".item-description").innerText = SLIDES[i].description;

            this.carousel.appendChild(item);
        }
        this.allCarouselImage = this.carousel.querySelectorAll(CAROUSEL_ITEM );
        this.slideCount = this.allCarouselImage.length;

        this.firstCarouselImage = this.carousel.querySelector(CAROUSEL_ITEM);
        this.indicators = this.carousel.nextElementSibling;

        this.allCarouselImage.forEach( item => {
            item.classList.add(DEFAULT_CAROUSEL_ELEMENT);
        });
        this.carousel.classList.add(DEFAULT_CAROUSEL);
    }

    this.setIndicators = function() {
        for (let i = 0; i<Math.round(this.slideCount/4); i++) {
            let newIndicator = document.createElement("div");

            newIndicator.setAttribute("class", INDICATOR);
            newIndicator.setAttribute("name", INDICATOR);
            newIndicator.innerHTML = `${1+i}`;
            newIndicator.setAttribute("checked", "false");
            newIndicator.addEventListener("click", clickIndicator.bind(this, i));

            this.indicators.appendChild(newIndicator);
        }
        this.allIndicators = this.indicators.children;
        this.allIndicators[0].setAttribute("active", "true");
        this.allIndicators[0].setAttribute("checked", "true");
    }

    /**Function, which init carousel actions
     *
     * @param {number} time -setInterval time
     * @param {string} animation - type of Animation (normal or fade)
     */
    this.play = function(time, animation) {
        if(this.slideIndex >= Math.round(this.slideCount/4) || this.slideIndex < 0) {
            this.slideIndex = 0;
        }

        /**Depend on animation type, add classes to items and carousel divs*/
        if(carouselProperties.animation === FADE) {
            this.allCarouselImage.forEach( item => {
                item.classList.add(FADE_CAROUSEL_ELEMENT);
            });
            this.allCarouselImage[this.slideIndex].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
            this.carousel.classList.add(FADE_CAROUSEL);
        } else {
            this.allCarouselImage.forEach( item => {
                item.classList.add(DEFAULT_CAROUSEL_ELEMENT);
            });
            this.carousel.classList.add(DEFAULT_CAROUSEL);
        }

        var timerID = setInterval(showNextSlide.bind(this), time);
        this.timerTime = time;
        this.animationType = animation || NORMAL;
        this.timer = timerID;
    }

    /**Function, which spot carousel actions, delete classes and appropriate fields*/
    this.stop = function() {
        if (this.animationType === FADE) {
            this.allCarouselImage.forEach( item => {
                item.classList.remove(FADE_CAROUSEL_ELEMENT);
                if(item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT))
                    item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
            this.carousel.classList.remove(FADE_CAROUSEL);
        } else {
            this.allCarouselImage.forEach( item => {
                item.classList.remove(DEFAULT_CAROUSEL_ELEMENT);
            });
            this.carousel.classList.remove(DEFAULT_CAROUSEL);
        }

        if(!this.timer) {
            console.log("Carousel is not playing");
        } else {
            clearInterval(this.timer);
            delete this.timer;
            delete this.animationType;
        }
        this.slideIndex--;
    }

    /** Delete carousel from DOM, clear memory, delete timer, remove addEventListeners
     */
    this.destroy = function() {
        clearInterval(this.timer);
        this.carousel.removeEventListener("touchstart", touchStart.bind(this));
        this.carousel.removeEventListener("touchmove", touchMove.bind(this));
        this.carousel.removeEventListener("touchend", touchEnd.bind(this));
        this.carousel.parentNode.removeChild(this.carousel);
        for (let key in this) {
            delete this[key];
        }
    }

    /**Switch carousel slide to the next, if animation is fade - change opacity, else change margin.
     *Use this function in setInterval
     */
    function showNextSlide() {
        if ((this.slideIndex >=  Math.round(this.slideCount/4)) || (this.slideIndex < 0)) {
            this.slideIndex = 0;
        }

        if (this.animationType === FADE) {
            this.allCarouselImage.forEach( item => {
                if(item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT))
                    item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
            this.allCarouselImage[this.slideIndex].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
        } else {
            this.firstCarouselImage.style.marginLeft = (-this.slideIndex * (this.width+5)) + COMPUTED_MARGIN + "px";
        }

        this.slideIndex++;
    }

    /**
     Find the coordinates of touching
     */
    function touchStart(event) {
        startingX = event.changedTouches[0].clientX;
        clearInterval(this.timer);
    }

    /**Change the image margin, depend on out moves(to the left or to the right)*/
    function touchMove(event) {
        if (this.animationType !== FADE) {
            var touch = event.changedTouches[0];
            var change = startingX - touch.clientX;

            this.firstCarouselImage.style.marginLeft = -change + "px";
        }
    }

    /**
     Find the coordinates of end of pressing, depend on this, switch the image to the next, or to the previous
     */
    function touchEnd(event) {
        endingX = event.changedTouches[0].clientX;
        let touchedElement = event.target;
        let index;

        /**Find element, which was touched*/
        while (touchedElement.parentNode !== this.carousel) {
            touchedElement = touchedElement.parentNode;
        }

        removeActiveClassFromFadeElement.bind(this)();

        index = findIndex.bind(this, startingX, endingX, touchedElement)();

        /**
         Find the image, which must be showed next, if it's index more, than slideCount, show first image
         *Check the animation type, if fade - change opacity, other case-change margin
         */
        switchSlide.bind(this, index)();

        this.play(this.timerTime, this.animationType);
    }

    /** Find index of element, which we will show
     *
     * @param {number} startingX -coordinates of touchstart
     * @param {number} endingX -coordinates of touckend
     * @param {object} touchedElement -carouselElement, that was touched
     *
     * @return {number} index -index of carousel Element in allCarouselImage
     */
    function findIndex(startingX, endingX, touchedElement) {

        if (startingX - endingX > 0) {
            this.slideIndex++;
            return Math.round(Array.prototype.indexOf.call( this.allCarouselImage, touchedElement) / 4) + 1;

        } else {
            if (startingX - endingX === 0) {
                return  Math.round(Array.prototype.indexOf.call( this.allCarouselImage, touchedElement) / 4);
            } else {
                this.slideIndex--;
                return  Math.round(Array.prototype.indexOf.call( this.allCarouselImage, touchedElement) / 4) - 1;
            }
        }
        console.log(this.slideIndex);
    }

    /** Delete .fade-carousel-active-element from previously showed item
     */
    function removeActiveClassFromFadeElement() {
        if (this.animationType === FADE) {
            this.allCarouselImage.forEach( item => {
                if(item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT))
                    item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
        }
    }

    /** Switch the element (next or previous, depend on animation type)
     *
     * @param {number} index -index of element, which need to be shown
     */

    this.setSlides(SLIDES);
    this.setIndicators();

    if (this.timerTime) {
        this.play(this.timerTime, carouselProperties.animation);
        this.slideIndex++;
    }

    /**
     Add Touch Listeners
     */
    this.carousel.addEventListener("touchstart", touchStart.bind(this));
    this.carousel.addEventListener("touchmove", touchMove.bind(this));
    this.carousel.addEventListener("touchend", touchEnd.bind(this));
};

function request(car) {
    let input = document.querySelector('.search-input');
    let str = input.value;

    for(let i = 0; i < car.allCarouselImage.length; i++ ) {
        car.carousel.removeChild(car.carousel.firstElementChild);
    }
    console.log(car.carousel);
    if(str != "") {
        var x = new XMLHttpRequest();
        x.open('GET', ' https://www.googleapis.com/youtube/v3/search?key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&type=video&part=snippet&maxResults=8&q=' + str, false);
        x.send();
        if (x.status != 200) {
            console.log( x.status + ': ' + x.statusText );
        } else {
            let slides = JSON.parse(x.responseText);

            if(slides.items.length === 0) {
                console.log( "No such videos ");
            } else {
                fillResultItems(car, slides);
            }
        }
    }
}

function fillResultItems(car, slides) {

    [].forEach.call(slides.items, function(item, i) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=' + item.id.videoId + '&key=AIzaSyDMK9IG4eBAXFomDmKD-rWIN-X5I72zCwM&part=snippet,statistics', false);
        x.send();
        var result =  JSON.parse(x.responseText).items[0];
        var element = car.createCarouselItem();
        element.querySelector(".item-image").style.backgroundImage = "url(" + result.snippet.thumbnails.medium.url + ")";
        element.querySelector(".item-image").style.backgroundSize = "cover";
        element.querySelector(".item-name").innerText =  result.snippet.title;
        element.querySelector(".item-author").lastElementChild.innerText = result.snippet.channelTitle;
        element.querySelector(".item-upload-date").lastElementChild.innerText = result.snippet.publishedAt.slice(0, 10);
        element.querySelector(".item-count-view").lastElementChild.innerText = result.statistics.viewCount;
        element.querySelector(".item-description").innerText =  result.snippet.description;
        car.carousel.appendChild(element);
    });
    car.allCarouselImage = car.carousel.children;
    for (let i = 0; i < car.indicators.length; i++) {
        car.indicators.removeChild(car.indicators.firstElementChild);
    }
    console.log(car.indicators);
        for (let i = 0; i<Math.round(car.allCarouselImage.length/4); i++) {
            let newIndicator = document.createElement("div");

            newIndicator.setAttribute("class", "indicators-item");
            newIndicator.setAttribute("name",  "indicators-item");
            newIndicator.innerHTML = `${1+i}`;
            newIndicator.setAttribute("checked", "false");
            newIndicator.addEventListener("click", clickIndicator.bind(car, i));

            car.carousel.nextElementSibling.appendChild(newIndicator);
        }
        car.allIndicators = car.indicators.children;
        car.allIndicators[0].setAttribute("active", "true");
        car.allIndicators[0].setAttribute("checked", "true");
}

(function () {
    var SLIDES = [
        {
            src: 'images/1.jpg',
            name: 'LOVE$ROMANSE',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/2.jpg',
            name: 'LOVE$ROMANSE',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/3.jpg',
            name: 'LOVE$ROMANSE',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        },
        {
            src: 'images/4.jpg',
            name: 'LOVE$ROMANSE',
            author: 'SHOP NOW!',
            date: '',
            views: "452556",
            description: "sdkgushdiguhsdigh"
        }
    ]

    var carousel = document.querySelector("#carousel");
    var searchButton = document.querySelector('.search-button');
    var searchInput = document.querySelector('.search-input');
    searchButton.addEventListener("click", request.bind(null, carousel));
    searchInput.onkeypress = function(e){
        if(e.keyCode == 13){
            request.bind(null, carousel)();
        }
    };
})();
