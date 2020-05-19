import { registerVisualizer } from "litscript/lib/visualizer";
import { Illustrate } from "./illustrator";
import { CustomImage } from "./custom-image";
import { FixText } from "./fix-text";

registerVisualizer("illustrator", Illustrate);
registerVisualizer("custom-image", CustomImage);
registerVisualizer("fix-text", FixText);