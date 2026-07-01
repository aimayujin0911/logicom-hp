// モバイル用ハンバーガーメニュー。
// header は backdrop-filter を持つため、その内側では fixed/transform が
// 閉じ込められて機能しない。そこでハンバーガー・ドロワー・オーバーレイは
// body 直下に生成し、リンクは header の <nav> から複製する。
// （ページ側のマークアップは変更不要）
(function(){
  var header = document.querySelector('header');
  if(!header) return;
  var srcNav = header.querySelector('nav');
  if(!srcNav) return;
  var srcLinks = srcNav.querySelectorAll('a');
  if(!srcLinks.length) return;

  var burger = document.createElement('button');
  burger.className = 'lc-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'メニューを開く');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';

  var overlay = document.createElement('div');
  overlay.className = 'lc-overlay';

  var drawer = document.createElement('nav');
  drawer.className = 'lc-drawer';
  drawer.setAttribute('aria-label', 'モバイルメニュー');
  Array.prototype.forEach.call(srcLinks, function(a, i){
    var link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = (a.textContent || '').trim();
    if(i === srcLinks.length - 1) link.className = 'lc-cta';
    drawer.appendChild(link);
  });

  document.body.appendChild(burger);
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  function set(open){
    drawer.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function(){ set(!drawer.classList.contains('open')); });
  overlay.addEventListener('click', function(){ set(false); });
  drawer.addEventListener('click', function(e){ if(e.target.closest('a')) set(false); });
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape') set(false); });
  window.addEventListener('resize', function(){
    if(window.innerWidth > 900 && drawer.classList.contains('open')) set(false);
  });
})();
