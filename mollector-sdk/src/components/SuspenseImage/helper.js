export const imgCache = {
  __cache: {},
  read(src) {
    if (!src) {
      return
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          this.__cache[src] = true
          resolve(this.__cache[src])
        }
        img.src = src
        setTimeout(() => resolve({}), 7000)
      }).then(() => {
        this.__cache[src] = true
      })
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src]
    }

    return this.__cache[src]
  },
  clearImg: (src) => {
    delete this.__cache[src]
  },
}

export const simplePreload = (imageSource) => {
  return new Promise(function (resolve, reject) {
    var img

    if (imageSource instanceof HTMLImageElement) {
      img = imageSource

      if (!img.complete) {
        img.onload = resolve.bind(null, img)
        img.onerror = img.onabort = reject.bind(null, img)
      } else if (img.naturalHeight) {
        resolve(img)
      } else {
        reject(img)
      }
    } else if (typeof imageSource === 'string') {
      img = new Image()
      img.onload = resolve.bind(null, img)
      img.onerror = img.onabort = reject.bind(null, img)
      img.src = imageSource
    }
  })
}
