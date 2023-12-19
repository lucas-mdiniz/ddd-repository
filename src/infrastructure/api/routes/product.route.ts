import express, { Request, Response } from "express";
import { CreateProductUsecase } from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUsecase(new ProductRepository());

  try {
    const productDTO: InputCreateProductDto = {
      type: "a",
      name: req.body.name,
      price: req.body.price,
    };

    const output = await usecase.execute(productDTO);
    res.send(output);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
