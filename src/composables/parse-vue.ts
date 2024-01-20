import { trimLineChar } from "@/share";
interface ParseResult {
  template: ParseResultItem,
  script: ParseResultItem,
  style: ParseResultItem
}

interface ParseResultItem {
  default: string,
  [key: string]: string
}

type ParseRegex = Record<keyof ParseResult, RegExp>;

const parseRegx: ParseRegex = {
  template: /<template>(?<content>[\w\W]+)<\/template>/,
  script: /<script\s+setup\s+lang="ts">(?<content>[\w\W]+)<\/script>/,
  style: /<style\s+lang="scss"\s*(scoped)?>(?<content>[\w\W]+)<\/style>/,
}

export const useParseVue = (modules: Record<string, string>) => {
  const results: Record<string, ParseResult> = {};
  Object.entries(modules).forEach(([path, content]) => {
    const parseResult = {} as ParseResult;
    Object.entries(parseRegx).forEach(([key, regx]) => {
      const match = regx.exec(content);
      if (match) {
        const parseResultItem = parseParseResultItem(match.groups!.content);
        parseResult[key as keyof ParseResult] = parseResultItem;
      } else {
        throw new Error(`Invalid ${key}: \n${content}`)
      }
    })
    const fileName = parseVueName(path);
    results[fileName] = parseResult;
  })
  return results;
}

function parseVueName(path: string) {
  const nameRegx = /\/(?<name>[\w-]+)\.vue/;
  const match = nameRegx.exec(path)!;
  if (match) {
    return match.groups!.name;
  } else {
    throw new Error(`Invalid path: \n${ path }`);
  }
}

function parseParseResultItem(content: string) {
  const snippetRegx = /\/\*\s+(snippet-(?<name>[\w-]+))\s+\*\/(?<code>[\w\W]+)\/\*\s+\1\s+\*\//g;
  const resultItem: ParseResultItem = {
    default: clearSnippetComment(content)
  };
  let match = snippetRegx.exec(content);
  while(match) {
    const { name, code } = match.groups!;
    resultItem[name] = trimLineChar(code);
    match = snippetRegx.exec(content);
  }
  return resultItem;
}

function clearSnippetComment(content: string) {
  const commentRegx = /\/\*\s+snippet-[\w-]+\s+\*\/\r\n/g;
  let ret = content.replace(commentRegx, '');
  ret = trimLineChar(ret);
  return ret;
}