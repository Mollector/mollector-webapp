export interface PathProps {
  path: string
  hideSeperator?: boolean
  disabledRouting?: boolean
  onChangeRoute: (path: string) => void
}

export interface BreadcrumbsProps {
  path: string[]
  currentRoute: string
  onChangeRoute: (path: string) => void
}
