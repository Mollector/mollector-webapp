import { useDispatch } from 'react-redux'

import { setOpenMarketplace } from '~/state/reducer/app'

const useOpenApp = () => {
  const dispatch = useDispatch()
  return {
    onOpenApp: () => {
      dispatch(setOpenMarketplace(true))
    },
    onCloseApp: () => {
      dispatch(setOpenMarketplace(false))
    },
  }
}

export default useOpenApp
