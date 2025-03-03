// 📂 src/modules/product/application/exceptions/product-not-found.exception.ts
export class ProductNotFoundException extends Error {
  constructor(productId: string) {
    super(`Producto con ID ${productId} no encontrado`);
  }
}
