export function warning(isDev: boolean, ...rest: any[]): void {
  if (isDev) {
    console.warn(...rest)
  }
}
