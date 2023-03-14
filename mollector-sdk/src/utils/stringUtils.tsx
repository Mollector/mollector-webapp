export const truncContractString = (contract: string | null | undefined) => {
  if (!contract || !contract.trim()) {
    return ''
  }
  return contract.slice(0, 7) + '...' + contract.slice(contract.length + 1 - 7, contract.length + 1)
}
