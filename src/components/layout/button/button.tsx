import { changeVisibleCreate } from '../../../redux/store/create'
import { useDispatch } from 'react-redux'
import './button.scss'

export const Button = () => {

    const dispatch = useDispatch()
    const connectionRoom = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('connection')
    }

    const createRoom = () => {
        dispatch(changeVisibleCreate({
            open: true,
            callback: () => {}
        }))
    }

    return  <div className='button-container button-container_column'>
        <button className='button-create' onClick={createRoom}>
            создать комнату
        </button>
        <button className='button-create' onClick={connectionRoom}>
            подключиться
        </button>
    </div>
}