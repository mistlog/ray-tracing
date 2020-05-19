import { onMount } from 'svelte';
import { PlotData, Layout } from 'plotly.js';
import { Vector3, Ray } from 'three';

enum Trace {
    Pixel,
    Ray
}

export default function App() {

    // the id of html element we render to
    const illustrationID = "illustration";

    function* getColorGenerator() {
        //
        const width = 200;
        const height = 100;

        //
        const topLeftCorner = new Vector3(-2, -1, 1);
        const horizontal = new Vector3(4, 0, 0);
        const vertical = new Vector3(0, 2, 0);
        const origin = new Vector3(0, 0, 0);

        function getColor(ray: Ray) {
            const unitDirection = ray.direction.clone().normalize();
            const t = 0.5 * (unitDirection.y + 1);
            const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
            return blend;
        }

        const step = 10;
        for (let x = 0; x < width; x += step) {
            for (let y = 0; y < height; y += step) {
                //
                const n = y * width + x;

                //
                const u = x / width;
                const v = y / height;

                const direction = topLeftCorner.clone()
                    .addScaledVector(horizontal, u)
                    .addScaledVector(vertical, v);

                const ray = new Ray(origin, direction);
                const color = getColor(ray);

                //
                yield { pos: { x, y, z: 1, n }, color: `rgb(${color.x * 255},${color.y * 255},${color.z * 255})` };
            }
        }
    }

    let colorGenerator = getColorGenerator();
    let frameID = null;
    function resetPlot() {
        cancelAnimationFrame(frameID);
        colorGenerator = getColorGenerator();
        const div = document.getElementById(illustrationID) as HTMLDivElement & { data: Array<Partial<PlotData>> };
        const data = div.data;

        data[Trace.Pixel].x = [];
        data[Trace.Pixel].y = [];
        data[Trace.Pixel].z = [];
        data[Trace.Pixel].marker.color = [];

        //
        data[Trace.Ray].x[1] = null;
        data[Trace.Ray].y[1] = null;
        data[Trace.Ray].z[1] = null;
        globalThis.Plotly.redraw(illustrationID);
    }

    function updatePlot() {
        const next = colorGenerator.next().value;
        if (next) {
            // retrieve data from illustration
            const div = document.getElementById(illustrationID) as HTMLDivElement & { data: Array<Partial<PlotData>> };
            const data = div.data;

            // update plot ref: https://community.plot.ly/t/what-is-the-most-performant-way-to-update-a-graph-with-new-data/639
            const { pos, color } = next;
            const { x, y, z, n } = pos;
            data[Trace.Pixel].x[n] = x;
            data[Trace.Pixel].y[n] = y;
            data[Trace.Pixel].z[n] = z;
            data[Trace.Pixel].marker.color[n] = color;

            //
            data[Trace.Ray].x[1] = x;
            data[Trace.Ray].y[1] = y;
            data[Trace.Ray].z[1] = z;
            globalThis.Plotly.redraw(illustrationID);
            frameID = requestAnimationFrame(updatePlot);
        }
    }

    onMount(() => {
        //@ts-ignore
        <HandleCreatePlot />;
    });

    <div class="container">
        <button onClick={() => {
            resetPlot();
            requestAnimationFrame(updatePlot);
        }}>
            Start
        </button>
        <div id={illustrationID}></div>
    </div>
}

function HandleCreatePlot(position: number, illustrationID: string) {
    //
    const data = [];
    const pixelTrace: Partial<PlotData> = {
        type: 'scatter3d',
        mode: 'markers',
        name: "pixels",
        x: [],
        y: [],
        z: [],
        marker: {
            size: 5,
            color: [],
            colorscale: "Greens"
        },

    }
    data[Trace.Pixel] = pixelTrace;

    //
    const rayTrace: Partial<PlotData> = {
        type: 'scatter3d',
        mode: 'lines+markers',
        name: 'ray',
        x: [100],
        y: [50],
        z: [0],
        line: {
            width: 2,
            color: ["#f00", "#00f"]
        },
        marker: {
            size: 2,
            color: ["#f00", "#00f"],
            colorscale: "Greens",
        }
    }
    data[Trace.Ray] = rayTrace;

    // config the camera
    const layout: Partial<Layout> = {
        scene: {
            camera: {
                up: { x: 0, y: 0, z: 1 },
                center: { x: 0, y: 0, z: 0 },
                eye: { x: 0.012768344414103178, y: -1.5118330938936242, z: -3.17011334634797 }
            }
        }
    }

    // example ref: https://plot.ly/javascript/3d-line-plots/
    globalThis.Plotly.newPlot(illustrationID, data, layout);
}