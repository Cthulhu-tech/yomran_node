import { changeVisiblePopup } from '../../../redux/store/popup'
import { changeVisibleAside } from '../../../redux/store/aside'
import { RoomsType, StoreData } from '../../../redux/interface'
import { useLocation, useNavigate } from 'react-router-dom'
import { dataFormater } from '../../../utils/dataFormater'
import { deleteRooms } from '../../../redux/store/rooms'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from '../../image/image'
import './rooms.scss'
import { changeVisibleCreate } from '../../../redux/store/create';

export const Rooms = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const rooms = useSelector((store: StoreData) => store.roomsStore)
    const openPopup = useSelector((store: StoreData) => store.visiblePopup.open)

    const deleteRoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, room: RoomsType) => {
        event.stopPropagation()
        dispatch(changeVisiblePopup({
            open: openPopup, 
            callback: () => {
                dispatch(deleteRooms(room))
                location.pathname === '/room/' + room.name && navigate('/')
            }, 
            message: `Удалить все данные из комнаты ${room.id}?`,
            leftButton: 'Удалить',
            rightButton: 'Отмена'
        }))
    }

    const openRoom = (href: string) => {
        navigate('/room/' + href)
        dispatch(changeVisibleAside(false))
        dispatch(changeVisibleCreate({open: false, callback: () => {}}))
    }

    return <section className="rooms-container">
        {rooms.map((room) => {
        return  <section className="room-wrapper room_open" key={room.id} onClick={() => openRoom(room.name)}>
                    <div className='room-wrapper_data_open'>
                        <Image {...{width: '28px', src: room.img, alt: room.name, className: "room-image"}} />
                        <p className='room__message_name room__message room__message_name_open'>{room.name}</p>
                        <p className='room__message room__message_last-message_data'>{dataFormater(new Date(+room.lastMessageDate))}</p>
                        <div className='close-button animation-background_medium' onClick={(event) => deleteRoom(event, room)}>
                            <div className='burger-container__button open'/>
                        </div>
                    </div>
                    <div className='room-wrapper_data_open'>
                        <Image {...{width: '28px', src: room.lastMessageUserImg, alt: room.name, className: "room-image"}} />
                        <p className='room__message room__message_last-message'>{room.lastMessage}</p>
                    </div>
            </section>
        })}
    </section>
}