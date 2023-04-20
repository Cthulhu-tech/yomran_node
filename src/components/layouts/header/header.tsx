import { ElectronWindow } from "../../../interface/electron"
import { useState } from "react"

import './header.scss'

declare const window: ElectronWindow

export const Header = () => {

    const close = () => window.api.closeAplication()
    const min = () => window.api.minAplication()
    const max = () => {
        setFullscreen((fullscreen) => !fullscreen)
        window.api.maxAplication()
    }

    const [fullscreen, setFullscreen] = useState(false)
    
    return <header className="header">
        <div className="header__drag">
            
        </div>
        <div className="header__icon-container">
                <div className="header__icon minimize" onClick={min}>
                    
                </div>
                <div className={fullscreen ? "header__icon maximize-max" : "header__icon maximize-min"} onClick={max}>
                    
                </div>
                <div className="header__icon close" onClick={close}>
                
                </div>
            </div>
    </header>
}