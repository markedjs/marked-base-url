import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { marked } from 'marked';
import { baseUrl } from '../src/index.js';

describe('baseUrl', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('domain vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain vs relative path bare', () => {
    marked.use(baseUrl('https://example.com/'));
    assert.strictEqual(marked.parse('[my url](relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain vs relative path', () => {
    marked.use(baseUrl('https://example.com/'));
    assert.strictEqual(marked.parse('[my url](./relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain without trailing slash vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain without trailing slash vs relative path bare', () => {
    marked.use(baseUrl('https://example.com'));
    assert.strictEqual(marked.parse('[my url](relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain without trailing slash vs relative path', () => {
    marked.use(baseUrl('https://example.com'));
    assert.strictEqual(marked.parse('[my url](./relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('absolute path', () => {
    marked.use(baseUrl('https://example.com/'));
    assert.strictEqual(marked.parse('[my url](https://example.org/absolute)'), `<p><a href="https://example.org/absolute">my url</a></p>\n`);
  });

  test('absolute path vs relative baseUrl', () => {
    marked.use(baseUrl('./relative/folder/'));
    assert.strictEqual(marked.parse('[my url](https://example.org/absolute)'), `<p><a href="https://example.org/absolute">my url</a></p>\n`);
  });

  test('absolute path vs root baseUrl', () => {
    marked.use(baseUrl('/root/folder/'));
    assert.strictEqual(marked.parse('[my url](https://example.org/absolute)'), `<p><a href="https://example.org/absolute">my url</a></p>\n`);
  });

  test('domain folder base vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/folder'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain folder base trailing slash vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain file vs relative path', () => {
    marked.use(baseUrl('https://example.com/file.html'));
    assert.strictEqual(marked.parse('[my url](./relative)'), `<p><a href="https://example.com/relative">my url</a></p>\n`);
  });

  test('domain folder trailing slash vs relative path', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    assert.strictEqual(marked.parse('[my url](./relative)'), `<p><a href="https://example.com/folder/relative">my url</a></p>\n`);
  });

  test('domain folder trailing slash vs relative path bare', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    assert.strictEqual(marked.parse('[my url](relative)'), `<p><a href="https://example.com/folder/relative">my url</a></p>\n`);
  });

  test('relative baseUrl vs relative path', () => {
    marked.use(baseUrl('folder/file.html'));
    assert.strictEqual(marked.parse('[my url](relative)'), `<p><a href="folder/relative">my url</a></p>\n`);
  });

  test('locally absolute baseUrl vs relative path', () => {
    marked.use(baseUrl('/folder/file.html'));
    assert.strictEqual(marked.parse('[my url](./relative)'), `<p><a href="/folder/relative">my url</a></p>\n`);
  });

  test('relative baseUrl vs locally absolute path', () => {
    marked.use(baseUrl('folder'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="/relative">my url</a></p>\n`);
  });

  test('unchanged as baseUrl is not a folder', () => {
    marked.use(baseUrl('folder'));
    assert.strictEqual(marked.parse('[my url](relative)'), `<p><a href="relative">my url</a></p>\n`);
  });

  test('locally absolute baseUrl vs locally absolute path', () => {
    marked.use(baseUrl('/folder'));
    assert.strictEqual(marked.parse('[my url](/relative)'), `<p><a href="/relative">my url</a></p>\n`);
  });

  test('absolute url, jump up', () => {
    marked.use(baseUrl('http://example.com/a/b/c/'));
    assert.strictEqual(marked.parse('[my url](../relative)'), `<p><a href="http://example.com/a/b/relative">my url</a></p>\n`);
  });

  test('locally absolute url, jump up', () => {
    marked.use(baseUrl('/a/b/c/'));
    assert.strictEqual(marked.parse('[my url](../relative)'), `<p><a href="/a/b/relative">my url</a></p>\n`);
  });

  test('local reference link vs regular bareUrl', () => {
    marked.use(baseUrl('http://example.com/'));
    assert.strictEqual(marked.parse('[my url](#anchor)'), `<p><a href="#anchor">my url</a></p>\n`);
  });

  test('local reference link vs locally absolute baseUrl', () => {
    marked.use(baseUrl('/a/b/c/'));
    assert.strictEqual(marked.parse('[my url](#anchor)'), `<p><a href="#anchor">my url</a></p>\n`);
  });
});
