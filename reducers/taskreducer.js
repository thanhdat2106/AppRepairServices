import {LOGIN} from '../actions/actiontype';

const taskreduer = (task=[, action])=> {
    switch (action.type) {
        case LOGIN:
            return[
                ...tasks,
                {
                    matho: action.matho
                }
            ]
            
    
        default:
            return tasks;
    }
}

export default taskreduer;