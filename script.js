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
