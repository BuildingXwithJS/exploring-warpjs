"use strict";

// import WarpJS
import engine from "@warpjs/engine";
import { defaultWarper as warp } from "@warpjs/warp";
import { getData } from "./api";

// init WarpJS
engine.init();

// on web page load
window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("result").innerHTML = "Loading..";
  // call back-end function
  const response = await warp.call(getData, "World");
  console.log(response);
  // show result in browser
  let resultHTML = "";

  response.result.forEach(result => {
    resultHTML += `
    <div>
      <h1>${result.name} from ${result.mostRecent.date}</h1>
      <p>Confirmed: ${result.mostRecent.confirmed}</p>
      <p>Deaths: ${result.mostRecent.deaths}</p>
      <p>Recovered: ${result.mostRecent.recovered}</p>
      <p>Growth Rate: ${result.mostRecent.growthRate}</p>
    </div>
    `;
  });

  document.getElementById("result").innerHTML = resultHTML;
});
