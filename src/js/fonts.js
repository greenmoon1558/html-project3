import FontFaceObserver from "fontfaceobserver";
let fonts = () => {
  let merriweather = new FontFaceObserver("Merriweather", {
      width: 300,
      style: "italic"
    }),
    pompiere = new FontFaceObserver("Pompiere"),
    openSans = new FontFaceObserver("Open Sans"),
    dosis = new FontFaceObserver("Dosis SemiBold", { style: 600 }),
    ostrichSans = new FontFaceObserver("Ostrich Sans", { style: 600 }),
    helvetica = new FontFaceObserver("Helvetica"),
    nirmala = new FontFaceObserver("Nirmala UI"),
    myriad = new FontFaceObserver("Myriad Pro"),
    myriadSemibold = new FontFaceObserver("Myriad Pro Semibold", {
      style: 600
    }),
    bankGothic = new FontFaceObserver("Bank Gothic"),
    zurich = new FontFaceObserver("Zurich"),
    neoteric = new FontFaceObserver("NEOTERIC");
 
  let timer = time => {
    return new Promise(function(resolve, reject) {
      setTimeout(reject, time);
    });
  };
  let fontTimer = fonts => {
    return fonts.map(font => Promise.race([timer(5000), font.load()]));
  };

 // if (!sessionStorage.fontsLoaded)
    Promise.all(
      fontTimer([
        myriad,
        zurich,
        bankGothic,
        myriadSemibold,
        merriweather,
        dosis,
        ostrichSans,
        helvetica
      ])
    )
      .then(function() {
        Promise.all(fontTimer([openSans, nirmala, pompiere, neoteric])).then(() => {
          sessionStorage.fontsLoaded = true;
        });
      })
      .catch(function(e) {
        sessionStorage.fontsLoaded = false;
      })
      .then(() => {
        let fontsHidden = document.querySelectorAll(".js-fonts--hide");

        fontsHidden.forEach(elment => {
          elment.classList.remove("js-fonts--hide");
        });
      });
};
//document.addEventListener("DOMContentLoaded", () => {
  fonts();
//});
