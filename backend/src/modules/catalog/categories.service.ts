import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { slugify } from './utils/slug.util';

@Injectable()
export class CategoriesService implements OnModuleInit {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultCategories();
  }

  async create(managerId: string, dto: CreateCategoryDto) {
    const slug = dto.slug ?? slugify(dto.name);
    if (!slug) {
      throw new ConflictException('Category name must produce a valid slug.');
    }

    await this.ensureUniqueNameAndSlug(dto.name, slug);

    const category = await this.categoriesRepo.save(
      this.categoriesRepo.create({
        name: dto.name,
        slug,
        tagline: dto.tagline ?? null,
        description: dto.description ?? null,
        imageUrl: dto.imageUrl ?? null,
        displayOrder: dto.displayOrder ?? 0,
        isActive: dto.isActive ?? true,
        createdById: managerId,
      }),
    );

    this.logger.log(
      `Category created: ${category.name} [${category.id}] by ${managerId}`,
    );

    return {
      message: 'Category created successfully.',
      category,
    };
  }

  async findAll() {
    const categories = await this.categoriesRepo.find({
      order: { createdAt: 'DESC' },
    });

    const counts = await this.productsRepo
      .createQueryBuilder('product')
      .select('product.category_id', 'categoryId')
      .addSelect('COUNT(*)', 'count')
      .groupBy('product.category_id')
      .getRawMany<{ categoryId: string; count: string }>();

    const countMap = new Map(
      counts.map((row) => [row.categoryId, parseInt(row.count, 10)]),
    );

    return {
      message: 'Categories retrieved successfully.',
      categories: categories.map((category) => ({
        ...category,
        productCount: countMap.get(category.id) ?? 0,
      })),
    };
  }

  async findOne(id: string) {
    const category = await this.findCategoryOrFail(id);
    const productCount = await this.productsRepo.count({
      where: { categoryId: id },
    });

    return {
      message: 'Category retrieved successfully.',
      category: { ...category, productCount },
    };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.findCategoryOrFail(id);

    const nextName = dto.name ?? category.name;
    const nextSlug = dto.slug ?? (dto.name ? slugify(dto.name) : category.slug);

    if (nextName !== category.name || nextSlug !== category.slug) {
      await this.ensureUniqueNameAndSlug(nextName, nextSlug, id);
    }

    Object.assign(category, {
      name: nextName,
      slug: nextSlug,
      tagline: dto.tagline ?? category.tagline,
      description: dto.description ?? category.description,
      imageUrl: dto.imageUrl ?? category.imageUrl,
      displayOrder: dto.displayOrder ?? category.displayOrder,
      isActive: dto.isActive ?? category.isActive,
    });

    const saved = await this.categoriesRepo.save(category);
    this.logger.log(`Category updated: ${saved.name} [${saved.id}]`);

    return {
      message: 'Category updated successfully.',
      category: saved,
    };
  }

  async remove(id: string) {
    const category = await this.findCategoryOrFail(id);
    const productCount = await this.productsRepo.count({
      where: { categoryId: id },
    });

    if (productCount > 0) {
      throw new ConflictException(
        `Cannot delete category "${category.name}": ${productCount} product(s) still linked. Delete products first.`,
      );
    }

    await this.categoriesRepo.remove(category);
    this.logger.log(`Category deleted: ${category.name} [${category.id}]`);

    return {
      message: 'Category deleted successfully.',
      categoryId: id,
    };
  }

  async findCategoryOrFail(id: string): Promise<Category> {
    const category = await this.categoriesRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category "${id}" not found.`);
    }
    return category;
  }

  async findAllPublic() {
    const categories = await this.categoriesRepo.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
    return { message: 'Categories retrieved successfully.', categories };
  }

  private async seedDefaultCategories() {
    const count = await this.categoriesRepo.count();
    if (count > 0) return;

    const defaults = [
      { name: 'Jewelry', tagline: 'Luxury Redefined', order: 1 },
      { name: 'Accessories', tagline: 'Timeless Elegance', order: 2 },
      { name: 'Souvenirs', tagline: 'Memories in Metal', order: 3 },
      { name: 'Sanitaryware', tagline: 'Premium Finishes', order: 4 },
      { name: 'Stationery', tagline: 'Executive Collection', order: 5 },
      { name: 'Construction Materials', tagline: 'Built to Last', order: 6 },
    ];

    const systemId = '00000000-0000-0000-0000-000000000001';

    for (const item of defaults) {
      await this.categoriesRepo.save(
        this.categoriesRepo.create({
          name: item.name,
          slug: slugify(item.name),
          tagline: item.tagline,
          displayOrder: item.order,
          isActive: true,
          createdById: systemId,
        }),
      );
    }

    this.logger.log('Seeded default categories from design.');
  }

  private async ensureUniqueNameAndSlug(
    name: string,
    slug: string,
    excludeId?: string,
  ): Promise<void> {
    const existingByName = await this.categoriesRepo.findOne({ where: { name } });
    if (existingByName && existingByName.id !== excludeId) {
      throw new ConflictException(
        `Category name "${name}" is already in use.`,
      );
    }

    const existingBySlug = await this.categoriesRepo.findOne({ where: { slug } });
    if (existingBySlug && existingBySlug.id !== excludeId) {
      throw new ConflictException(`Category slug "${slug}" is already in use.`);
    }
  }
}
