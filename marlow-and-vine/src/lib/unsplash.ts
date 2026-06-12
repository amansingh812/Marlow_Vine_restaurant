/** Build a srcset from an Unsplash URL by swapping its w= parameter. */
export function unsplashSrcSet(src: string, widths: number[]): string {
  return widths.map((w) => `${src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(', ')
}
