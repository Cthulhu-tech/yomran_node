import { Action, RoomsType } from "../interface"

const defaultState = [
        {   id: 1,
            name: 'very_long_room_name',
            creator: 'admin',
            img: null,
            lastMessage: 'very_long_room_new-message room_1',
            lastMessageDate: '1666528215063',
            lastMessageUserImg: ''
        },
        {   id: 2,
            name: 'small',
            creator: 'admin',
            img: '',
            lastMessage: 'new-message',
            lastMessageDate: '1666528215463',
            lastMessageUserImg: ''
        },
]

const addRoomsState = "add_state_rooms"
const updateRoomsState = "update_state_rooms"
const deleteRoomsState = "delete_state_rooms"

export const roomsStore = (state = defaultState, action:Action<string, RoomsType[] | RoomsType>) => {
    switch (action.type){
        case updateRoomsState: 
            return [...state, ...action.payload as RoomsType[]]
        case deleteRoomsState:
            return [...state.filter((element) => element.id !== (action.payload as RoomsType).id)]
        case addRoomsState: 
            return state.push(action.payload as RoomsType)
        default:
            return state
    }
}

export const addRooms = (payload: RoomsType) => ({ type: updateRoomsState, payload });
export const deleteRooms = (payload: RoomsType) => ({ type: deleteRoomsState, payload });
export const updateRooms = (payload: RoomsType[]) => ({ type: updateRoomsState, payload });
