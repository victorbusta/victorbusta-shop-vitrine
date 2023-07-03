export default {
  inserted: function (el: HTMLImageElement) {
    const img = el;
    const lazyLoadingSupported = 'loading' in HTMLImageElement.prototype;

    if (lazyLoadingSupported) {
      img.setAttribute('loading', 'lazy');
    } else {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load the image
            img.src = img.dataset.src ?? '';
            observer.unobserve(img);
          }
        });
      });

      observer.observe(img);
    }
  }
};
