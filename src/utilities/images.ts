const loadImageAsync = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

const loadImagesAsync = (srcs: string[]): Promise<HTMLImageElement[]> => {
    return Promise.all(Array.from(srcs).map(loadImageAsync));
}

export { loadImageAsync, loadImagesAsync };
