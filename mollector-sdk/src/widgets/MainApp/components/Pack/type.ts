import { IPackInfo } from '~/configurations'

import { Handler } from '../../../..'

export enum PACK_TYPE {
  VETERAN = '1',
  MERCHANT = '2',
  VIP = '3',
  ROYAL = '4',
}

export const PACK_NAME_MAP: Record<string, string> = {
  '1': 'Veteran',
  '2': 'Merchant',
  '3': 'Vip',
  '4': 'Royal',
}

export interface IPack {
  packInfo: IPackInfo
  showPackDetailModal: (pInfo: IPackInfo) => void
}
