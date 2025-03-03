export class ProductExistException extends Error {
  constructor(productName: string) {
    super(`Ya existe un producto con este nombre: ${productName}`);
  }
}