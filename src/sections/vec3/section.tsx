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
 * # The vec3 Class
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: The vec3 Class](https://raytracing.github.io/books/RayTracingInOneWeekend.html#thevec3class).
 *
 */

//#region -c vec3 previous work
function RenderImage(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const width = canvas.width;
    const height = canvas.height

    const imageData = context.getImageData(0, 0, width, height);
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
//#endregion
/**
 */
            /**
             * Instead of implementing vector class from scratch, we will use `Vector3` from [three.js](https://threejs.org/docs/index.html#api/en/math/Vector3).
             */
            const v = new Vector3(x / width, y / height, 0.2);
            /**
             * Recreate the image in the [previous](../output-an-image/section.html) example using `v`:
             */
            const n = (y * width + x) * 4;
            imageData.data[n] = v.x * 255;
            imageData.data[n + 1] = v.y * 255;
            imageData.data[n + 2] = v.z * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

/**
 * ## Result
 * 
 * <<v:illustrator vec3 100% 400px>>
 * 
 */

//#region -c vec3 trivial setup

//#region -c vec3 imports
import { onMount } from 'svelte';
import { Vector3, Ray, Sphere } from 'three';
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