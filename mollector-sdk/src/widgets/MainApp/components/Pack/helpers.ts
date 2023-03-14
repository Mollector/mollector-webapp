import BronzeImage from '~/assets/images/bronze.png'
import GoldenImage from '~/assets/images/golden.png'
import LegendaryImage from '~/assets/images/legendary.png'
import MagicImage from '~/assets/images/magic.png'
import MerchantImage from '~/assets/images/merchant.png'
import MollectorImage from '~/assets/images/mollector.png'
import MythicImage from '~/assets/images/mythic.png'
import RoyalImage from '~/assets/images/royal.png'
import SilverImage from '~/assets/images/silver.png'
import UltimateImage from '~/assets/images/ultimate.png'
import VeteranImage from '~/assets/images/veteran.png'
import VipImage from '~/assets/images/vip.png'
import WoodenImage from '~/assets/images/wooden.png'

export const getPackImage = (type: string) => {
  switch (type) {
    case '12':
      return VeteranImage
    case '16':
      return VipImage
    case '15':
      return MerchantImage
    case '6':
      return LegendaryImage
    case '2':
      return BronzeImage
    case '7':
      return MollectorImage
    case '8':
      return MythicImage
    case '9':
      return UltimateImage
    case '5':
      return MagicImage
    case '4':
      return GoldenImage
    case '1':
      return WoodenImage
    case '3':
      return SilverImage
    default:
      return RoyalImage
  }
}
