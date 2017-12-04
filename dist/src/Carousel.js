"use strict";

function Carousel(carouselProperties) {
    var FADE = "fade"; /** @constant */
    var NORMAL = "default"; /** @constant */
    var SLIDES = carouselProperties.slides; /** @constant */
    var FADE_CAROUSEL_ACTIVE_ELEMENT = "fadeCarouselActiveElement"; /** @constant */
    var FADE_CAROUSEL_ELEMENT = "fadeCarouselElement"; /** @constant */
    var FADE_CAROUSEL = "fadeCarousel"; /** @constant */
    var DEFAULT_CAROUSEL = "defaultCarousel"; /** @constant */
    var DEFAULT_CAROUSEL_ELEMENT = "defaultCarouselElement"; /** @constant */s;
    var CAROUSEL_ITEM = ".carousel-item"; /** @constant */

    this.carousel = document.querySelector(carouselProperties.id);
    this.firstCarouselImage = this.carousel.querySelector(CAROUSEL_ITEM);
    this.allCarouselImage = this.carousel.querySelectorAll(CAROUSEL_ITEM);
    this.width = this.firstCarouselImage.offsetWidth;
    this.slideCount = this.allCarouselImage.length;
    this.timerTime = carouselProperties.time;
    this.animationType = carouselProperties.animation || NORMAL;
    this.slideIndex = 0;

    var startingX = void 0;
    var endingX = void 0;

    /**Add background-image to our carousel items, text and link to buttons
     *
     * @param {array} SLIDES
     */
    this.setSlides = function (SLIDES) {
        this.allCarouselImage.forEach(function (item) {
            item.querySelector(".item-image").style.backgroundImage = "url(" + SLIDES.src + ")";
            item.querySelector(".item-name").innerText = SLIDES.name;
            item.querySelector(".item-author").lastElementChild.innerText = SLIDES.author;
            item.querySelector(".item-upload-date").lastElementChild.innerText = SLIDES.date;
            item.querySelector(".item-count-views").lastElementChild.innerText = SLIDES.views;
            item.querySelector(".description").lastElementChild.innerText = SLIDES.description;
        });
    };

    /**Function, which init carousel actions
     *
     * @param {number} time -setInterval time
     * @param {string} animation - type of Animation (normal or fade)
     */
    this.play = function (time, animation) {
        if (this.slideIndex >= this.slideCount || this.slideIndex < 0) {
            this.slideIndex = 0;
        }

        /**Depend on animation type, add classes to items and carousel divs*/
        if (carouselProperties.animation === FADE) {
            this.allCarouselImage.forEach(function (item) {
                item.classList.add(FADE_CAROUSEL_ELEMENT);
            });
            this.allCarouselImage[this.slideIndex].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
            this.carousel.classList.add(FADE_CAROUSEL);
        } else {
            this.allCarouselImage.forEach(function (item) {
                item.classList.add(DEFAULT_CAROUSEL_ELEMENT);
            });
            this.carousel.classList.add(DEFAULT_CAROUSEL);
        }

        var timerID = setInterval(showNextSlide.bind(this), time);
        this.timerTime = time;
        this.animationType = animation || NORMAL;
        this.timer = timerID;
    };

    /**Function, which spot carousel actions, delete classes and appropriate fields*/
    this.stop = function () {
        if (this.animationType === FADE) {
            this.allCarouselImage.forEach(function (item) {
                item.classList.remove(FADE_CAROUSEL_ELEMENT);
                if (item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT)) item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
            this.carousel.classList.remove(FADE_CAROUSEL);
        } else {
            this.allCarouselImage.forEach(function (item) {
                item.classList.remove(DEFAULT_CAROUSEL_ELEMENT);
            });
            this.carousel.classList.remove(DEFAULT_CAROUSEL);
        }

        if (!this.timer) {
            console.log("Carousel is not playing");
        } else {
            clearInterval(this.timer);
            delete this.timer;
            delete this.animationType;
        }
        this.slideIndex--;
    };

    /** Delete carousel from DOM, clear memory, delete timer, remove addEventListeners
     */
    this.destroy = function () {
        clearInterval(this.timer);
        this.carousel.removeEventListener("touchstart", touchStart.bind(this));
        this.carousel.removeEventListener("touchmove", touchMove.bind(this));
        this.carousel.removeEventListener("touchend", touchEnd.bind(this));
        this.carousel.parentNode.removeChild(this.carousel);
        for (var key in this) {
            delete this[key];
        }
    };

    /**Switch carousel slide to the next, if animation is fade - change opacity, else change margin.
     *Use this function in setInterval
     */
    function showNextSlide() {
        if (this.slideIndex >= this.slideCount || this.slideIndex < 0) {
            this.slideIndex = 0;
        }

        if (this.animationType === FADE) {
            this.allCarouselImage.forEach(function (item) {
                if (item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT)) item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
            this.allCarouselImage[this.slideIndex].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
        } else {
            this.firstCarouselImage.style.marginLeft = "" + -this.slideIndex * (5 + this.width) + "px";
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
        var touchedElement = event.target;
        var index = void 0;

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
            return Array.prototype.indexOf.call(this.allCarouselImage, touchedElement) + 1;
        } else {
            if (startingX - endingX === 0) {
                return Array.prototype.indexOf.call(this.allCarouselImage, touchedElement);
            } else {
                this.slideIndex--;
                return Array.prototype.indexOf.call(this.allCarouselImage, touchedElement) - 1;
            }
        }
    }

    /** Delete .fade-carousel-active-element from previously showed item
     */
    function removeActiveClassFromFadeElement() {
        if (this.animationType === FADE) {
            this.allCarouselImage.forEach(function (item) {
                if (item.classList.contains(FADE_CAROUSEL_ACTIVE_ELEMENT)) item.classList.remove(FADE_CAROUSEL_ACTIVE_ELEMENT);
            });
        }
    }

    /** Switch the element (next or previous, depend on animation type)
     *
     * @param {number} index -index of element, which need to be shown
     */
    function switchSlide(index) {
        if (index === this.slideCount) {
            if (this.animationType === FADE) {
                this.allCarouselImage[this.slideIndex - 1].classList.add(FADE_CAROUSEL_ACTIVE_ELEMENT);
            } else {
                this.firstCarouselImage.style.marginLeft = "" + -(index - 1) * (5 + this.width) + "px";
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
                    this.firstCarouselImage.style.marginLeft = "" + -index * (5 + this.width) + "px";
                }
            }
        }
    }

    if (this.timerTime) {
        this.play(this.timerTime, carouselProperties.animation);
        this.slideIndex++;
    }

    this.setSlides(SLIDES);

    /**
     Add Touch Listeners
     */
    this.carousel.addEventListener("touchstart", touchStart.bind(this));
    this.carousel.addEventListener("touchmove", touchMove.bind(this));
    this.carousel.addEventListener("touchend", touchEnd.bind(this));
};

module.exports = Carousel;