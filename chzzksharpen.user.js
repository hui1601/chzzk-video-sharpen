// ==UserScript==
// @name        Chzzk video sharpen
// @match       https://chzzk.naver.com/**
// @grant       none
// @version     1.0
// @author      -
// @run-at      document-idle
// @description 2024. 5. 2. 오전 11:38:51
// ==/UserScript==
function applySharpen(sharpen){
  let deblurSvgElement = document.getElementById('deblur_svg');
  let player = document.querySelector('#live_player_layout .webplayer-internal-video');
  player = player == null?document.querySelector('#player_layout .webplayer-internal-video'):player
  player.style['filter']=sharpen?'url(#svg_sharpen)':'';
  deblurSvgElement.children[0].setAttribute('fill',sharpen?'#fff':'#aaa');
}
let run = ()=>{
  if(!location.pathname.startsWith('/live/') && !location.pathname.startsWith('/video/')) return;
  if(document.getElementById('deblur_svg')) return;
  let sharpen = localStorage.getItem('sharpen');
  sharpen = sharpen==null?false:sharpen;
  document.getElementById('portal').innerHTML += '<svg><defs><filter id="svg_sharpen"><feConvolveMatrix order="3" kernelMatrix="0 -0.2 0 -0.2 1.8 -0.2 0 -0.2 0"></feConvolveMatrix></filter></defs></svg>';
  let deblurSvg = '<svg id="deblur_svg" style="width:80%;height:80%;vertical-align:-webkit-baseline-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M240-360q-17 0-28.5-11.5T200-400q0-17 11.5-28.5T240-440q17 0 28.5 11.5T280-400q0 17-11.5 28.5T240-360Zm0 160q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280q17 0 28.5 11.5T280-240q0 17-11.5 28.5T240-200Zm0-320q-17 0-28.5-11.5T200-560q0-17 11.5-28.5T240-600q17 0 28.5 11.5T280-560q0 17-11.5 28.5T240-520Zm-120-20q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm120-140q-17 0-28.5-11.5T200-720q0-17 11.5-28.5T240-760q17 0 28.5 11.5T280-720q0 17-11.5 28.5T240-680ZM120-380q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm280 280q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0-720q-8 0-14-6t-6-14q0-8 6-14t14-6q8 0 14 6t6 14q0 8-6 14t-14 6Zm0 140q-17 0-28.5-11.5T360-720q0-17 11.5-28.5T400-760q17 0 28.5 11.5T440-720q0 17-11.5 28.5T400-680Zm0 340q-25 0-42.5-17.5T340-400q0-25 17.5-42.5T400-460q25 0 42.5 17.5T460-400q0 25-17.5 42.5T400-340Zm0-160q-25 0-42.5-17.5T340-560q0-25 17.5-42.5T400-620q25 0 42.5 17.5T460-560q0 25-17.5 42.5T400-500Zm0 300q-17 0-28.5-11.5T360-240q0-17 11.5-28.5T400-280q17 0 28.5 11.5T440-240q0 17-11.5 28.5T400-200Zm80 80v-80q116 0 198-82t82-198q0-116-82-198t-198-82v-80q74 0 139.5 28.5T734-734q49 49 77.5 114.5T840-480q0 74-28.5 139.5T734-226q-49 49-114.5 77.5T480-120Zm0-360Z"/></svg>';
  let shapenHTML = `<button class="pzp-button pzp-pip-button pzp-pc__pip-button pzp-pc-ui-button" id="sharpen" aria-label="선명한 영상" slot="sharpen-button"><span class="pzp-pc-ui-button__tooltip pzp-pc-ui-button__tooltip--top">선명한 영상</span> <span class="pzp-ui-icon pzp-pip-button__icon">${deblurSvg}</span></button>`;
  document.querySelector('.pzp-pc__bottom-buttons-right').insertAdjacentHTML('afterbegin',shapenHTML);
  applySharpen(sharpen);
  document.getElementById('sharpen').addEventListener('click', function(){
    sharpen=!sharpen;
    applySharpen(sharpen);
    localStorage.setItem('sharpen', sharpen);
  });
};
window.addEventListener('transitionend',run);
