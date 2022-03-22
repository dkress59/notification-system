import { createContext } from 'react'

import { NotificationContextType } from './types'

const initialNotificationContext = {
	banners: [],
	modals: [],
	toasts: [],
	spawnBanner: () => {},
	spawnModal: () => {},
	spawnToast: () => {},
} as NotificationContextType

export const NotificationContext = createContext(initialNotificationContext)
