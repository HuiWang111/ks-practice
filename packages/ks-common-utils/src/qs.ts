import { deepSet, getPath } from './utils';

function parse(
  url?: string
): Record<string, unknown> {
  if (!url) {
    return {};
  }

  const reg = /([^&=]+)(=([^&=]*))?/g;
  let p: RegExpExecArray | null;
  let object: Record<string, unknown> = {};

  while ((p = reg.exec(url))) {
    const [, key, , value] = p;
    object = deepSet(object, getPath(key), value ? decodeURIComponent(value) : value);
  }
    
  return object;
}

export default {
  parse
}