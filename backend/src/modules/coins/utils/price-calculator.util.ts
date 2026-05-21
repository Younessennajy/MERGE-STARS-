import { CoinType } from '../../../common/enums/coin-type.enum';
import { Metal } from '../../../common/enums/metal.enum';

/** Default weight in grams per coin type */
export const COIN_WEIGHT_GRAMS: Record<CoinType, number> = {
  [CoinType.Silver1Kg]: 1000,
  [CoinType.Gold100g]: 100,
  [CoinType.Gold1Kg]: 1000,
  [CoinType.Silver100g]: 100,
  [CoinType.Platinum100g]: 100,
  [CoinType.Custom]: 100,
};

export const COIN_METAL: Record<CoinType, Metal> = {
  [CoinType.Silver1Kg]: Metal.Silver,
  [CoinType.Gold100g]: Metal.Gold,
  [CoinType.Gold1Kg]: Metal.Gold,
  [CoinType.Silver100g]: Metal.Silver,
  [CoinType.Platinum100g]: Metal.Platinum,
  [CoinType.Custom]: Metal.Gold,
};

const MANUFACTURING_FEE_USD = 350;
const PLATFORM_FEE_RATE = 0.01;

export interface PriceBreakdown {
  metalValueUsd: number;
  manufacturingFeeUsd: number;
  platformFeeUsd: number;
  totalUsd: number;
  downPaymentUsd: number;
  monthlyPaymentUsd: number | null;
  financingTerm: number | null;
}

export function calculateCoinPrice(params: {
  coinType: CoinType;
  quantity: number;
  metalPurity: number;
  metalPricePerGram: number;
  financingTerm?: number;
}): PriceBreakdown {
  const weightGrams = COIN_WEIGHT_GRAMS[params.coinType] * params.quantity;
  const purityFactor = params.metalPurity / 100;
  const metalValueUsd =
    weightGrams * params.metalPricePerGram * purityFactor;

  const manufacturingFeeUsd = MANUFACTURING_FEE_USD * params.quantity;
  const subtotal = metalValueUsd + manufacturingFeeUsd;
  const platformFeeUsd = subtotal * PLATFORM_FEE_RATE;
  const totalUsd = subtotal + platformFeeUsd;

  const term = params.financingTerm ?? null;
  let downPaymentUsd = totalUsd * 0.2;
  let monthlyPaymentUsd: number | null = null;

  if (term && term > 0) {
    const financed = totalUsd - downPaymentUsd;
    monthlyPaymentUsd = financed / term;
  } else {
    downPaymentUsd = totalUsd;
  }

  return {
    metalValueUsd: round2(metalValueUsd),
    manufacturingFeeUsd: round2(manufacturingFeeUsd),
    platformFeeUsd: round2(platformFeeUsd),
    totalUsd: round2(totalUsd),
    downPaymentUsd: round2(downPaymentUsd),
    monthlyPaymentUsd: monthlyPaymentUsd ? round2(monthlyPaymentUsd) : null,
    financingTerm: term,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
