import { Vector3 } from 'three';

export default function App() {
    let color = new Vector3(0.5, 0.7, 1.0);
    let t = 0;

    //@ts-ignore
    <Track />;

    <div class="container">
        <input type="range" bindValue={t} min={0} max={1} step={0.01} />
        <div>{`t: ${t}`}</div>
        <div>{`blended: rgb(${color.x.toFixed(2)}, ${color.y.toFixed(2)}, ${color.z.toFixed(2)})`}</div>
        <div>{`start: rgb(${0.5}, ${0.7}, ${1.0})`}</div>
        <div>{`end: rgb(${1.0}, ${1.0}, ${1.0})`}</div>
        <div style={`align-self:center;width:150px;height:150px;background-color:rgb(${color.x * 255}, ${color.y * 255}, ${color.z * 255})`}></div>
    </div>
}

function Track(color: Vector3, t: number) {
    "use watch";
    color = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
}