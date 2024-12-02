import { loadImagesAsync } from "./images";

interface PaintImagesParams {
    ctx: CanvasRenderingContext2D;
    imageUrls: string[];
    arrange: "horizontal" | "vertical" | "diagonal";
}

const paintImages = async ({ ctx, imageUrls = [], arrange }: PaintImagesParams): Promise<void> => {
    const images: HTMLImageElement[] = await loadImagesAsync(imageUrls);

    let canvasWidth: number = 0;
    let canvasHeight: number = 0;

    // Calculate canvas size based on images size and arrange
    switch (arrange) {
        case "horizontal":
            canvasWidth = images.reduce((acc, image) => acc + image.width, 0);
            canvasHeight = Math.max(...images.map((image) => image.height));
            break;
        case "vertical":
            canvasWidth = Math.max(...images.map((image) => image.width));
            canvasHeight = images.reduce((acc, image) => acc + image.height, 0);
            break;
        case "diagonal":
            canvasWidth = images.reduce((acc, image) => acc + image.width, 0);
            canvasHeight = images.reduce((acc, image) => acc + image.height, 0);
            break;
        default:
            throw new Error("Invalid arrange");
    }

    // Set canvas size
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    // Paint images on ctx based on arrange
    let x: number = 0;
    let y: number = 0;

    images.forEach((image) => {
        switch (arrange) {
            case "horizontal":
                ctx.drawImage(image, x, y);
                x += image.width;
                break;
            case "vertical":
                ctx.drawImage(image, x, y);
                y += image.height;
                break;
            case "diagonal":
                ctx.drawImage(image, x, y);
                x += image.width;
                y += image.height;
                break;
        }

    });
};

export { paintImages };
