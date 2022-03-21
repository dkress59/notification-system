import { createContext } from 'react'

import { NotificationContextType } from './types'

const initialNotificationContext = {
	toasts: [],
	spawnToast: () => {},
	modals: [],
	spawnModal: () => {},
} as NotificationContextType

export const NotificationContext = createContext(initialNotificationContext)
