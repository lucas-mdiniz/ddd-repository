import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repository-interface";
import ProductInterface from "../entity/produt.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
