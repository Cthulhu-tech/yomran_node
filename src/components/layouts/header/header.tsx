import { ElectronWindow } from "../../../interface/electron"

import './header.scss'

declare const window: ElectronWindow

export const Header = () => {

    const close = () => window.api.closeAplication()
    const min = () => window.api.minAplication()
    const max = () => window.api.maxAplication()

    
    return <header className="header bg-indigo-500">
        <div className="header__drag">
            
        </div>
        <div className="header__icon-container">
                <div className="header__icon minimize hover:bg-indigo-100 before:hover:bg-indigo-500 before:bg-indigo-100" onClick={min}>
                    
                </div>
                <div className="header__icon maximize-min hover:bg-indigo-100 before:bg-indigo-100 after:hover:bg-indigo-500 before:hover:bg-indigo-500" onClick={max}>
                    
                </div>
                <div className="header__icon close hover:bg-indigo-100 before:bg-indigo-100 after:bg-indigo-100 after:hover:bg-indigo-500 before:hover:bg-indigo-500" onClick={close}>
                
                </div>
            </div>
    </header>
}