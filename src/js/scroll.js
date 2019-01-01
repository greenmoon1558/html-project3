class Scroll {
  constructor(scroll) {
    this.element = scroll;
    this.elementHeight = scroll.clientHeight;
    this.windowHeight = window.innerHeight;
    this.init();
  }
  init() {
    if (!this.inView())
      document.addEventListener("scroll", this.animate.bind(this));
    else this.animate.apply(this);
  }
  inView() {
    if (
      this.element.getBoundingClientRect().top - this.windowHeight <= 0 &&
      this.element.getBoundingClientRect().bottom >= 0
    ) {
      return true;
    }

    return false;
  }
  animate() {
    if (this.inView()) {
      this.element.classList.add("animate");
    } else if (this.element.classList.contains("animate")) {
      this.element.classList.remove("animate");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let elementsWithAnimation = [
    ...document.querySelectorAll(".wait-for-animate")
  ];
  elementsWithAnimation.forEach(item => new Scroll(item));
});
