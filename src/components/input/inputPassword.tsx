import { useState, useEffect } from 'react'
import { Image } from '../image/image'
import './input.scss'

import onvisible from '../../assets/onvisible.svg'
import visible from '../../assets/visible.svg'
import { ImageType } from '../image/type'

export const InputPassword = () => {

    const [show, setShow] = useState(false)
    const [imgData, setImageData] = useState<ImageType>({width: '22px', alt: 'show', src: onvisible})

    useEffect(() => {setImageData({width: '22px', alt: 'show', src: show ? visible : onvisible})}, [show])

    const showHandler = () => setShow(!show)

    return  <div className='input-container'>
                <input type={show ? "text" : "password"} className="input-border_rigth input"/>
                <div onClick={showHandler} className="image-wrapper_border">
                    <Image {...imgData}/>
                </div>
        </div>
}