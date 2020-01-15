import { ImageProvider } from '../contracts/image-provider.service';
import { GifModel } from '../contracts/gif.model';

export class GifImageProvider implements ImageProvider<GifModel> {
    provide(resource: GifModel): HTMLImageElement {
        const img = new Image();
        img.src = resource.src;
        img.classList.add('card-img-top');
        img.alt = resource.title;
        return img;
    }
}
