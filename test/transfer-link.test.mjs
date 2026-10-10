import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../public/transfer-link.js', import.meta.url), 'utf8');
function page(kind, code, userAgent) {
  const elements = { open: { hidden: true }, hint: {}, title: {} };
  vm.runInNewContext(source, {
    location: { pathname: '/' + kind + '/', hash: '#' + code, origin: 'https://cubechat.tech' },
    navigator: { userAgent },
    document: { getElementById: id => elements[id] },
  });
  return elements;
}
for (const kind of ['t1', 'l1']) {
  test(kind + ' opens Android intent preserving the entire code', () => {
    const code = 'cubechat:' + kind + ':YWJjZA';
    const { open } = page(kind, code, 'Android');
    assert.equal(open.hidden, false);
    assert.ok(open.href.startsWith('intent://' + kind + '?c=' + encodeURIComponent(code)));
    assert.ok(open.href.includes('package=com.cubechat.cubechat;'));
  });
  test(kind + ' opens iOS custom scheme from escaped fragments', () => {
    const code = 'cubechat:' + kind + ':YWJjZA';
    const { open } = page(kind, encodeURIComponent(code), 'iPhone');
    assert.equal(open.hidden, false);
    assert.equal(open.href, 'cubechat://' + kind + '#' + encodeURIComponent(code));
  });
}
test('invalid and wrong-kind codes never produce an open link', () => {
  for (const code of ['', '%broken', 'cubechat:l1:YWJjZA', '<script>']) {
    assert.equal(page('t1', code, 'Android').open.hidden, true);
  }
});
test('iOS associates both forms of both transfer paths', () => {
  const aasa = JSON.parse(readFileSync(new URL('../public/.well-known/apple-app-site-association', import.meta.url), 'utf8'));
  const paths = aasa.applinks.details[0].components.map(entry => entry['/']);
  for (const path of ['/t1', '/t1/', '/l1', '/l1/']) assert.ok(paths.includes(path));
});
