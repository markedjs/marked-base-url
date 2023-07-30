import type { marked } from 'marked'

/**
 * Prefix relative url with base url.
 *
 * @param base The base url.
 * @returns A {@link marked.MarkedExtension | MarkedExtension} to be passed to {@link marked.use | `marked.use()`}
 */
export function baseUrl(base: string): marked.MarkedExtension
