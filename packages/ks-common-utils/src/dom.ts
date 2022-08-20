type MatchFunc = (node: HTMLElement) => boolean;

export function createMathFunc(selector: string): MatchFunc {
   
  if (!selector) return (_: HTMLElement): boolean => false;

  const firstChar = selector[0];
  const restChars = selector.slice(1);
    
  switch (firstChar) {
  case '#':
    return (node: HTMLElement): boolean => node.getAttribute('id') === restChars;
  case '.':
    return (node: HTMLElement): boolean => node.classList.contains(restChars);
  default:
    return (node: HTMLElement): boolean => node.tagName.toLowerCase() === selector;
  }
}
