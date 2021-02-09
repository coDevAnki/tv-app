import "./styles/style.css";

let h = { webpack: "working" };
console.log(h);
console.log("hello");
let d = { ...h, babel: "working on" };
console.log("new ", d);

console.log(process.env.NODE_ENV);
