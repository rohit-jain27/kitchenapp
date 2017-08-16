import * as ACTIONS from './types'
import { makeActionCreator } from '../libs/utils'

export const updateNewPoll = makeActionCreator(ACTIONS.UPDATE_NEW_POLL_FIELD, 'field', 'text', 'metricNumber')