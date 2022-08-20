import { isString } from './validate';
import { createMathFunc } from './dom';
import { EMPTY_ARRAY } from './constant';
import type { EachCallback, FilterCallback, Selector } from './common';
import { NodeType } from './common';

export class DOMQuery {
  length: number;

    [index: number]: NodeType;

    constructor (nodes: NodeType[] | readonly never[]) {
      nodes.forEach((node, i) => {
        this[i] = node;
      });

      this.length = nodes.length;
    }

    each(callback: EachCallback): DOMQuery {
      for (let i = 0, len = this.length; i < len; i++) {
        callback(this[i], i, this);
      }

      return this;
    }

    find(selector: string): DOMQuery {
      const nodes: NodeType[] = [];

      this.each(node => {
        const foundNodes = (node as HTMLElement).querySelectorAll(selector);
            
        foundNodes.forEach(foundNode => {
          nodes.push(foundNode);
        });
      });

      return new DOMQuery(nodes);
    }

    parent(selector?: string): DOMQuery {
      const node = this[0] as Node;

      if (node) {
        const parentNode = node.parentNode;

        if (!parentNode) {
          return new DOMQuery(EMPTY_ARRAY);
        }

        if (selector == null) {
          return new DOMQuery([parentNode]);
        }

        const matchFn = createMathFunc(selector);
        const isMatch = matchFn(parentNode as HTMLElement);
            
        if (isMatch) {
          return new DOMQuery([parentNode]);
        }
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    parents(selector?: string): DOMQuery {
      const node = this[0] as Node;

      if (node) {
        let parentNode = node as HTMLElement;

        const matchFn = selector == null
         
          ? (_: HTMLElement): boolean => true
          : createMathFunc(selector);

        const nodes: Node[] = [];

        while (parentNode !== document.body) {
          parentNode = parentNode.parentNode as HTMLElement;

          if (parentNode) {
            const isMatch = matchFn(parentNode);
    
            if (isMatch) {
              nodes.push(parentNode);
            }
          }
        }

        if (nodes.length) {
          return new DOMQuery(nodes);
        }
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    // next/prev/nextAll/prevAll方法与jQuery有差别，jQuery是查询集合中所有元素的next/prev/nextAll/prevAll，这里只实现了查询第一个元素
    next(selector?: string): DOMQuery {
      const node = this[0] as HTMLElement;

      if (node) {
        const nextNode: Element | null = node.nextElementSibling;

        if (!nextNode) {
          return new DOMQuery(EMPTY_ARRAY);
        }

        if (selector == null) {
          return new DOMQuery([nextNode]);
        }

        const matchFn = createMathFunc(selector);
        const isMatch = matchFn(nextNode as HTMLElement);

        if (isMatch) {
          return new DOMQuery([nextNode]);
        }
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    nextAll(selector?: string): DOMQuery {
      let node = this[0] as Element | null;
      const matched = [];
      const matchFn = selector ? createMathFunc(selector) : undefined;

      if (node) {
        while ((node = node.nextElementSibling)) {
          if (matchFn) {
            if (matchFn(node as HTMLElement)) {
              matched.push(node as never);
            }
          } else {
            matched.push(node as never);
          }
        }

        return new DOMQuery(matched);
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    prev(selector?: string): DOMQuery {
      const node = this[0] as HTMLElement;

      if (node) {
        const prevNode: Element | null = node.previousElementSibling;

        if (!prevNode) {
          return new DOMQuery(EMPTY_ARRAY);
        }

        if (selector == null) {
          return new DOMQuery([prevNode]);
        }

        const matchFn = createMathFunc(selector);
        const isMatch = matchFn(prevNode as HTMLElement);

        if (isMatch) {
          return new DOMQuery([prevNode]);
        }
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    prevAll(selector?: string): DOMQuery {
      let node = this[0] as Element | null;
      const matched = [];
      const matchFn = selector ? createMathFunc(selector) : undefined;

      if (node) {
        while ((node = node.previousElementSibling)) {
          if (matchFn) {
            if (matchFn(node as HTMLElement)) {
              matched.push(node as never);
            }
          } else {
            matched.push(node as never);
          }
        }

        return new DOMQuery(matched.reverse());
      }

      return new DOMQuery(EMPTY_ARRAY);
    }

    focus(): DOMQuery {
      const node = this[0] as HTMLElement;

      if (node && node.focus) {
        node.focus();
      }

      return this;
    }

    blur(): DOMQuery {
      const node = this[0] as HTMLElement;

      if (node && node.blur) {
        node.blur();
      }

      return this;
    }

    is(selector: string | NodeType | DOMQuery | EventTarget): boolean {
      if (selector instanceof DOMQuery) {
        return this[0] === selector[0];
      } else if (isString(selector)) {
        const target = document.querySelector(selector);
        return this[0] === target;
      }

      return this[0] === selector;
    }

    attr(key: string | Record<string, any>, value?: any): string | null | DOMQuery {
      const element = this[0] as HTMLElement;

      if (isString(key)) {
        if (value === undefined) {
          return element.getAttribute(key);
        }
    
        element.setAttribute(key, value);
        return this;
      }

      for (const k in key) {
        element.setAttribute(k, key[k]);
      }
      return this;
    }

    val(value?: string): string | DOMQuery | undefined {
      if (value == null) {
        if (!this[0]) return undefined;

        return (this[0] as HTMLInputElement).value;
      }

      if (this[0]) {
        (this[0] as HTMLInputElement).value = value;
      }
      return this;
    }

    addClass(className: string): DOMQuery {
      if (this[0]) {
        (this[0] as HTMLElement).classList.add(className);
      }
      return this;
    }

    removeClass(className: string): DOMQuery {
      if (this[0]) {
        (this[0] as HTMLElement).classList.remove(className);
      }
      return this;
    }

    hasClass(className: string): boolean {
      if (this[0]) {
        return (this[0] as HTMLElement).classList.contains(className);
      }
      return false;
    }

    eq(index: number): DOMQuery {
      const node = this[index];

      if (node) {
        return new DOMQuery([node]);
      }
      return new DOMQuery(EMPTY_ARRAY);
    }

    index(): number {
      return (this[0] && (this[0] as HTMLElement).parentNode) ? this.prevAll().length : -1;
    }

    filter(callback: FilterCallback): DOMQuery {
      const matched = [];

      for (let i = 0, len = this.length; i < len; i++) {
        if (callback(this[i], i, this)) {
          matched.push(this[i] as never);
        }
      }

      return new DOMQuery(matched);
    }

    on(type: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions): void {
      this.each((node) => {
        node.addEventListener(type, listener, options);
      });
    }

    off(type: string, listener: EventListener | EventListenerObject, options?: boolean | AddEventListenerOptions): void {
      this.each((node) => {
        node.removeEventListener(type, listener, options);
      });
    }
}

export function domQuery(selector: Selector, context?: HTMLElement): DOMQuery {
  const nodes: NodeType[] = [];

  if (selector) {
    if (selector instanceof DOMQuery) return selector;

    if (isString(selector)) {
      const nodeList = (context || document).querySelectorAll(selector);

      if (nodeList.length) {
        nodeList.forEach(node => {
          nodes.push(node);
        });
      }
    } else if (selector instanceof NodeList) {
      if (selector.length && selector[0].nodeType) {
        selector.forEach(node => {
          nodes.push(node);
        });
      }
    } else {
      nodes.push(selector);
    }
  }

  return new DOMQuery(nodes);
}
