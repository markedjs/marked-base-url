# marked-base-url

Prefix relative url with base url.

# Usage

```js
import {marked} from "marked";
import {baseUrl} from "marked-base-url";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-base-url/lib/index.umd.js"></script>

marked.use(baseUrl("https://example.com/folder/"));

marked.parse("[my url](./relative/path)");
// <p><a href="https://example.com/folder/relative/path">my url</a></p>
```
