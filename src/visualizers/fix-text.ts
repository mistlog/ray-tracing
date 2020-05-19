// sometimes comment doesn't work, fix it using this visualizer

export function FixText(params: string, parent: HTMLElement) {
    const p = document.createElement("p");

    p.innerHTML = `
        <p>
          ${params}
        </p>
      `;

    parent.append(p);
}