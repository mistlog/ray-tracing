/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Antialiasing
 * 
 * > When a real camera takes a picture, there are usually no jaggies along edges because the edge pixels are a blend of some foreground and some background. We can get the same effect by averaging a bunch of samples inside each pixel.
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Antialiasing](https://raytracing.github.io/books/RayTracingInOneWeekend.html#antialiasing).
 *
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World) => Vector3) {

//#region -c antialiasing render image setup
    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100));

    const camera = new Camera();

    //#endregion

    /**
     */
    const samples = 50;

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            /**
             * For a given pixel we have several samples within that pixel:
             */
            const color = new Vector3(0, 0, 0);
            for (let k = 0; k < samples; ++k) {

                /**
                 * Send rays through each of the samples:
                 * 
                 * [![](../../../images/fig-1-07-1.jpg)][Samples]
                 * 
                 * [Samples]: https://raytracing.github.io/images/fig-1-07-1.jpg
                 * 
                 */
                const u = (x + Math.random()) / width;
                const v = (y + Math.random()) / height;
                const ray = camera.getRay(u, v);

                /**
                 * The colors of these rays are then averaged:
                 */
                color.add(generateColor(ray,world));
            }
            color.divideScalar(samples);

//#region -c antialiasing paint

            const n = (y * width + x) * 4;
            imageData.data[n] = color.x * 255;
            imageData.data[n + 1] = color.y * 255;
            imageData.data[n + 2] = color.z * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

//#endregion

/**
 * ## Result
 *
 * With antialiasing:
 * 
 * <<v:illustrator antialiasing 100% 400px>>
 * 
 * Without antialiasing:
 * 
 * <<v:illustrator multiple-objects 100% 400px>>
 * 
 */

//#region -c antialiasing trivial setup

//#region -c antialiasing imports
import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../../common/world.js';
import { Sphere } from '../../common/sphere.js';
import { Camera } from '../../common/camera.js';
//#endregion

//#region -c antialiasing generate color

function GenerateColor(ray: Ray, world: World) {
    const record = world.hit(ray, { min: 0, max: Number.MAX_SAFE_INTEGER });
    if (record) {
        const { normal } = record;
        return new Vector3(
            0.5 * (normal.x + 1),
            0.5 * (-normal.y + 1),
            0.5 * (-normal.z + 1)
        );
    }

    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;
}

//#endregion

export default function Section() {
    let canvas: HTMLCanvasElement;

    onMount(() => {
        function generateColor(ray: Ray, world: World) {
            //@ts-ignore
            <GenerateColor />;
        };

        //@ts-ignore
        <RenderImage />;
    });

    let width = 600;
    let height = 300;

    <div class="container">
        <canvas bindRef={canvas} width={width} height={height}></canvas>
    </div>
}
//#endregion