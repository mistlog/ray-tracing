/**
 * ---
 * {
 *  "visualizers": [
 *      {
 *          "path": "./src/visualizers/visualizer.ts"
 *      }
 *  ]
 * }
 * ---
 * 
 * # Output an Image
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Output an Image](https://raytracing.github.io/books/RayTracingInOneWeekend.html#outputanimage).
 * 
 * Instead of using `ppm` file, we can use canvas directly in javascript world. (pay attention to the canvas coordinate space) 
 *
 * [![](../../../images/canvas-default-grid.png)][Webpack]
 * 
 * [Webpack]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
 * 
 */
function RenderImage(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const width = canvas.width;
    const height = canvas.height

    /**
     * imageData is an array of rgba values:
     */
    const imageData = context.getImageData(0, 0, width, height);
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            /**
             * we multiply 4 because the layout of rgba values in imageData is: 
             * 
             * [r,g,b,a], [r,g,b,a], [r,g,b,a], ....
             * 
             * [r,g,b,a], [r,g,b,a], [r,g,b,a], ....
             * 
             * [r,g,b,a], [r,g,b,a], [r,g,b,a], ....
             * 
             * [r,g,b,a], [r,g,b,a], [r,g,b,a], ....
             * 
             */
            const n = (y * width + x) * 4;

            /**
             * n: the base address of nth pixel
             */
            imageData.data[n] = (x / width) * 255;
            imageData.data[n + 1] = (y / height) * 255;
            imageData.data[n + 2] = 0.2 * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

/**
 * ## Result
 * 
 * <<v:illustrator output-an-image 100% 400px>>
 * 
 */

//#region -c output-an-image trivial setup

//#region -c output-an-image imports
import { onMount } from 'svelte';
//#endregion

export default function Section() {
    let canvas: HTMLCanvasElement;

    //@ts-ignore
    onMount(() => {
        const context = canvas.getContext('2d');

        function onRender(time?: number) {
            //@ts-ignore
            <RenderImage />;
        }

        onRender();
    });

    let width = 600;
    let height = 300;

    <div class="container">
        <canvas bindRef={canvas} width={width} height={height}></canvas>
    </div>
}
//#endregion