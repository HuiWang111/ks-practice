import {
  readonly
} from './proxy'

// TODO: 如何拿到实例属性的值？？？
export function Readonly<T extends object>(target: T, key: PropertyKey): void {
  readonly(target.constructor, key)
}
