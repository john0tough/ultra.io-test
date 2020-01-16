import { ImageFormatter } from '../contracts/image-formatter.service';
import { GifModel } from '../contracts/gif.model';

export class GifImageProvider implements ImageFormatter<GifModel> {
    provide(resource: GifModel): HTMLImageElement {
        const img = new Image();
        img.src = resource.src;
        img.classList.add('card-img-top');
        img.alt = resource.title;
        return img;
    }
}
