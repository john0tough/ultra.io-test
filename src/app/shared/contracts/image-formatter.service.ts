export abstract class ImageFormatter<TModel> {
    abstract provide(resource: TModel): HTMLImageElement;
}