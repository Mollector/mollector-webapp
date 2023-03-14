import React, { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'

import useGetApprovedStatus from '~/hooks/api/useGetApprovedStatus'
import useGetApprovedTokensStatus from '~/hooks/api/useGetApprovedTokensStatus'
import useApproveMutation from '~/hooks/mutations/useApproveMutation'
import useApproveTokenMutation from '~/hooks/mutations/useApproveTokenMutation'
import useMediaQuery from '~/hooks/useMediaQuery'

import { scales } from '../Button/types'

import { StyledButton } from './styles'
import { ApproveButtonProps, TOKEN_STANDARD } from './types'

const ApproveButton = ({
  spenderAddress,
  tokenContract,
  ActionButton,
  amount = ethers.constants.MaxUint256,
  tokenType,
}: ApproveButtonProps) => {
  const isMobile = useMediaQuery('(max-width: 576px)')
  const [firstTimeFetched, setFirstTimeFetched] = useState(false)
  const {
    data: isApprovedERC721,
    isLoading: isLoadingApprovedERC721,
    refetch: fetchIsApproved,
  } = useGetApprovedTokensStatus(tokenContract, spenderAddress)
  const { mutateAsync: onApproveERC721, isLoading: isLoadingSetErc721Approval } = useApproveTokenMutation(
    tokenContract,
    spenderAddress,
  )
  const {
    data: isApprovedERC20,
    isLoading: isLoadingApprovedERC20,
    refetch: fetchAllowanceData,
  } = useGetApprovedStatus(tokenContract, spenderAddress)
  const { mutateAsync: onApproveErc20, isLoading: isLoadingSetErc20Approval } = useApproveMutation(
    tokenContract,
    spenderAddress,
    amount,
  )

  const { isApproved, isLoadingApproveStatus, refetchAllowance, onApprove } = useMemo(() => {
    if (tokenType === TOKEN_STANDARD.ERC721) {
      return {
        isApproved: isApprovedERC721,
        isLoadingApproveStatus: isLoadingApprovedERC721,
        refetchAllowance: fetchIsApproved,
        onApprove: onApproveERC721,
      }
    }

    return {
      isApproved: isApprovedERC20,
      isLoadingApproveStatus: isLoadingApprovedERC20,
      refetchAllowance: fetchAllowanceData,
      onApprove: onApproveErc20,
    }
  }, [
    tokenType,
    isApprovedERC721,
    isApprovedERC20,
    isLoadingApprovedERC721,
    isLoadingApprovedERC20,
    onApproveERC721,
    onApproveErc20,
    fetchIsApproved,
    fetchAllowanceData,
  ])

  useEffect(() => {
    setFirstTimeFetched(true)
  }, [])

  useEffect(() => {
    // We will try to refetch approve status after the first time the status is loaded
    if (firstTimeFetched) {
      fetchAllowanceData()
      fetchIsApproved()
    }
  }, [spenderAddress, tokenContract, tokenType])

  const onHandleApprove = async () => {
    await onApprove()
    refetchAllowance()
  }

  if (!isApproved) {
    return (
      <StyledButton
        variant="senary"
        isBorderButton
        scale={isMobile ? scales.SM : scales.MD}
        isLoading={isLoadingSetErc721Approval || isLoadingApproveStatus || isLoadingSetErc20Approval}
        onClick={onHandleApprove}
      >
        Approve contract
      </StyledButton>
    )
  }

  return <>{ActionButton}</>
}

export default ApproveButton
