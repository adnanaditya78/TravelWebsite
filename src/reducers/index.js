import {combineReducers} from 'redux'
import banner from './banner'
import promo from './promo'
import activity from './activity'
import auth from './auth'
import category from './category'
import image from './image'

export default combineReducers({
    promo,
    banner,
    activity,
    auth,
    category,
    image
})