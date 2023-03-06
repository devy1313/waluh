// https://observablehq.com/@forresto/form-input-with-submit@208
import define1 from "./8d271c22db968ab0@160.js";

function _1(md){return(
md`# Form Input With Submit

This notebook defines a \`formWithSubmit\` function which makes it easier to use complex forms together with [Observable views](/@mbostock/introduction-to-views).

This fork changes [@mbostock/form-input](https://observablehq.com/@mbostock/form-input)'s version to **not** output the values until the form is submitted.

To use it in your notebook:

\`\`\`js
import {formWithSumbit} from "@forresto/form-input-with-submit"
\`\`\`

Pass the *formWithSumbit* function a form element, and you’re off to the races! 🐎`
)}

function _object(formWithSubmit,html){return(
formWithSubmit(html`<form>
  <div><label><input name="message" type="text" value="Hello, form!"> <i>message</i></label></div>
  <div><label><input name="number" type="number" value="1"> <i>number</i></label></div>
  <div><label><input name="hue" type="range" min=0 max=360> <i>hue</i></label></div>
  <div>
    <label><input name="size" type="radio" value="12"> <i>small</i></label>
    <label><input name="size" type="radio" value="24" checked> <i>medium</i></label>
    <label><input name="size" type="radio" value="48"> <i>large</i></label>
  </div>
  <input type="submit" value="Submit">
</form>`)
)}

function _3(object){return(
object
)}

function _4(md){return(
md`Now you have a reactive reference to resulting object!

Until the form is submitted, \`object\` will be unresolved, and this won't draw:`
)}

function _5(html,svg,object){return(
html`<svg
  width="640"
  height="64"
  viewBox="0 0 640 64"
  style="width:100%;max-width:640px;height:auto;display:block;background:#333;"
>
  ${Object.assign(
    svg`<text
    x="50%"
    y="50%"
    text-anchor="middle" 
    dy="0.35em"
    fill="hsl(${object.hue},100%,50%)"
    font-size="${object.size}"
  >`,
    {
      textContent: object.message + " " + object.number
    }
  )}
</svg>`
)}

function _6(md){return(
md`---

## Implementation`
)}

function _formWithSubmit(html,formValue){return(
function formWithSubmit(form) {
  const container = html`<div>${form}`;
  form.addEventListener("submit", event => {
    event.preventDefault();
    container.value = formValue(form);
    container.dispatchEvent(new CustomEvent("input"));
  });
  form.addEventListener("input", event => {
    event.preventDefault();
    // Need this, because otherwise the viewof Generator catches bubbling input events
    event.stopPropagation();
  });
  return container;
}
)}

function _formWithSumbit(formWithSubmit){return(
formWithSubmit
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof object")).define("viewof object", ["formWithSubmit","html"], _object);
  main.variable(observer("object")).define("object", ["Generators", "viewof object"], (G, _) => G.input(_));
  main.variable(observer()).define(["object"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["html","svg","object"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("formWithSubmit")).define("formWithSubmit", ["html","formValue"], _formWithSubmit);
  main.variable(observer("formWithSumbit")).define("formWithSumbit", ["formWithSubmit"], _formWithSumbit);
  const child1 = runtime.module(define1);
  main.import("formValue", child1);
  return main;
}
