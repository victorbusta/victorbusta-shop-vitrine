export function hide(selector: string, hide: boolean, duration = 150) {
  document.querySelector(selector)?.animate([{ opacity: hide ? 0 : 1 }], {
    duration: duration,
    fill: "forwards",
  });
}

export function hideEl(el: Element, hide: boolean, duration = 150) {
  el.animate([{ opacity: hide ? 0 : 1 }], {
    duration: duration,
    fill: "forwards",
  });
}

export function resize(
  selector: string,
  width: string,
  height: string,
  duration = 150
) {
  document
    .querySelector(selector)
    ?.animate([{ width: width, height: height }], {
      duration: duration,
      fill: "forwards",
    });
}

export function rotate(selector: string, rotation: string, duration = 150) {
  document.querySelector(selector)?.animate([{ rotate: rotation }], {
    duration: duration,
    fill: "forwards",
  });
}

export function rotateEl(el: Element, rotation: string, duration = 150) {
  el.animate([{ transform: `rotateY(${rotation})` }], {
    duration: duration,
    fill: "forwards",
  });
}

export function translateX(
  selector: string,
  translation: string,
  duration = 150
) {
  document
    .querySelector(selector)
    ?.animate([{ transform: `translateX(${translation})` }], {
      duration: duration,
      fill: "forwards",
    });
}

export function translateXEl(el: Element, translation: string, duration = 150) {
  el.animate([{ transform: `translateX(${translation})` }], {
    duration: duration,
    fill: "forwards",
  });
}

export function translateY(
  selector: string,
  translation: string,
  duration = 150
) {
  document
    .querySelector(selector)
    ?.animate([{ transform: `translateY(${translation})` }], {
      duration: duration,
      fill: "forwards",
    });
}

export function translateYEl(el: Element, translation: string, duration = 150) {
  el.animate([{ transform: `translateY(${translation})` }], {
    duration: duration,
    fill: "forwards",
  });
}

export function translate(
  selector: string,
  translationX: string,
  translationY: string,
  duration = 150
) {
  document
    .querySelector(selector)
    ?.animate([{ transform: `translate(${translationX}, ${translationY})` }], {
      duration: duration,
      fill: "forwards",
    });
}

export function translateEl(
  el: Element,
  translationX: string,
  translationY: string,
  duration = 150
) {
  el.animate([{ transform: `translate(${translationX}, ${translationY})` }], {
    duration: duration,
    fill: "forwards",
  });
}

export const degToRad = (deg: number) => deg * (Math.PI / 180);

export const delay = (ms: number = 150) =>
  new Promise((resolve) => setTimeout(resolve, ms));
