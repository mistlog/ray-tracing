import { Vector3 } from 'three';

export default function App() {
    let color = new Vector3(0.5, 0.7, 1.0);
    let t = 0;
    let depth = 1;

    //@ts-ignore
    <Track />;

    const generateColor = (color: number, depth: number) => {
        return color * Math.pow(0.5, depth);
    }

    <div class="container">
        <input type="range" bindValue={t} min={0} max={1} step={0.01} />
        <div>{`t: ${t}`}</div>
        <input type="range" bindValue={depth} min={1} max={3} step={1} />
        <div>{`depth: ${depth}`}</div>
        <div>{`blended: rgb(${generateColor(color.x, depth).toFixed(2)}, ${generateColor(color.y, depth).toFixed(2)}, ${generateColor(color.z, depth).toFixed(2)})`}</div>
        <div>{`start: rgb(${0.5}, ${0.7}, ${1.0})`}</div>
        <div>{`end: rgb(${1.0}, ${1.0}, ${1.0})`}</div>
        <div style={`align-self:center;width:150px;height:150px;background-color:rgb(${generateColor(color.x, depth) * 255}, ${generateColor(color.y, depth) * 255}, ${generateColor(color.z, depth) * 255})`}></div>
    </div>
}

function Track(color: Vector3, t: number) {
    "use watch";
    color = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
}