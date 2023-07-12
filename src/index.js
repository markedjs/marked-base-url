export function baseUrl(baseUrl) {
  // extension code here

  const reAbsUrl = /^[\w+]+:\/\//
  baseUrl = baseUrl.trim().replaceAll(/[\/\.]+$/g, '')+'/'  // make sure baseUrl ends with one '/'
  return {
    walkTokens(token) {
      if (!['link', 'image'].includes(token.type)) {
        return;
      }

      if (reAbsUrl.test(token.href)) {
        // keep the URL intact if absolute
        return;
      }
      if (!reAbsUrl.test(baseUrl)) {
        // baseUrl is not absolute
        if (token.href.startsWith("/")) {
          // the URL is from root
          return
        }
        try {
          const baseUrlFromRoot = baseUrl.startsWith('/')
          const dummy = 'http://__dummy__'
          const temp = new URL(baseUrl+token.href, dummy).href
          token.href = temp.slice(dummy.length + (baseUrlFromRoot ? 0 : 1))
        } catch (e) {
          // ignore
        }
      } else {
        try {
          token.href = new URL(token.href, baseUrl).href;
        } catch (e) {
          // ignore
        }
      }
    }
  };
}
