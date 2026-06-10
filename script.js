(function () {
  var c = document.getElementById('stars');
  for (var i = 0; i < 160; i++) {
    var s = document.createElement('div');
    s.className = 'star';
    var sz = Math.random() * 1.8 + 0.4;
    s.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;'
      + 'left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;'
      + '--dur:' + (2 + Math.random() * 4) + 's;--del:' + (Math.random() * 5) + 's;'
      + 'opacity:' + (0.08 + Math.random() * 0.45) + ';';
    c.appendChild(s);
  }
})();

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Project menu switching
document.querySelectorAll('.project-menu-item').forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelectorAll('.project-menu-item').forEach(function (i) { i.classList.remove('active'); });
    document.querySelectorAll('.project-panel').forEach(function (p) { p.classList.remove('active'); });
    item.classList.add('active');
    var panel = document.getElementById('panel-' + item.dataset.project);
    if (panel) panel.classList.add('active');
  });
});

// Image thumbnail switching
document.querySelectorAll('.media-thumbs').forEach(function (thumbs) {
  thumbs.querySelectorAll('.thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var main = thumbs.closest('.panel-media').querySelector('.media-main');
      main.src = thumb.dataset.src;
      thumbs.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });
});

// Lightbox
(function () {
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCounter = document.getElementById('lb-counter');
  var images = [];
  var current = 0;

  function openLightbox(srcs, idx) {
    images = srcs;
    current = idx;
    lbImg.src = images[current];
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
    lb.classList.add('open');
  }

  function closeLightbox() { lb.classList.remove('open'); }

  function navigate(dir) {
    current = (current + dir + images.length) % images.length;
    lbImg.src = images[current];
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
  }

  document.querySelectorAll('.panel-media').forEach(function (media) {
    var main = media.querySelector('.media-main');
    var thumbs = media.querySelectorAll('.thumb');
    if (!main) return;

    var srcs = thumbs.length
      ? Array.from(thumbs).map(function (t) { return t.dataset.src; })
      : [main.src];

    main.addEventListener('click', function () {
      var idx = srcs.indexOf(main.src);
      openLightbox(srcs, idx >= 0 ? idx : 0);
    });
  });

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', function () { navigate(-1); });
  document.getElementById('lb-next').addEventListener('click', function () { navigate(1); });

  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'Escape') closeLightbox();
  });
})();
