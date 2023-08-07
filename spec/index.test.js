import { marked } from 'marked';
import { baseUrl } from '../src/index.js';

describe('baseUrl', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('domain vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain vs relative path bare', () => {
    marked.use(baseUrl('https://example.com/'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain vs relative path', () => {
    marked.use(baseUrl('https://example.com/'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs relative path bare', () => {
    marked.use(baseUrl('https://example.com'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs relative path', () => {
    marked.use(baseUrl('https://example.com'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('absolute path', () => {
    marked.use(baseUrl('https://example.com/'));
    expect(marked.parse('[my url](https://example.org/absolute)')).toMatchInlineSnapshot(`
"<p><a href="https://example.org/absolute">my url</a></p>
"
`);
  });

  test('absolute path vs relative baseUrl', () => {
    marked.use(baseUrl('./relative/folder/'));
    expect(marked.parse('[my url](https://example.org/absolute)')).toMatchInlineSnapshot(`
"<p><a href="https://example.org/absolute">my url</a></p>
"
`);
  });

  test('absolute path vs root baseUrl', () => {
    marked.use(baseUrl('/root/folder/'));
    expect(marked.parse('[my url](https://example.org/absolute)')).toMatchInlineSnapshot(`
"<p><a href="https://example.org/absolute">my url</a></p>
"
`);
  });

  test('domain folder base vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder base trailing slash vs locally absolute path', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain file vs relative path', () => {
    marked.use(baseUrl('https://example.com/file.html'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder trailing slash vs relative path', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/folder/relative">my url</a></p>
"
`);
  });

  test('domain folder trailing slash vs relative path bare', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/folder/relative">my url</a></p>
"
`);
  });

  test('relative baseUrl vs relative path', () => {
    marked.use(baseUrl('folder/file.html'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="folder/relative">my url</a></p>
"
`);
  });

  test('locally absolute baseUrl vs relative path', () => {
    marked.use(baseUrl('/folder/file.html'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="/folder/relative">my url</a></p>
"
`);
  });

  test('relative baseUrl vs locally absolute path', () => {
    marked.use(baseUrl('folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="/relative">my url</a></p>
"
`);
  });

  test('unchanged as baseUrl is not a folder', () => {
    marked.use(baseUrl('folder'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="relative">my url</a></p>
"
`);
  });

  test('locally absolute baseUrl vs locally absolute path', () => {
    marked.use(baseUrl('/folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="/relative">my url</a></p>
"
`);
  });

  test('absolute url, jump up', () => {
    marked.use(baseUrl('http://example.com/a/b/c/'));
    expect(marked.parse('[my url](../relative)')).toMatchInlineSnapshot(`
"<p><a href="http://example.com/a/b/relative">my url</a></p>
"
`);
  });

  test('locally absolute url, jump up', () => {
    marked.use(baseUrl('/a/b/c/'));
    expect(marked.parse('[my url](../relative)')).toMatchInlineSnapshot(`
"<p><a href="/a/b/relative">my url</a></p>
"
`);
  });
});
