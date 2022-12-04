import { ImageType } from "./type"

export const Image = (type: ImageType) => {

    return <div className={type.src ? 'image-wrapper' : 'image-background'} style={{maxWidth: type.width, minWidth: type.width, height: type.width}}>
        {type.src && <img className={'image ' + type.className} src={type.src} alt={type.alt} style={{maxWidth: type.width, minWidth: type.width, height: type.width}} />}
    </div>
}