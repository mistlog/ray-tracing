/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Surface Normals
 * 
 * > First, let’s get ourselves a surface normal so we can shade. This is a vector that is perpendicular to the surface, and by convention, points out. 
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Surface Normals and Multiple Objects](https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects).
 * 
 * ### Hit sphere
 * 
 */

//#region -c todo

/**
 * bug of three.js: result of Ray.intersectSphere is wrong
 */

//#endregion
function HitSphere(center: Vector3, radius: number, ray: Ray) {
    /**
     *
     * <<v:custom-image fig-1-06-1.jpg https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects>>
     * 
     * For a sphere, the normal is in the direction of the hitpoint minus the center.
     * 
     * oc: origin to center
     * 
     */
    const oc = ray.origin.clone().sub(center);

    /**
     * To get points of intersection, we need to solve the [quadratic equation](https://raytracing.github.io/books/RayTracingInOneWeekend.html#addingasphere):
     * 
     * $$ \begin{cases}A & \text{origin}\\B & \text{direction} \\C & \text{center} \\ t & \text{distance from origin to intersection}\end{cases}$$
     * 
     * $$t^2 \cdot dot(B,B) + 2t \cdot dot(B,A-C) + dot(A-C,A-C) - R^2 = 0$$
     */
    const a = ray.direction.dot(ray.direction);
    const b = 2.0 * oc.dot(ray.direction);
    const c = oc.dot(oc) - radius * radius;

    /**
     * <<v:custom-image fig-1-05-1.jpg https://raytracing.github.io/images/fig-1-05-1.jpg>>
     * 
     * Let’s assume the closest hit point (smallest t):
     */
    const Δ = b * b - 4 * a * c;
    if (Δ < 0) {
        return null;
    }
    return (-b - Math.sqrt(Δ)) / (2.0 * a);
}

/**
 * 
 * ### Generate color
 */
function GenerateColor(ray: Ray, hitSphere: (center: Vector3, radius: number, ray: Ray) => number | null) {
    //#region -c setup sphere
    const center = new Vector3(0, 0, 1);
    const radius = 0.5;
    //#endregion
    const intersection = hitSphere(center, radius, ray);
    if (intersection != null) {

        /**
         * > Let’s just visualize the normals with a color map. A common trick used for visualizing normals (because it’s easy and somewhat intuitive to assume N is a unit length vector — so each component is between −1 and 1) is to map each component to the interval from 0 to 1, and then map x/y/z to r/g/b.
         * 
         * To get the same color as that in [Ray Tracing In One Weekend](https://raytracing.github.io/images/img-1-06-1.jpg), we need to deal with coordinate conversion:
         * $y$ -> $-y$ and $z$ -> $-z$.
         * 
         */
        const normal = ray
            .at(intersection, new Vector3())
            .sub(center)
            .normalize();
            
        return new Vector3(
            0.5 * (normal.x + 1),
            0.5 * (-normal.y + 1),
            0.5 * (-normal.z + 1)
        );
    }

    //#region -c normal previous work
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
 * <<v:illustrator normal 100% 400px>>
 * 
 */

//#region -c normal trivial setup

//#region -c normal imports
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