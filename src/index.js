export function baseUrl(base) {
  // extension code here

  return {
    walkTokens(token) {
      if (!['link', 'image'].includes(token.type)) {
        return;
      }

      token.href = new URL(token.href, base).href;
    }
  };
}
