# marked-base-url

Prefix relative url with base url.

# Usage

```js
// ESM
import {marked} from "marked";
import {baseUrl} from "marked-base-url";

marked.use(baseUrl("https://example.com/folder/"));
const html = marked.parse("[my url](./relative/path)");
// <p><a href="https://example.com/folder/relative/path">my url</a></p>

// BROWSER
<script src="https://cdn.jsdelivr.net/npm/marked"></script>
<script src="https://cdn.jsdelivr.net/npm/marked-base-url"></script>
<script>
    marked.use(markedBaseUrl.baseUrl("https://example.com/folder/"));
    const html = marked.parse("[my url](./relative/path)");
    // <p><a href="https://example.com/folder/relative/path">my url</a></p>
</script>
```
