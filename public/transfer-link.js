(() => {
  const kind = location.pathname.split('/').filter(Boolean)[0];
  if (!['t1', 'l1'].includes(kind)) return;
  let code;
  try { code = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (!new RegExp('^cubechat:' + kind + ':[A-Za-z0-9_-]+={0,2}$').test(code)) {
    document.getElementById('hint').textContent = 'Код відсутній або пошкоджений. Знову відскануйте QR на іншому пристрої.';
    return;
  }
  document.getElementById('title').textContent = kind === 'l1' ? 'Підключити комп’ютер' : 'Перенести акаунт';
  document.getElementById('hint').textContent = 'CubeChat попросить підтвердження перед початком. Не передавайте це посилання іншим.';
  const open = document.getElementById('open');
  const fallback = location.origin + location.pathname + location.hash;
  open.href = /Android/i.test(navigator.userAgent)
    ? 'intent://' + kind + '?c=' + encodeURIComponent(code) + '#Intent;scheme=cubechat;package=com.cubechat.cubechat;S.browser_fallback_url=' + encodeURIComponent(fallback) + ';end'
    : 'cubechat://' + kind + '#' + encodeURIComponent(code);
  open.hidden = false;
})();
