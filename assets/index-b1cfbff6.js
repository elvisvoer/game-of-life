var E=Object.defineProperty;var O=(o,t,e)=>t in o?E(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var h=(o,t,e)=>(O(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const a=32,y=1,m=Math.floor(window.innerHeight/a)-8,v=Math.floor(window.innerWidth/a)-2;class N{constructor(){h(this,"_displayData",[]);h(this,"_delta",500);h(this,"isRunning",!1);h(this,"onNextTick");this._displayData=this.getBoardDisplayData();let t=new Date().getTime();const e=()=>{requestAnimationFrame(e);var n=new Date().getTime();n-t>=this._delta&&(this.tick(),t=n)};e()}set speed(t){this._delta=(100-t)*10}render(t){const e=v*a+y*2,n=m*a+y*2,s=r=>{var f;if(this.isRunning||this.isOutOfBounds(r))return;const g=(f=this._displayData[r.x][r.y])==null?void 0:f.alive;this.setIsAlive(r,!g)};let i={x:-1,y:-1};const l=r=>i.x===r.x&&i.y===r.y?!1:(i={...r},!0);d3.select(t).append("svg").attr("width",`${e}px`).attr("height",`${n}px`).on("mousemove touchmove",function(){if(d3.event.preventDefault(),d3.event.type==="mousemove"&&!d3.event.ctrlKey)return;const[r,g]=d3.mouse(this),f={x:Math.ceil(g/a)-1,y:Math.ceil(r/a)-1};l(f)&&s(f)}).selectAll(".row").data(this._displayData).enter().append("g").attr("class","row").append("g").attr("class","column").selectAll(".square").data(function(r){return r}).enter().append("rect").attr("class","square").attr("id",function(r){return`c-${r.coord.x}-${r.coord.y}`}).attr("x",function(r){return r.x}).attr("y",function(r){return r.y}).attr("width",function(r){return r.width}).attr("height",function(r){return r.height}).style("fill","transparent").style("stroke","#000").on("click",r=>s(r.coord))}reset(){this.isRunning=!1,this._displayData.forEach(t=>t.forEach(e=>{this.setIsAlive(e.coord,!1)}))}tick(){var n;if(!this.isRunning)return;let t=!0;this.getAllNeighborsCount(this._displayData).forEach((s,i)=>s.forEach((l,L)=>{const d=this._displayData[i][L];d.alive&&[2,3].includes(l)||!d.alive&&[3].includes(l)?(t=!1,this.setIsAlive(d.coord,!0)):this.setIsAlive(d.coord,!1)})),(n=this.onNextTick)==null||n.call(this,t)}setIsAlive(t,e){this._displayData[t.x][t.y].alive=e,d3.select(`#c-${t.x}-${t.y}`).style("fill",e?"gold":"transparent")}getAllNeighborsCount(t){const e=[];for(let n=0;n<t.length;n++){e.push([]);for(let s=0;s<t[n].length;s++){const i=this.countNeighbors(t,t[n][s].coord);e[n].push(i)}}return e}countNeighbors(t,{x:e,y:n}){let s=0;const i=l=>{!this.isOutOfBounds(l)&&t[l.x][l.y].alive&&s++};return[{x:e-1,y:n+0},{x:e-1,y:n+1},{x:e+0,y:n+1},{x:e+1,y:n+1},{x:e+1,y:n+0},{x:e+1,y:n-1},{x:e+0,y:n-1},{x:e-1,y:n-1}].forEach(l=>i(l)),s}isOutOfBounds(t){return t.x<0||t.x>m-1||t.y<0||t.y>v-1}getBoardDisplayData(){const t=[];let e=y,n=y;for(let s=0;s<m;s++){t.push([]);for(let i=0;i<v;i++)t[s].push({x:e,y:n,width:a,height:a,alive:!1,coord:{x:s,y:i}}),e+=a;e=y,n+=a}return t}}let p,x=0;const c=new N;c.render("#game");function w(o){c.isRunning=o,o?p.classList.add("isRunning"):p.classList.remove("isRunning")}function D(o){document.querySelector("#status").innerHTML=`Generations: ${o}`}function _(){x=0,D(x),w(!1)}c.onNextTick=o=>{D(++x),o&&w(!1)};p=document.querySelector("#start");p.addEventListener("click",()=>{c.isRunning||_(),w(!c.isRunning)});const S=document.querySelector("#reset");S.addEventListener("click",()=>{c.reset(),_()});const u=document.querySelector("#speed");u==null||u.addEventListener("input",()=>{c.speed=u==null?void 0:u.value});
