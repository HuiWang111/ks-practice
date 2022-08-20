import {
  createReadonlyHandlers
} from './handlers'

export function readonly<T extends object>(target: T, key?: PropertyKey): T {
  return new Proxy<T>(target, createReadonlyHandlers(key))
}
