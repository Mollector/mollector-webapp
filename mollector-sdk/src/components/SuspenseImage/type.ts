export interface ISuspenseImage {
  /**
   * Source of the image
   */
  src: string
  alt?: string
  /**
   * Suspense height allow to set the height of the suspense image to match with the container's height
   */
  suspenseHeight?: string
}

export interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Source of the image
   */
  src: string
  /**
   * Width of the image
   */
  width?: string
  /**
   * Height of the image
   */
  height?: string
  /**
   * Overwrite the style of the container of the image
   */
  wrapperStyle?: React.CSSProperties
}
