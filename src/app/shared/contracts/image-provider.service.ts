export abstract class ImageProvider<TModel> {
    abstract provide(resource: TModel): HTMLImageElement;
}