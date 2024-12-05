import { loadImagesAsync } from "./images";

interface PaintImagesParams {
    ctx: CanvasRenderingContext2D;
    imageUrls: string[];
    arrange: "horizontal" | "vertical" | "diagonal";
    spacing: number;
}

const paintImages = async ({ ctx, imageUrls = [], arrange, spacing = 0 }: PaintImagesParams): Promise<void> => {

    const images: HTMLImageElement[] = await loadImagesAsync(imageUrls);

    let canvasWidth: number = 0;
    let canvasHeight: number = 0;

    // Calculate canvas size based on images size and arrange
    switch (arrange) {
        case "horizontal":
            canvasWidth = images.reduce((acc, image) => acc + image.width, (images.length - 1) * spacing);
            canvasHeight = Math.max(...images.map((image) => image.height));
            break;
        case "vertical":
            canvasWidth = Math.max(...images.map((image) => image.width));
            canvasHeight = images.reduce((acc, image) => acc + image.height, (images.length - 1) * spacing);
            break;
        case "diagonal":
            canvasWidth = images.reduce((acc, image) => acc + image.width, (images.length - 1) * spacing);
            canvasHeight = images.reduce((acc, image) => acc + image.height, (images.length - 1) * spacing);
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
                x += image.width + spacing;
                break;
            case "vertical":
                ctx.drawImage(image, x, y);
                y += image.height + spacing;
                break;
            case "diagonal":
                ctx.drawImage(image, x, y);
                x += image.width + spacing;
                y += image.height + spacing;
                break;
        }
    });
};

export { paintImages };
