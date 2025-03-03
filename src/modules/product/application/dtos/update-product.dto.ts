// 📂 src/modules/product/application/dto/update-product.dto.ts
export class UpdateProductDTO {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly price?: number,
    public readonly stock?: number
  ) {}
}
