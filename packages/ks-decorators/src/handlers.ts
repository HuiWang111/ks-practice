import { warning } from './shared'

export function createReadonlyHandlers(readonlyProperty?: PropertyKey): ProxyHandler<object> {
  return {
    get: createGetter(),
    set: createSetter(true, readonlyProperty),
    deleteProperty: createDeleteProperty(true, readonlyProperty)
  }
}

function createGetter(): ProxyHandler<object>['get'] {
  return function get(target: object, key: PropertyKey, receiver: object) {
    return Reflect.get(target, key, receiver)
  }
}

function createSetter(
  isReadonly: boolean,
  readonlyProperty?: PropertyKey,
  isDev = true
): ProxyHandler<object>['set'] {
  return function get(target: object, key: PropertyKey, receiver: object) {
    if (!isReadonly) {
      return Reflect.set(target, key, receiver)
    }

    if (readonlyProperty) {
      if (readonlyProperty === key) {
        warning(
          isDev,
          `set operation on key '${String(key)}' failed: target is readonly.`,
          target
        )
      } else {
        return Reflect.set(target, key, receiver)
      }
    } else {
      warning(
        isDev,
        `set operation on key '${String(key)}' failed: target is readonly.`,
        target
      )
    }
    return true
  }
}

function createDeleteProperty(
  isReadonly: boolean,
  readonlyProperty?: PropertyKey,
  isDev = true
): ProxyHandler<object>['deleteProperty'] {
  return function deleteProperty(target: object, key: PropertyKey) {
    if (!isReadonly) {
      return Reflect.deleteProperty(target, key)
    }

    if (readonlyProperty) {
      if (readonlyProperty === key) {
        warning(
          isDev,
          `delete operation on key '${String(key)}' failed: target is readonly.`,
          target
        )
      } else {
        return Reflect.deleteProperty(target, key)
      }
    } else {
      warning(
        isDev,
        `delete operation on key '${String(key)}' failed: target is readonly.`,
        target
      )
    }
    return true
  }
}
