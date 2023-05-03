var S=Object.defineProperty;var N=(o,e,t)=>e in o?S(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var u=(o,e,t)=>(N(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const a=32,h=1,p=Math.floor(window.innerHeight/a)-8,g=Math.floor(window.innerWidth/a)-2;class O{constructor(){u(this,"_displayData",[]);u(this,"_delta",500);u(this,"isRunning",!1);u(this,"fuzziness",0);u(this,"onNextTick");this._displayData=this.getBoardDisplayData();let e=new Date().getTime();const t=()=>{requestAnimationFrame(t);var n=new Date().getTime();n-e>=this._delta&&(this.tick(),e=n)};t()}set speed(e){this._delta=(100-e)*10}render(e){const t=g*a+h*2,n=p*a+h*2,s=r=>{var f;if(this.isRunning||this.isOutOfBounds(r))return;const y=(f=this._displayData[r.x][r.y])==null?void 0:f.alive;this.setIsAlive(r,!y)};let i={x:-1,y:-1};const l=r=>i.x===r.x&&i.y===r.y?!1:(i={...r},!0);d3.select(e).append("svg").attr("width",`${t}px`).attr("height",`${n}px`).on("mousemove touchmove",function(){if(d3.event.preventDefault(),d3.event.type==="mousemove"&&!d3.event.ctrlKey)return;const[r,y]=d3.mouse(this),f={x:Math.ceil(y/a)-1,y:Math.ceil(r/a)-1};l(f)&&s(f)}).selectAll(".row").data(this._displayData).enter().append("g").attr("class","row").append("g").attr("class","column").selectAll(".square").data(function(r){return r}).enter().append("rect").attr("class","square").attr("id",function(r){return`c-${r.coord.x}-${r.coord.y}`}).attr("x",function(r){return r.x}).attr("y",function(r){return r.y}).attr("width",function(r){return r.width}).attr("height",function(r){return r.height}).style("fill","transparent").style("stroke","#000").on("click",r=>s(r.coord))}reset(){this.isRunning=!1,this._displayData.forEach(e=>e.forEach(t=>{this.setIsAlive(t.coord,!1)}))}tick(){var n;if(!this.isRunning)return;let e=!0;this.getAllNeighborsCount(this._displayData).forEach((s,i)=>s.forEach((l,w)=>{const d=this._displayData[i][w];d.alive&&[2,3].includes(l)||!d.alive&&[3].includes(l)?(e=!1,this.setIsAlive(d.coord,!0)):this.setIsAlive(d.coord,!1)})),(n=this.onNextTick)==null||n.call(this,e)}setIsAlive(e,t){this._displayData[e.x][e.y].alive=t,d3.select(`#c-${e.x}-${e.y}`).transition().duration(this.fuzziness).style("fill",t?"gold":"transparent")}getAllNeighborsCount(e){const t=[];for(let n=0;n<e.length;n++){t.push([]);for(let s=0;s<e[n].length;s++){const i=this.countNeighbors(e,e[n][s].coord);t[n].push(i)}}return t}countNeighbors(e,{x:t,y:n}){let s=0;const i=l=>{!this.isOutOfBounds(l)&&e[l.x][l.y].alive&&s++};return[{x:t-1,y:n+0},{x:t-1,y:n+1},{x:t+0,y:n+1},{x:t+1,y:n+1},{x:t+1,y:n+0},{x:t+1,y:n-1},{x:t+0,y:n-1},{x:t-1,y:n-1}].forEach(l=>i(l)),s}isOutOfBounds(e){return e.x<0||e.x>p-1||e.y<0||e.y>g-1}getBoardDisplayData(){const e=[];let t=h,n=h;for(let s=0;s<p;s++){e.push([]);for(let i=0;i<g;i++)e[s].push({x:t,y:n,width:a,height:a,alive:!1,coord:{x:s,y:i}}),t+=a;t=h,n+=a}return e}}const m=document.querySelector("#start"),A=document.querySelector("#reset"),L=document.querySelector("#speed"),D=document.querySelector("#fuzziness"),c=new O;let v=0;c.render("#game");c.onNextTick=o=>{_(++v),o&&x(!1)};m.addEventListener("click",()=>{c.isRunning||E(),x(!c.isRunning)});A.addEventListener("click",()=>{c.reset(),E()});L.addEventListener("input",()=>{c.speed=Number(L.value)});D.addEventListener("input",()=>{c.fuzziness=Number(D.value)*10});function x(o){c.isRunning=o,o?m.classList.add("active"):m.classList.remove("active")}function _(o){document.querySelector("#status").innerHTML=`Generations: ${o}`}function E(){v=0,_(v),x(!1)}
