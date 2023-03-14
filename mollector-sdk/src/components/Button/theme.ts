import ButtonFrame from '~/assets/images/buttonFrame.png'

import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '48px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '12px',
    padding: '0 8px',
  },
}

export const loadingScaleVariants = {
  [scales.MD]: {
    width: '45px',
    height: '45px',
  },
  [scales.SM]: {
    width: '30px',
    height: '30px',
  },
  [scales.XS]: {
    width: '30px',
    height: '30px',
  },
}

export const loadingInnerScaleVariants = {
  [scales.MD]: {
    width: '30px',
    height: '30px',
    margin: '8px',
  },
  [scales.SM]: {
    width: '20px',
    height: '20px',
    margin: '5px',
  },
  [scales.XS]: {
    width: '20px',
    height: '20px',
    margin: '5px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: '#F8C159',
    color: '#0D1F2B',
    borderRadius: '8px',
    borderColor: '#F8C159',
  },
  [variants.SECONDARY]: {
    backgroundColor: '#14B5B1',
    color: 'white',
    borderColor: '#14B5B1',
  },
  [variants.TERTIARY]: {
    backgroundColor: '#207D87',
    color: 'white',
    borderColor: '#207D87',
  },
  [variants.QUATERNARY]: {
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: '#207D87',
  },
  [variants.QUINARY]: {
    background: 'linear-gradient(166deg, rgba(222,150,56,1) 0%, rgba(141,80,52,1) 100%)',
    border: 'none',
  },
  [variants.SENARY]: {
    background: 'linear-gradient(180deg, #FBB03A 0%, #834334 76.04%)',
    boxShadow: '0px 0px 0px 1.06234px #07121A',
    borderRadius: '12px',
    border: 'none',
  },
  // [variants.LIGHT]: {
  //   backgroundColor: "input",
  //   color: "textSubtle",
  //   boxShadow: "none",
  // },
}
