import {LOGIN} from './actiontype'

export const addlogin = (ma) =>
{
    return{
        type: LOGIN,
        matho: ma,
    }
}