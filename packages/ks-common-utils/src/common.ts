import type { DOMQuery } from './domQuery';

export type NodeType = Node | Window | Document | EventTarget;

export type Selector = string | DOMQuery | NodeList | Node | Window| Document | null | EventTarget;

export type EachCallback = (node: NodeType, index: number, nodes: DOMQuery) => void;

export type FilterCallback = (node: NodeType, index: number, nodes: DOMQuery) => boolean;
