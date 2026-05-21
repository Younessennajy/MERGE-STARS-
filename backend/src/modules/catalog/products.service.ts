import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly brandsService: BrandsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(managerId: string, dto: CreateProductDto) {
    await this.categoriesService.findCategoryOrFail(dto.categoryId);

    if (dto.brandId) {
      await this.brandsService.findBrandOrFail(dto.brandId);
    }

    if (dto.sku) {
      await this.ensureSkuAvailable(dto.sku);
    }

    const product = await this.productsRepo.save(
      this.productsRepo.create({
        brandId: dto.brandId ?? null,
        categoryId: dto.categoryId,
        name: dto.name,
        sku: dto.sku ?? null,
        description: dto.description ?? null,
        priceUsd: dto.priceUsd.toFixed(2),
        metalType: dto.metalType ?? null,
        weightGrams:
          dto.weightGrams !== undefined ? dto.weightGrams.toFixed(3) : null,
        purity: dto.purity !== undefined ? dto.purity.toFixed(2) : null,
        stock: dto.stock ?? 0,
        imageUrl: dto.imageUrl ?? null,
        isActive: dto.isActive ?? true,
        createdById: managerId,
      }),
    );

    this.logger.log(
      `Product created: ${product.name} [${product.id}] by ${managerId}`,
    );

    return {
      message: 'Product created successfully.',
      product,
    };
  }

  async findAll(filters?: { brandId?: string; categoryId?: string }) {
    const where: FindOptionsWhere<Product> = {};

    if (filters?.brandId) {
      await this.brandsService.findBrandOrFail(filters.brandId);
      where.brandId = filters.brandId;
    }

    if (filters?.categoryId) {
      await this.categoriesService.findCategoryOrFail(filters.categoryId);
      where.categoryId = filters.categoryId;
    }

    const products = await this.productsRepo.find({
      where,
      order: { createdAt: 'DESC' },
      relations: { brand: true, category: true },
    });

    return {
      message: 'Products retrieved successfully.',
      products,
    };
  }

  async findOne(id: string) {
    const product = await this.findProductOrFail(id);

    return {
      message: 'Product retrieved successfully.',
      product,
    };
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findProductOrFail(id);

    if (dto.brandId !== undefined && dto.brandId !== product.brandId) {
      if (dto.brandId) {
        await this.brandsService.findBrandOrFail(dto.brandId);
      }
      product.brandId = dto.brandId ?? null;
    }

    if (dto.categoryId && dto.categoryId !== product.categoryId) {
      await this.categoriesService.findCategoryOrFail(dto.categoryId);
      product.categoryId = dto.categoryId;
    }

    if (dto.sku && dto.sku !== product.sku) {
      await this.ensureSkuAvailable(dto.sku, id);
      product.sku = dto.sku;
    }

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.description !== undefined) product.description = dto.description;
    if (dto.priceUsd !== undefined) product.priceUsd = dto.priceUsd.toFixed(2);
    if (dto.metalType !== undefined) product.metalType = dto.metalType;
    if (dto.weightGrams !== undefined) {
      product.weightGrams = dto.weightGrams.toFixed(3);
    }
    if (dto.purity !== undefined) product.purity = dto.purity.toFixed(2);
    if (dto.stock !== undefined) product.stock = dto.stock;
    if (dto.imageUrl !== undefined) product.imageUrl = dto.imageUrl;
    if (dto.isActive !== undefined) product.isActive = dto.isActive;

    const saved = await this.productsRepo.save(product);
    this.logger.log(`Product updated: ${saved.name} [${saved.id}]`);

    return {
      message: 'Product updated successfully.',
      product: saved,
    };
  }

  async remove(id: string) {
    const product = await this.findProductOrFail(id);
    await this.productsRepo.remove(product);

    this.logger.log(`Product deleted: ${product.name} [${product.id}]`);

    return {
      message: 'Product deleted successfully.',
      productId: id,
    };
  }

  async findAllPublic(filters?: { categoryId?: string; brandId?: string }) {
    const where: FindOptionsWhere<Product> = { isActive: true };
    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.brandId) where.brandId = filters.brandId;

    const products = await this.productsRepo.find({
      where,
      order: { createdAt: 'DESC' },
      relations: { brand: true, category: true },
    });

    return { message: 'Products retrieved successfully.', products };
  }

  private async findProductOrFail(id: string): Promise<Product> {
    const product = await this.productsRepo.findOne({
      where: { id },
      relations: { brand: true, category: true },
    });
    if (!product) {
      throw new NotFoundException(`Product "${id}" not found.`);
    }
    return product;
  }

  private async ensureSkuAvailable(
    sku: string,
    excludeId?: string,
  ): Promise<void> {
    const existing = await this.productsRepo.findOne({ where: { sku } });
    if (existing && existing.id !== excludeId) {
      throw new ConflictException(`SKU "${sku}" is already in use.`);
    }
  }
}
