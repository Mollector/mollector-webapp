import React, { useEffect, useRef } from 'react'
import { animated, to, useSpring } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import CardView from '~/widgets/MainApp/components/CardView'
import { ICard } from '~/widgets/MainApp/types'

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => {
  if (window.innerWidth / x < 3.5 && window.innerWidth / x > 3) {
    return 10
  }

  if (window.innerWidth / x < 1.5 && window.innerWidth / x > 1.4) {
    return -10
  }
  return (x - lx - window.innerWidth / 2) / 20
}

const PackRevealItem = ({ cardData }: { cardData: ICard }) => {
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('gesturestart', preventDefault)
    document.addEventListener('gesturechange', preventDefault)

    return () => {
      document.removeEventListener('gesturestart', preventDefault)
      document.removeEventListener('gesturechange', preventDefault)
    }
  }, [])

  const domTarget = useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    x: 0,
    y: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  useGesture(
    {
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) => !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } },
  )
  return (
    <animated.div
      ref={domTarget}
      style={{
        transform: 'perspective(1000px)',
        x,
        y,
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
      }}
    >
      <CardView cardData={cardData} />
    </animated.div>
  )
}

export default PackRevealItem
