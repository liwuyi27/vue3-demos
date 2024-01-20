import { isBlank } from "@/share";
import type { IThemedToken } from "shiki";

export const useShiki = () => {
  const segRegx = /\/\*\s*seg-(?<name>[\w-]+)\s*\*\//;
  const blockSegIdSet = new Set<string>();
  const inlineBlcokIdSet = new Set<string>();

  function isBlockSegMark(line: IThemedToken[]) {
    if (line.length !== 2) {
      return false;
    }
    if (!isBlank(line[0].content)) {
      return false;
    }
    if (!isSegMark(line[1].content)) {
      return false;
    }
    return true;
  }

  function isInlineSegMark(line: IThemedToken[], content: string) {
    return !isBlockSegMark(line) && isSegMark(content);
  }

  function isSegMark(content: string) {
    return segRegx.test(content);
  }

  function segMarkId(content: string) {
    const match = segRegx.exec(content);
    if (match) {
      return match.groups!.name;
    } else {
      throw new Error(`Invalid Segment Mark: \n${content}`);
    }
  }

  function blockSegMarkReplace(line: IThemedToken[]) {
    const content = line[1].content;
    const id = segMarkId(content);
    if (!blockSegIdSet.has(id)) {
      blockSegIdSet.add(id);
      return `<span id="${id}">`;
    } else {
      return `</span>`
    }
  }

  function inlineSegMarkReplace(content: string) {
    const id = segMarkId(content);
    if (!inlineBlcokIdSet.has(id)) {
      inlineBlcokIdSet.add(id);
      return `<span id="${id}">`;
    } else {
      return `</span>`
    }
  }

  function clearLineChar(html: string) {
    return html.replace(/\r?\n/g, '').replace(/<span class="line">(\s*)<\/span>/g, `<span class="empty-line">$1</span>\n`);
  }

  return {
    isInlineSegMark,
    isBlockSegMark,
    blockSegMarkReplace,
    inlineSegMarkReplace,
    clearLineChar
  }
}