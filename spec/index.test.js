import { marked } from 'marked';
import { baseUrl } from '../src/index.js';

describe('baseUrl', () => {
  beforeEach(() => {
    marked.setOptions(marked.getDefaults());
  });

  test('domain', () => {
    marked.use(baseUrl('https://example.com/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
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

  test('domain folder base', () => {
    marked.use(baseUrl('https://example.com/folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder base trailing slash', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder', () => {
    marked.use(baseUrl('https://example.com/folder'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder trailing slash', () => {
    marked.use(baseUrl('https://example.com/folder/'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/folder/relative">my url</a></p>
"
`);
  });
});
