/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {
 *          "path": "./src/visualizers/visualizer.ts"
 *      }
 *  ]
 * }
 * ---
 * # Rays, a Simple Camera, and Background
 * 
 *
 * > At the core of a ray tracer is to send rays through pixels and compute what color is seen in the direction of those rays. This is of the form calculate which ray goes from the eye to a pixel, compute what that ray intersects, and compute a color for that intersection point.
 * > 
 * > [4. Rays, a Simple Camera, and Background](https://raytracing.github.io/books/RayTracingInOneWeekend.html#rays,asimplecamera,andbackground)
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Rays, a Simple Camera, and Background](https://raytracing.github.io/books/RayTracingInOneWeekend.html#rays,asimplecamera,andbackground).
 *
 * <<v:illustrator scan-sky 100% 550px>>
 *
 * In this demo, the red point is the eye, and the color of point in the plane is determined by the y-coordinate.
 * 
 * ### Generate color
 */

function GenerateColor(ray: Ray) {
    /**
     * Get unit vector in the same direction:
     */
    const unitDirection = ray.direction.clone().normalize();
    
    /**
     * Scale y to [0,1]:
     */
    const t = 0.5 * (unitDirection.y + 1);

    /**
     * A lerp is always of the form:
     * 
     * $$blendedValue = (1-t)*startValue + t*endValue$$
     * 
     * <<v:illustrator color-lerp 100% 325px>>
     * 
     */
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;
}

/**
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray) => Vector3) {

    /**
     * 
     * [![](../../../images/fig-1-04-2.jpg)][CoordinateSpace]
     * 
     * [CoordinateSpace]: https://raytracing.github.io/images/fig-1-04-2.jpg
     * 
     * The coordinate space we use is different from original one, we traverse the screen from the top left and have the y-axis go down, thus to respect the convention of a right handed coordinate system, into the screen is the positive z-axis.
     * 
     */
    const topLeftCorner = new Vector3(-2, -1, 1);
    const horizontal = new Vector3(4, 0, 0);
    const vertical = new Vector3(0, 2, 0);
    const origin = new Vector3(0, 0, 0);

    //#region -c ray previous work
    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {

            const u = x / width;
            const v = y / height;
    //#endregion
/**
 */
            /**
             * $$direction = topLeftCorner + u*horizontal + v*vertical$$
             */
            const direction = topLeftCorner.clone()
                .addScaledVector(horizontal, u)
                .addScaledVector(vertical, v);
            
            const ray = new Ray(origin, direction);
            const color: Vector3 = generateColor(ray);

            const n = (y * width + x) * 4;
            imageData.data[n] = color.x * 255;
            imageData.data[n + 1] = color.y * 255;
            imageData.data[n + 2] = color.z * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

/**
 * ## Result
 * 
 * <<v:illustrator ray 100% 400px>>
 * 
 */

//#region -c ray trivial setup

//#region -c ray imports
import { onMount } from 'svelte';
import { Vector3, Ray, Sphere } from 'three';
//#endregion

export default function Section() {
    let canvas: HTMLCanvasElement;
    onMount(() => {

        function generateColor(ray: Ray) {
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