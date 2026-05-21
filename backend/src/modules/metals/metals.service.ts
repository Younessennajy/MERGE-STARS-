import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metal } from '../../common/enums/metal.enum';
import { MetalPrice } from './entities/metal-price.entity';

/** Fallback prices per gram (USD) when DB is empty */
const DEFAULT_PRICES_PER_GRAM: Record<Metal, number> = {
  [Metal.Gold]: 85,
  [Metal.Silver]: 1.05,
  [Metal.Platinum]: 32,
  [Metal.Palladium]: 38,
};

@Injectable()
export class MetalsService implements OnModuleInit {
  private readonly logger = new Logger(MetalsService.name);

  constructor(
    @InjectRepository(MetalPrice)
    private readonly pricesRepo: Repository<MetalPrice>,
  ) {}

  async onModuleInit() {
    const count = await this.pricesRepo.count();
    if (count === 0) {
      await this.seedDefaultPrices();
      this.logger.log('Seeded default metal prices.');
    }
  }

  async getLivePrices() {
    const metals = Object.values(Metal);
    const prices = await Promise.all(
      metals.map(async (metal) => {
        const latest = await this.pricesRepo.findOne({
          where: { metal },
          order: { recordedAt: 'DESC' },
        });
        return {
          metal,
          priceUsd: latest ? parseFloat(latest.priceUsd) : DEFAULT_PRICES_PER_GRAM[metal],
          changePct: latest?.changePct ? parseFloat(latest.changePct) : 0,
          recordedAt: latest?.recordedAt ?? new Date(),
        };
      }),
    );

    return {
      message: 'Live metal prices retrieved successfully.',
      prices,
    };
  }

  async getPricePerGram(metal: Metal): Promise<number> {
    const latest = await this.pricesRepo.findOne({
      where: { metal },
      order: { recordedAt: 'DESC' },
    });
    if (latest) return parseFloat(latest.priceUsd);
    return DEFAULT_PRICES_PER_GRAM[metal];
  }

  private async seedDefaultPrices() {
    for (const metal of Object.values(Metal)) {
      await this.pricesRepo.save(
        this.pricesRepo.create({
          metal,
          priceUsd: DEFAULT_PRICES_PER_GRAM[metal].toFixed(4),
          changePct: '0.0000',
        }),
      );
    }
  }
}
