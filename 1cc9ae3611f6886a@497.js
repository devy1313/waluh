// https://observablehq.com/@forresto/video-to-lottie@497
import define1 from "./379024cb08238691@208.js";

function _1(md){return(
md`# Video to Lottie

Local movie.mp4 to lottie.json converter. Adobe / After Effects optional!

Probably only good for very short clips, that you want to make scrubbable.

Don't make people dowload a 5 MB .lottie.json file when they visit your site!

Choose your web-happy video file here:`
)}

function _videoFile(html){return(
html`<input type="file" accept=".mp4,.mov,.webm" />`
)}

function _inputFPS(html){return(
html`<input type=number value=30 />`
)}

function _maxFrameCountGuess(duration,inputFPS){return(
Math.round(duration * inputFPS)
)}

function _outputWidth(options,videoWidth){return(
Math.floor(options.outputScale * videoWidth)
)}

function _outputHeight(options,videoHeight){return(
Math.floor(options.outputScale * videoHeight)
)}

function _options(formWithSubmit,html,maxFrameCountGuess,duration)
{
  const form = formWithSubmit(html`
  <form style="display: grid; grid-template-columns: 7em 14.5em; grid-gap: 0.5em;">
    <label for="outputScale">Scale output:</label>
    <input name="outputScale" type="number" value="1" min="0" max="1" step="0.01" />
    <label for="numFrames">Frame count:</label>
    <input name="numFrames" value="12" type="number" min="2" max="${maxFrameCountGuess}" />
    <label for="quality">JPG quality:</label>
    <input name="quality" value="0.8" type="number" min="0" max="1" step="0.01" />
    <label for="clipStart">Clip start:</label>
    <input name="clipStart" value="0" type="number" min="0" max="${duration}" step="0.000001" />
    <label for="clipEnd">Clip end:</label>
    <input name="clipEnd" value="${duration}" type="number" min="0" max="${duration}" step="0.000001" />
    <input type="submit" value="Encode!" style="grid-column: 1 / span 2; padding: 0.5em;" />
  </form>
`);
  // form.querySelector('[type="submit"]').disabled = busy || !videoFile;
  return form;
}


function _8(options){return(
options
)}

function _9(html,progress,width){return(
html`<div style="color: white; background-color: blue; padding: 0.25em 0.5em; width: ${progress *
  width}px" >${Math.floor(progress * 100)}%</div>`
)}

function _10(md){return(
md`After frames are captured, lottie.json download link will show here:`
)}

function _11(outputLink){return(
outputLink.cloneNode(true)
)}

function _12(md){return(
md`## Lottie preview of encoded frames`
)}

function _previewScrub(html,options){return(
html`<input type=range value=0 min=0 max=${options.numFrames -
  1} />`
)}

function _previewImage(html,previewScrub,frames){return(
html`<div>${previewScrub}</div><img src="${frames[previewScrub].data}">`
)}

function _15(md){return(
md`## \`video\` element: frames are captured from here`
)}

function _videoEl(html,videoFile,$0,$1,$2,$3)
{
  const videoEl = html`<video src="${URL.createObjectURL(
    videoFile
  )}" controls style="max-width: 100%;" />`;

  videoEl.addEventListener('loadedmetadata', function(event) {
    $0.value = videoEl.videoWidth;
    $1.value = videoEl.videoHeight;
  });

  videoEl.addEventListener('durationchange', function(event) {
    $2.value = videoEl.duration;
  });

  function setCurrentTime() {
    $3.value = videoEl.currentTime;
  }
  videoEl.addEventListener('seeked', setCurrentTime);
  videoEl.addEventListener('timeupdate', setCurrentTime);

  return videoEl;
}


function _videoWidth(){return(
0
)}

function _videoHeight(){return(
0
)}

function _duration(){return(
0
)}

function _currentTime(){return(
0
)}

function _busy(){return(
false
)}

function _progress(){return(
0
)}

function _outputFrameRate(options,duration){return(
Math.max(1, Math.floor(options.numFrames / duration))
)}

function _seekTo(){return(
async function seekTo(videoEl, time) {
  return new Promise((resolve, reject) => {
    const handleSeeked = function() {
      videoEl.removeEventListener('seeked', handleSeeked);
      resolve(videoEl.currentTime);
    };
    videoEl.addEventListener('seeked', handleSeeked);
    videoEl.currentTime = time;
  });
}
)}

function _extractFrames(seekTo,$0){return(
async function extractFrames({
  videoEl,
  clipStart,
  clipEnd,
  numFrames,
  quality = 0.8,
  outputScale = 1
}) {
  // if (busy) {
  //   throw new Error('Already encoding, wait a moment...');
  // }
  // mutable busy = true;
  videoEl.pause();

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const outputWidth = outputScale * videoEl.videoWidth;
  const outputHeight = outputScale * videoEl.videoHeight;
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const frames = [];

  for (let i = 0; i < numFrames; i++) {
    const duration = clipEnd - clipStart;
    if (duration <= 0) {
      throw new Error('clipEnd is before clipStart');
    }
    const time = i * (duration / (Math.max(2, numFrames) - 1)) + clipStart;
    // In threory, waits until seeked time is in view
    const seekedTime = await seekTo(videoEl, time);
    context.drawImage(videoEl, 0, 0, outputWidth, outputHeight);
    frames.push({
      time,
      seekedTime,
      data: canvas.toDataURL('image/jpeg', quality)
    });
    $0.value = (i + 1) / numFrames;
  }

  // mutable busy = false;

  return frames;
}
)}

function _frames(extractFrames,videoEl,options){return(
extractFrames({
  videoEl,
  ...options
})
)}

function _preview(frames,html)
{
  const previewImages = frames.map(
    ({ data }) => html`<img src="${data}" style="max-width: 128px">`
  );
  return html`<div>${previewImages}</div>`;
}


function _lottieJson(frames,outputWidth,outputHeight,outputFrameRate,options){return(
frames.reduce(
  function(lottie, frame, index) {
    const id = "fr_" + index;
    const w = outputWidth;
    const w2 = Math.floor(w / 2);
    const h = outputHeight;
    const h2 = Math.floor(h / 2);

    lottie.assets.push({
      id,
      w,
      h,
      u: "",
      p: frame.data,
      e: 1
    });

    lottie.layers.push({
      ddd: 0,
      ind: index + 1,
      ty: 2,
      nm: id + ".jpg",
      cl: "jpg",
      refId: id,
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [w2, h2, 0], ix: 2 },
        a: { a: 0, k: [w2, h2, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      ip: index,
      op: index + 1,
      st: index,
      bm: 0
    });

    return lottie;
  },
  {
    v: "5.5.2",
    fr: outputFrameRate,
    ip: 0,
    op: options.numFrames,
    w: outputWidth,
    h: outputHeight,
    nm: "@forresto/movie-to-lottie",
    ddd: 0,
    assets: [],
    layers: [],
    markers: []
  }
)
)}

function _outputLink(lottieJson,videoFile,html)
{
  const jsonString = JSON.stringify(lottieJson);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const outputFilename = videoFile.name + ".lottie.json";
  return html`<a href="${url}" download="${outputFilename}">${outputFilename} (${Math.round(
    blob.size / 1024
  )}kb)</a>`;
}


function _30(md){return(
md`## Libs`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof videoFile")).define("viewof videoFile", ["html"], _videoFile);
  main.variable(observer("videoFile")).define("videoFile", ["Generators", "viewof videoFile"], (G, _) => G.input(_));
  main.variable(observer("viewof inputFPS")).define("viewof inputFPS", ["html"], _inputFPS);
  main.variable(observer("inputFPS")).define("inputFPS", ["Generators", "viewof inputFPS"], (G, _) => G.input(_));
  main.variable(observer("maxFrameCountGuess")).define("maxFrameCountGuess", ["duration","inputFPS"], _maxFrameCountGuess);
  main.variable(observer("outputWidth")).define("outputWidth", ["options","videoWidth"], _outputWidth);
  main.variable(observer("outputHeight")).define("outputHeight", ["options","videoHeight"], _outputHeight);
  main.variable(observer("viewof options")).define("viewof options", ["formWithSubmit","html","maxFrameCountGuess","duration"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer()).define(["options"], _8);
  main.variable(observer()).define(["html","progress","width"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["outputLink"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof previewScrub")).define("viewof previewScrub", ["html","options"], _previewScrub);
  main.variable(observer("previewScrub")).define("previewScrub", ["Generators", "viewof previewScrub"], (G, _) => G.input(_));
  main.variable(observer("previewImage")).define("previewImage", ["html","previewScrub","frames"], _previewImage);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("videoEl")).define("videoEl", ["html","videoFile","mutable videoWidth","mutable videoHeight","mutable duration","mutable currentTime"], _videoEl);
  main.define("initial videoWidth", _videoWidth);
  main.variable(observer("mutable videoWidth")).define("mutable videoWidth", ["Mutable", "initial videoWidth"], (M, _) => new M(_));
  main.variable(observer("videoWidth")).define("videoWidth", ["mutable videoWidth"], _ => _.generator);
  main.define("initial videoHeight", _videoHeight);
  main.variable(observer("mutable videoHeight")).define("mutable videoHeight", ["Mutable", "initial videoHeight"], (M, _) => new M(_));
  main.variable(observer("videoHeight")).define("videoHeight", ["mutable videoHeight"], _ => _.generator);
  main.define("initial duration", _duration);
  main.variable(observer("mutable duration")).define("mutable duration", ["Mutable", "initial duration"], (M, _) => new M(_));
  main.variable(observer("duration")).define("duration", ["mutable duration"], _ => _.generator);
  main.define("initial currentTime", _currentTime);
  main.variable(observer("mutable currentTime")).define("mutable currentTime", ["Mutable", "initial currentTime"], (M, _) => new M(_));
  main.variable(observer("currentTime")).define("currentTime", ["mutable currentTime"], _ => _.generator);
  main.define("initial busy", _busy);
  main.variable(observer("mutable busy")).define("mutable busy", ["Mutable", "initial busy"], (M, _) => new M(_));
  main.variable(observer("busy")).define("busy", ["mutable busy"], _ => _.generator);
  main.define("initial progress", _progress);
  main.variable(observer("mutable progress")).define("mutable progress", ["Mutable", "initial progress"], (M, _) => new M(_));
  main.variable(observer("progress")).define("progress", ["mutable progress"], _ => _.generator);
  main.variable(observer("outputFrameRate")).define("outputFrameRate", ["options","duration"], _outputFrameRate);
  main.variable(observer("seekTo")).define("seekTo", _seekTo);
  main.variable(observer("extractFrames")).define("extractFrames", ["seekTo","mutable progress"], _extractFrames);
  main.variable(observer("frames")).define("frames", ["extractFrames","videoEl","options"], _frames);
  main.variable(observer("preview")).define("preview", ["frames","html"], _preview);
  main.variable(observer("lottieJson")).define("lottieJson", ["frames","outputWidth","outputHeight","outputFrameRate","options"], _lottieJson);
  main.variable(observer("outputLink")).define("outputLink", ["lottieJson","videoFile","html"], _outputLink);
  main.variable(observer()).define(["md"], _30);
  const child1 = runtime.module(define1);
  main.import("formWithSubmit", child1);
  return main;
}
