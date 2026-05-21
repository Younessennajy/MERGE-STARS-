import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { Product } from './entities/product.entity';
import { slugify } from './utils/slug.util';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepo: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async create(managerId: string, dto: CreateBrandDto) {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) {
      throw new ConflictException('Brand name must produce a valid slug.');
    }

    await this.ensureUniqueNameAndSlug(dto.name, slug);

    const brand = await this.brandsRepo.save(
      this.brandsRepo.create({
        name: dto.name,
        slug,
        tagline: dto.tagline ?? null,
        description: dto.description ?? null,
        logoUrl: dto.logoUrl ?? null,
        minPriceUsd: (dto.minPriceUsd ?? 2500).toFixed(2),
        isActive: dto.isActive ?? true,
        createdById: managerId,
      }),
    );

    this.logger.log(`Brand created: ${brand.name} [${brand.id}] by ${managerId}`);

    return {
      message: 'Brand created successfully.',
      brand,
    };
  }

  async findAll() {
    const brands = await this.brandsRepo.find({
      order: { createdAt: 'DESC' },
      relations: { products: false },
    });

    const counts = await this.productsRepo
      .createQueryBuilder('product')
      .select('product.brand_id', 'brandId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('product.brand_id')
      .getRawMany<{ brandId: string; count: string }>();

    const countMap = new Map(
      counts.map((row) => [row.brandId, parseInt(row.count, 10)]),
    );

    return {
      message: 'Brands retrieved successfully.',
      brands: brands.map((brand) => ({
        ...brand,
        productCount: countMap.get(brand.id) ?? 0,
      })),
    };
  }

  async findOne(id: string) {
    const brand = await this.findBrandOrFail(id);
    const productCount = await this.productsRepo.count({
      where: { brandId: id },
    });

    return {
      message: 'Brand retrieved successfully.',
      brand: { ...brand, productCount },
    };
  }

  async update(id: string, dto: UpdateBrandDto) {
    const brand = await this.findBrandOrFail(id);

    const nextName = dto.name ?? brand.name;
    const nextSlug = dto.slug ?? (dto.name ? slugify(dto.name) : brand.slug);

    if (nextName !== brand.name || nextSlug !== brand.slug) {
      await this.ensureUniqueNameAndSlug(nextName, nextSlug, id);
    }

    if (dto.minPriceUsd !== undefined) {
      brand.minPriceUsd = dto.minPriceUsd.toFixed(2);
    }

    Object.assign(brand, {
      name: nextName,
      slug: nextSlug,
      tagline: dto.tagline ?? brand.tagline,
      description: dto.description ?? brand.description,
      logoUrl: dto.logoUrl ?? brand.logoUrl,
      isActive: dto.isActive ?? brand.isActive,
    });

    const saved = await this.brandsRepo.save(brand);
    this.logger.log(`Brand updated: ${saved.name} [${saved.id}]`);

    return {
      message: 'Brand updated successfully.',
      brand: saved,
    };
  }

  async remove(id: string) {
    const brand = await this.findBrandOrFail(id);
    const productCount = await this.productsRepo.count({
      where: { brandId: id },
    });

    if (productCount > 0) {
      throw new ConflictException(
        `Cannot delete brand "${brand.name}": ${productCount} product(s) still linked. Delete products first.`,
      );
    }

    await this.brandsRepo.remove(brand);
    this.logger.log(`Brand deleted: ${brand.name} [${brand.id}]`);

    return {
      message: 'Brand deleted successfully.',
      brandId: id,
    };
  }

  async findBrandOrFail(id: string): Promise<Brand> {
    const brand = await this.brandsRepo.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand "${id}" not found.`);
    }
    return brand;
  }

  async findAllPublic() {
    const brands = await this.brandsRepo.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
    return { message: 'Brands retrieved successfully.', brands };
  }

  private async ensureUniqueNameAndSlug(
    name: string,
    slug: string,
    excludeId?: string,
  ): Promise<void> {
    const existingByName = await this.brandsRepo.findOne({ where: { name } });
    if (existingByName && existingByName.id !== excludeId) {
      throw new ConflictException(
        `Brand name "${name}" is already in use.`,
      );
    }

    const existingBySlug = await this.brandsRepo.findOne({ where: { slug } });
    if (existingBySlug && existingBySlug.id !== excludeId) {
      throw new ConflictException(`Brand slug "${slug}" is already in use.`);
    }
  }
}
