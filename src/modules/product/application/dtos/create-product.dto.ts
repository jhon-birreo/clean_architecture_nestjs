// 📂 src/modules/product/application/dto/create-product.dto.ts
export class CreateProductDTO {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number
  ) {}
}
