// 📂 src/modules/product/domain/value-objects/price.vo.ts
export class PriceVO {
  private readonly _value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
