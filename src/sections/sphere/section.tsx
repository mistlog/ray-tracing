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
 * # Adding a Sphere
 * 
 * > Let’s add a single object to our ray tracer. People often use spheres in ray tracers because calculating whether a ray hits a sphere is pretty straightforward. 
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Adding a Sphere](https://raytracing.github.io/books/RayTracingInOneWeekend.html#addingasphere).
 * 
 * ### Hit sphere
 * 
 * Instead of doing math all by ourselves, we can use [three.js](https://threejs.org/docs/index.html#api/en/math/Ray.intersectsSphere):
 */

function HitSphere(center: Vector3, radius: number, ray: Ray) {
    const sphere = new Sphere(center, radius);
    return ray.intersectsSphere(sphere);
}

/**
 * ### Generate color
 */
function GenerateColor(ray: Ray, hitSphere: (center: Vector3, radius: number, ray: Ray) => boolean) {
    /**
     * What we do in adding a new object is coloring the intersection of ray and this object: 
     */
    const center = new Vector3(0, 0, 1);
    const radius = 0.5;
    if (hitSphere(center, radius, ray)) {
        const red = new Vector3(1, 0, 0);
        return red;
    }

    //#region -c sphere previous work
    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;
}

/**
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray) => Vector3) {
    const topLeftCorner = new Vector3(-2, -1, 1);
    const horizontal = new Vector3(4, 0, 0);
    const vertical = new Vector3(0, 2, 0);
    const origin = new Vector3(0, 0, 0);

    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {

            const u = x / width;
            const v = y / height;
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

//#endregion

/**
 * ## Result
 * 
 * <<v:illustrator sphere 100% 400px>>
 * 
 */

//#region -c sphere trivial setup

//#region -c sphere imports
import { onMount } from 'svelte';
import { Vector3, Ray, Sphere } from 'three';
//#endregion

export default function Section() {
    let canvas: HTMLCanvasElement;
    onMount(() => {
        function hitSphere(center: Vector3, radius: number, ray: Ray) {
            //@ts-ignore
            <HitSphere />;
        }

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