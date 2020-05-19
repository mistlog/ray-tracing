export function CustomImage(params: string, parent: HTMLElement) {
    // console.log(params.split(" "));
    const [name, link] = params.split(" ");
    const image = document.createElement("image");

    //
    image.innerHTML = `
        <a ${link? `href=${link}`: "" }>
          <img src="../../../images/${name}" style="float:none;display:block;margin-left:auto;margin-right:auto;box-shadow:none"/>
        </a>
      `;

    parent.append(image);
}