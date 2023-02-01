export const takeId = (links: string[] | string, symbols: number): string => {
  let i: string[] = []
  if (Array.isArray(links)) {
    links.forEach((link) => i.push(link.slice(symbols)))
    return i.join(',')
  } else {
    return links.slice(symbols)
  }
}
