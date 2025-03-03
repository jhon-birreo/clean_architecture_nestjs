// 📂 src/modules/product/domain/value-objects/product-name.vo.ts
export class ProductNameVO {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length < 3) {
      throw new Error('El nombre del producto debe tener al menos 3 caracteres');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
