import adaptiveImage from '~/assets/images/skills/ADAPTIVE.png'
import conservationProtocolImage from '~/assets/images/skills/ADAPTIVE.png'
import antiFreezeImage from '~/assets/images/skills/ANTI-FREEZE.png'
import armorPiercingImage from '~/assets/images/skills/ARMOR PIERCING.png'
import augmentationProtocol from '~/assets/images/skills/AUGMENTATION PROTOCOL.png'
import bioLethalImage from '~/assets/images/skills/BIOLETHAL.png'
import bloodHealingImage from '~/assets/images/skills/BLOOD HEALING.png'
import brewSampleImage from '~/assets/images/skills/BREW SAMPLE.png'
import cleaveStrikeImage from '~/assets/images/skills/CLEAVE STRIKE.png'
import cloneMasterImage from '~/assets/images/skills/CLONE MASTER.png'
import coldBladeImage from '~/assets/images/skills/COLD BLADE.png'
import deathEchoImage from '~/assets/images/skills/DEATH ECHO.png'
import deathHowlImage from '~/assets/images/skills/DEATH HOWL.png'
import droneXImage from '~/assets/images/skills/DRONE-X.png'
import elementalFusionImage from '~/assets/images/skills/ELEMENTAL FUSION.png'
import finisherImage from '~/assets/images/skills/FINISHER.png'
import fluidicBodyImage from '~/assets/images/skills/FLUIDIC BODY.png'
import fortressImage from '~/assets/images/skills/FORTRESS.png'
import frostEruptionImage from '~/assets/images/skills/FROST ERUPTION.png'
import frostBiteImage from '~/assets/images/skills/FROSTBITE.png'
import guardImage from '~/assets/images/skills/GUARD.png'
import igniteImage from '~/assets/images/skills/IGNITE.png'
import inspireImage from '~/assets/images/skills/INSPIRE.png'
import killerInstinctImage from '~/assets/images/skills/KILLER INSTINCT.png'
import lightningStrikeImage from '~/assets/images/skills/LIGHTNING STRIKE.png'
import meteorImage from '~/assets/images/skills/METEOR.png'
import morbidVisionImage from '~/assets/images/skills/MORBID VISION.png'
import multiStrikesImage from '~/assets/images/skills/MULTI-STRIKES.png'
import painSealerImage from '~/assets/images/skills/PAIN SEALER.png'
import poisonStrikeImage from '~/assets/images/skills/POISON STRIKE.png'
import preemptiveStrikeImage from '~/assets/images/skills/PREEMPTIVE STRIKE.png'
import reflectImage from '~/assets/images/skills/REFLECT.png'
import resurrectionImage from '~/assets/images/skills/RESURRECTION.png'
import resurrection_Image from '~/assets/images/skills/RESURRECTION_.png'
import royalBlessingImage from '~/assets/images/skills/ROYAL BLESSING.png'
import secondWindImage from '~/assets/images/skills/SECOND WIND.png'
import secondWind_Image from '~/assets/images/skills/SECONDWIND_.png'
import seduceImage from '~/assets/images/skills/SEDUCE.png'
import selfDestructImage from '~/assets/images/skills/SELF DESTRUCT.png'
import shackledImage from '~/assets/images/skills/SHACKLED.png'
import shieldShareImage from '~/assets/images/skills/SHIELD SHARE.png'
import shieldSpellImage from '~/assets/images/skills/SHIELD SPELL.png'
import shockWaveImage from '~/assets/images/skills/SHOCKWAVE.png'
import slaveSpawnImage from '~/assets/images/skills/SLAVE SPAWN.png'
import soulKeeperImage from '~/assets/images/skills/SOUL KEEPER.png'
import soulMasterImage from '~/assets/images/skills/SOUL MASTER.png'
import soulStealImage from '~/assets/images/skills/SOUL STEAL.png'
import spearOfInfinityImage from '~/assets/images/skills/SPEAR OF INFINITY.png'
import suffocateImage from '~/assets/images/skills/SUFFOCATE.png'
import trampleImage from '~/assets/images/skills/TRAMPLE.png'
import unstoppableImage from '~/assets/images/skills/UNSTOPPABLE.png'
import unTouchableImage from '~/assets/images/skills/UNTOUCHABLE.png'
import upCycleImage from '~/assets/images/skills/UPCYCLE.png'
import venganceImage from '~/assets/images/skills/VENGANCE.png'
import warsongImage from '~/assets/images/skills/WAR SONG.png'
import warningStrikeImage from '~/assets/images/skills/WARNING STRIKE.png'
import whirlwind1Image from '~/assets/images/skills/WHIRLWIND 1.png'

const SKILL_IMAGE: Record<string, any> = {
  ADAPTIVE: adaptiveImage,
  'ANTI-FREEZE': antiFreezeImage,
  'ARMOR PIERCING': armorPiercingImage,
  'AUGMENTATION PROTOCOL': augmentationProtocol,
  'BLOOD HEALING': bloodHealingImage,
  'BREW SAMPLE': brewSampleImage,
  BIOLETHAL: bioLethalImage,
  'CLEAVE STRIKE': cleaveStrikeImage,
  'CLONE MASTER': cloneMasterImage,
  'COLD BLADE': coldBladeImage,
  'CONSERVATION PROTOCOL': conservationProtocolImage,
  'DEATH ECHO': deathEchoImage,
  'DEATH HOWL': deathHowlImage,
  'DRONE-X': droneXImage,
  'ELEMENTAL FUSION': elementalFusionImage,
  'FLUIDIC BODY': fluidicBodyImage,
  'FROST ERUPTION': frostEruptionImage,
  'KILLER INSTINCT': killerInstinctImage,
  'LIGHTNING STRIKE': lightningStrikeImage,
  'MORBID VISION': morbidVisionImage,
  METEOR: meteorImage,
  IGNITE: igniteImage,
  FROSTBITE: frostBiteImage,
  INSPIRE: inspireImage,
  FORTRESS: fortressImage,
  FINISHER: finisherImage,
  GUARD: guardImage,
  'WAR SONG': warsongImage,
  'MULTI-STRIKES': multiStrikesImage,
  'PAIN SEALER': painSealerImage,
  'POISON STRIKE': poisonStrikeImage,
  'PREEMPTIVE STRIKE': preemptiveStrikeImage,
  REFLECT: reflectImage,
  RESURRECTION: resurrectionImage,
  RESURRECTION_: resurrection_Image,
  'ROYAL BLESSING': royalBlessingImage,
  'SECOND WIND': secondWindImage,
  SECONDWIND_: secondWind_Image,
  SEDUCE: seduceImage,
  'SELF DESTRUCT': selfDestructImage,
  SHACKLED: shackledImage,
  'SHIELD SHARE': shieldShareImage,
  'SHIELD SPELL': shieldSpellImage,
  SHOCKWAVE: shockWaveImage,
  'SLAVE SPAWN': slaveSpawnImage,
  'SOUL KEEPER': soulKeeperImage,
  'SOUL MASTER': soulMasterImage,
  'SOUL STEAL': soulStealImage,
  'SPEAR OF INFINITY': spearOfInfinityImage,
  SUFFOCATE: suffocateImage,
  TRAMPLE: trampleImage,
  UNSTOPPABLE: unstoppableImage,
  UNTOUCHABLE: unTouchableImage,
  UPCYCLE: upCycleImage,
  VENGANCE: venganceImage,
  'WARNING STRIKE': warningStrikeImage,
  WHIRLWIND: whirlwind1Image,
}

export const getImageUrl = (fileName: string) => {
  return SKILL_IMAGE[fileName]
}
