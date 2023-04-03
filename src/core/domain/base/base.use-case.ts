export interface BaseUseCase<TModel> {
	run(...args: any[]): Promise<TModel>;
}
