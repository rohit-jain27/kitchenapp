import * as ACTIONS from '../actions/types';


const initialState = {
    newPoll: {
        name: '',
        eventDate: '',
        metrics: [
            {
                name: '',
                description: '',
                imageUrl: ''
            },
            {
                name: '',
                description: '',
                imageUrl: ''
            }
        ]
    }
}

export default function(state = initialState, action) {

    switch (action.type) {
        case ACTIONS.UPDATE_NEW_POLL_FIELD:

            if (action.metricNumber && action.metricNumber > 0) {
                let newState = state;
                newState.newPoll.metrics[action.metricNumber][action.field] = action.text;
                return newState;
            }

            return {
                ...state,
                newPoll: {
                    ...state.newPoll,
                    [action.field]: action.text,
                }
            }

        default:
            return state;
    }
}