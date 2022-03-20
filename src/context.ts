import { createContext } from 'react'

import { NotificationContextType } from './types'

const initialNotificationContext = {
	toasts: [],
	spawnToast: () => {},
} as NotificationContextType

export const NotificationContext = createContext(initialNotificationContext)
