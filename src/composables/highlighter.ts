import { createHighlighter, type BundledLanguage, type HighlighterGeneric, type BundledTheme } from "shiki";

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>; 

export async function getHighlighter() {
  if (highlighter) {
    return highlighter;
  }
  highlighter = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light'],
    langs: ['javascript', 'typescript', 'scss', 'sass', 'css', 'html']
  })
  return highlighter;
}