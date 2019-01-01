import throttle from "./throttle";

class Slider {
  constructor(slider) {
    this.sliderContainer = slider.querySelector(".slider__wrapper");
    this.blocks = [...this.sliderContainer.children];
    this.slidesCount = this.blocks.length;
    this.displacement = 100;
    this.peas = [...slider.querySelectorAll(".pea")];
    this.arrows = [...slider.querySelectorAll(".slider__btn")];
    this.peas.forEach(
      (item, i) => (item.onclick = throttle(() => this.clickPea(i), 100))
    );
    this.arrows.forEach(
      (item, i) => (item.onclick = throttle(() => this.click(i), 100))
    );
    this.sliderContainer.addEventListener(
      "touchstart",
      throttle(this.touchstart.bind(this))
    );
    this.sliderContainer.addEventListener(
      "touchmove",
      throttle(this.touchmove.bind(this))
    );
    document.addEventListener(
      "touchend",
      throttle(this.touchend.bind(this))
    );
    window.addEventListener("resize", this.init.bind(this));
    this.init();
  }

  init() {
    this.current = 0;
  }
  click(dir) {
    this.current = dir ? ++this.current : --this.current;
    this.isCurrentInRange();
    this.move();
  }
  isCurrentInRange() {
    this.current =
      this.current > this.slidesCount - 1
        ? 0
        : this.current < 0
        ? this.slidesCount - 1
        : this.current;
  }
  clickPea(dir) {
    this.current = dir > this.current ? dir + this.current : dir - this.current;
    this.isCurrentInRange();
    this.move();
  }
  touchstart(e) {
    this.start = e.targetTouches[0].pageX;
  }
  touchmove(e) {
    if (this.start) {
      this.move();
    }
  }

  touchend(e) {
    if (this.start) {
      this.start = null;
      this.end = e.changedTouches[0].pageX;

      this.sliderContainer.style.transition = null;

      if (this.diff > 0 && this.diff >= this.blocks[0].offsetWidth / 2)
        this.click(0);
      else if (
        this.diff < 0 &&
        Math.abs(this.diff) >= this.blocks[0].offsetWidth / 2
      )
        this.click(1);
      else this.click(0);
    }
  }
  move() {

    let displacement = this.displacement;
    this.sliderContainer.style.transform = `translateX(-${displacement *
      this.current}%`;
    this.setPea();
  }
  setPea() {
    this.peas.forEach(el => el.classList.remove("js-pea--active"));
    this.peas[this.current].classList.add("js-pea--active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let sliders = [...document.querySelectorAll(".c-slider")];
  sliders.forEach(item => new Slider(item));
});
