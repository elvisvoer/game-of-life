var _=Object.defineProperty;var O=(l,t,e)=>t in l?_(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var g=(l,t,e)=>(O(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const a=32,p=1,m=Math.floor(window.innerHeight/a)-8,x=Math.floor(window.innerWidth/a)-2;class E{constructor(){g(this,"_displayData",[]);g(this,"_delta",500);g(this,"isRunning",!1);g(this,"onNextTick");this._displayData=this.getBoardDisplayData();let t=new Date().getTime();const e=()=>{requestAnimationFrame(e);var s=new Date().getTime();s-t>=this._delta&&(this.tick(),t=s)};e()}set speed(t){this._delta=(100-t)*10}render(t){const e=x*a+p*2,s=m*a+p*2,n=r=>{var h;if(this.isRunning||this.isOutOfBounds(r))return;const y=(h=this._displayData[r.x][r.y])==null?void 0:h.alive;this.setIsAlive(r,!y)};let i={x:-1,y:-1};const o=r=>i.x===r.x&&i.y===r.y?!1:(i={...r},!0);d3.select(t).append("svg").attr("width",`${e}px`).attr("height",`${s}px`).on("mousemove touchmove",function(){d3.event.preventDefault();const[r,y]=d3.mouse(this),h={x:Math.ceil(y/a)-1,y:Math.ceil(r/a)-1};o(h)&&n(h)}).selectAll(".row").data(this._displayData).enter().append("g").attr("class","row").append("g").attr("class","column").selectAll(".square").data(function(r){return r}).enter().append("rect").attr("class","square").attr("id",function(r){return`c-${r.coord.x}-${r.coord.y}`}).attr("x",function(r){return r.x}).attr("y",function(r){return r.y}).attr("width",function(r){return r.width}).attr("height",function(r){return r.height}).style("fill","transparent").style("stroke","#000")}tick(){var s;if(!this.isRunning)return;let t=!0;this.getAllNeighborsCount(this._displayData).forEach((n,i)=>n.forEach((o,w)=>{const d=this._displayData[i][w];d.alive&&[2,3].includes(o)||!d.alive&&[3].includes(o)?(t=!1,this.setIsAlive(d.coord,!0)):this.setIsAlive(d.coord,!1)})),(s=this.onNextTick)==null||s.call(this,t)}setIsAlive(t,e){this._displayData[t.x][t.y].alive=e,d3.select(`#c-${t.x}-${t.y}`).style("fill",e?"gold":"transparent")}getAllNeighborsCount(t){const e=[];for(let s=0;s<t.length;s++){e.push([]);for(let n=0;n<t[s].length;n++){const i=this.countNeighbors(t,t[s][n].coord);e[s].push(i)}}return e}countNeighbors(t,{x:e,y:s}){let n=0;const i=o=>{!this.isOutOfBounds(o)&&t[o.x][o.y].alive&&n++};return[{x:e-1,y:s+0},{x:e-1,y:s+1},{x:e+0,y:s+1},{x:e+1,y:s+1},{x:e+1,y:s+0},{x:e+1,y:s-1},{x:e+0,y:s-1},{x:e-1,y:s-1}].forEach(o=>i(o)),n}isOutOfBounds(t){return t.x<0||t.x>m-1||t.y<0||t.y>x-1}getBoardDisplayData(){const t=[];let e=p,s=p;for(let n=0;n<m;n++){t.push([]);for(let i=0;i<x;i++)t[n].push({x:e,y:s,width:a,height:a,alive:!1,coord:{x:n,y:i}}),e+=a;e=p,s+=a}return t}}let u,L=0,v=!1;const f=new E;f.render("#game");function D(l){f.isRunning=l,l?(u.classList.add("isRunning"),u.innerHTML="&#9208;"):(u.classList.remove("isRunning"),u.innerHTML="&#9205;")}f.onNextTick=l=>{document.querySelector("#status").innerHTML=`Generations: ${L++}`,l&&(v=!0,D(!1))};u=document.querySelector("#toggle-game");u.addEventListener("click",()=>{!f.isRunning&&v&&(L=0,v=!1),D(!f.isRunning)});const c=document.querySelector("#speed");c==null||c.addEventListener("input",()=>{f.speed=c==null?void 0:c.value});
