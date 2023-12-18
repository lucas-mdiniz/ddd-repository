import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputFindProductDto } from "./find.product.dto";

export default class FindProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(productId: string): Promise<OutputFindProductDto> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
