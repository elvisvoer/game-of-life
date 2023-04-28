var _=Object.defineProperty;var O=(l,t,e)=>t in l?_(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var h=(l,t,e)=>(O(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const a=32,g=1,m=Math.floor(window.innerHeight/a)-8,x=Math.floor(window.innerWidth/a)-2;class E{constructor(){h(this,"_displayData",[]);h(this,"_delta",500);h(this,"isRunning",!1);h(this,"onNextTick");this._displayData=this.getBoardDisplayData();let t=new Date().getTime();const e=()=>{requestAnimationFrame(e);var n=new Date().getTime();n-t>=this._delta&&(this.tick(),t=n)};e()}set speed(t){this._delta=(100-t)*10}render(t){const e=x*a+g*2,n=m*a+g*2,s=r=>{var d;if(this.isRunning||this.isOutOfBounds(r))return;const y=(d=this._displayData[r.x][r.y])==null?void 0:d.alive;this.setIsAlive(r,!y)};let i={x:-1,y:-1};const o=r=>i.x===r.x&&i.y===r.y?!1:(i={...r},!0);d3.select(t).append("svg").attr("width",`${e}px`).attr("height",`${n}px`).on("mousemove touchmove",function(){d3.event.preventDefault();const[r,y]=d3.mouse(this),d={x:Math.ceil(y/a)-1,y:Math.ceil(r/a)-1};o(d)&&s(d)}).selectAll(".row").data(this._displayData).enter().append("g").attr("class","row").append("g").attr("class","column").selectAll(".square").data(function(r){return r}).enter().append("rect").attr("class","square").attr("id",function(r){return`c-${r.coord.x}-${r.coord.y}`}).attr("x",function(r){return r.x}).attr("y",function(r){return r.y}).attr("width",function(r){return r.width}).attr("height",function(r){return r.height}).style("fill","transparent").style("stroke","#000")}tick(){var n;if(!this.isRunning)return;let t=!0;this.getAllNeighborsCount(this._displayData).forEach((s,i)=>s.forEach((o,w)=>{const f=this._displayData[i][w];f.alive&&[2,3].includes(o)||!f.alive&&[3].includes(o)?(t=!1,this.setIsAlive(f.coord,!0)):this.setIsAlive(f.coord,!1)})),(n=this.onNextTick)==null||n.call(this,t)}setIsAlive(t,e){this._displayData[t.x][t.y].alive=e,d3.select(`#c-${t.x}-${t.y}`).style("fill",e?"gold":"transparent")}getAllNeighborsCount(t){const e=[];for(let n=0;n<t.length;n++){e.push([]);for(let s=0;s<t[n].length;s++){const i=this.countNeighbors(t,t[n][s].coord);e[n].push(i)}}return e}countNeighbors(t,{x:e,y:n}){let s=0;const i=o=>{!this.isOutOfBounds(o)&&t[o.x][o.y].alive&&s++};return[{x:e-1,y:n+0},{x:e-1,y:n+1},{x:e+0,y:n+1},{x:e+1,y:n+1},{x:e+1,y:n+0},{x:e+1,y:n-1},{x:e+0,y:n-1},{x:e-1,y:n-1}].forEach(o=>i(o)),s}isOutOfBounds(t){return t.x<0||t.x>m-1||t.y<0||t.y>x-1}getBoardDisplayData(){const t=[];let e=g,n=g;for(let s=0;s<m;s++){t.push([]);for(let i=0;i<x;i++)t[s].push({x:e,y:n,width:a,height:a,alive:!1,coord:{x:s,y:i}}),e+=a;e=g,n+=a}return t}}let p,L=0,v=!1;const u=new E;u.render("#game");function D(l){u.isRunning=l,l?p.classList.add("isRunning"):p.classList.remove("isRunning")}u.onNextTick=l=>{document.querySelector("#status").innerHTML=`Generations: ${L++}`,l&&(v=!0,D(!1))};p=document.querySelector("#toggle-game");p.addEventListener("click",()=>{!u.isRunning&&v&&(L=0,v=!1),D(!u.isRunning)});const c=document.querySelector("#speed");c==null||c.addEventListener("input",()=>{u.speed=c==null?void 0:c.value});
