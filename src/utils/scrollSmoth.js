export const scrollSmoth = domEL => {
  const { height: cardHeight } =
    domEL.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
