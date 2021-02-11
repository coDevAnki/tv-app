import { render } from "react-dom";
import "./styles/style.css";

const Component = () => <div>Hello I am react</div>;

let h = { webpack: "working" };
console.log(h);
console.log("hello");
let d = { ...h, babel: "working on" };
console.log("new ", d);

console.log(process.env.NODE_ENV);

render(<Component />, document.getElementById("root"));
