import React from 'react'

import StarImage from '~/assets/images/star.png'

import { Star } from './styles'

interface IStarProps {
  starNum: number | string
}

const StarLabel = ({ starNum }: IStarProps) => {
  return (
    <>
      {[...Array(Number(starNum)).keys()].map((item) => {
        return <Star src={StarImage} key={item} />
      })}
    </>
  )
}

export default StarLabel
