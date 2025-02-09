export const closest = (el: HTMLElement | EventTarget | null, className: string) => {
  let tmp: HTMLElement | null = el as HTMLElement;
  while (tmp != null) {
    if (tmp.classList.contains(className)) {
      return tmp;
    }
    tmp = tmp.parentElement;
  }
  return tmp;
};

export const hasClass = (el: HTMLElement | EventTarget | null, className: string) => {
  return (el as HTMLElement).classList.contains(className);
};

export const addClass = (el: HTMLElement | EventTarget | null, className: string) => {
  if (!(el as HTMLElement).classList.contains(className)) {
    (el as HTMLElement).classList.add(className);
  }
};

export const removeClassAll = (className: string) => {
  document.body.querySelectorAll('.' + className).forEach((el) => {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  });
};

export const removeClass = (el: HTMLElement | EventTarget | NodeListOf<HTMLElement> | null, className: string) => {
  if (el instanceof HTMLElement) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  } else {
    (el as NodeListOf<HTMLElement>).forEach((ele) => {
      if (ele.classList.contains(className)) {
        ele.classList.remove(className);
      }
    });
  }
};
