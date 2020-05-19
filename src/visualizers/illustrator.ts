export function Illustrate(params: string, parent: HTMLElement) {
    // console.log(params.split(" "));
    const [name, width, height, isSection = "true"] = params.split(" ");
    const div = document.createElement("div");
    const url = name === "sphere-ocean" ? `./illustrations/${name}/index.html` : `${isSection === "true" ? "../../../" : "../../"}illustrations/${name}/index.html`;
    const style = `"
        border-style: none;
        width: ${width};
        height: ${height};
        overflow: auto;
    "`

    //
    div.innerHTML = `
        <iframe src=${url} style=${style}></iframe>
    `;
    parent.append(div);
}