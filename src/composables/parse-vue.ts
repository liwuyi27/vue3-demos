import { isBlank, trimLineChar } from "@/share";
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
        let content = match.groups!.content;
        content = trimContent(content);
        const parseResultItem = parseParseResultItem(content);
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
    resultItem[name] = trimContent(code);
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

function trimContent(content: string) {
  let subs = content.split(/\r?\n/);
  let i: number;
  // 去掉头部的空行
  for (i = 0; i < subs.length; i++) {
    if(!isBlank(subs[i])) {
      break;
    }
  }
  subs = subs.slice(i);
  // 去掉尾部的空行
  for (i = subs.length - 1; i >= 0; i--) {
    if (!isBlank(subs[i])) {
      break;
    }
  }
  subs = subs.slice(0, i + 1);
  
  for (i = 0; i < subs[0].length; i++) {
    if (!isBlank(subs[0][i])) {
      break;
    }
  }
  subs = subs.map(sub => sub.slice(i))
  return subs.join('\r\n');
}