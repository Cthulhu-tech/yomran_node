import { changeVisibleCreate } from '../../redux/store/create'
import { InputPassword } from '../input/inputPassword'
import { useWindow } from '../../hook/useWindow'
import { useDispatch } from 'react-redux'
import { Input } from '../input/input'
import './create.scss'

export const Create = () => {

    const wide = useWindow(760)
    const dispatch = useDispatch()
    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => event?.preventDefault()

    const closeRoom = () => {
        dispatch(changeVisibleCreate({
            open: false,
            callback: () => {}
        }))
    }

    const createRoom = () => {
        // const hello_data = g.call('createRoom', {host: document.location.port})
    }

    return  <form onSubmit={handlerSubmit} className={wide ? "form-container shadow_right" : "form-container"}>
            <div className='close-wrapper'>
                <div className='close-button animation-background_medium' onClick={closeRoom}>
                    <div className='burger-container__button open'></div>
                </div>
            </div>
        <div className='input-container input-flex'>
            <Input />
            <InputPassword/>
        </div>
        <button className='button-create' type="submit" onClick={createRoom}>Создать</button>
    </form>
}