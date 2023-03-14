import { useMutation } from 'react-query'

import useOpenPack from '../useOpenPack'

const useOpenPackMutation = () => {
  const { onOpenPack } = useOpenPack()
  return useMutation((tokenIds: string[]) => {
    return onOpenPack(tokenIds)
  })
}

export default useOpenPackMutation
