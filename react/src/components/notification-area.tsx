import React, { forwardRef } from 'react'

import { NotificationAreaProps } from '../types'

export const NotificationArea = forwardRef<
	HTMLNotificationAreaElement,
	NotificationAreaProps
>(({ children }, ref) => {
	return <notification-area ref={ref}>{children}</notification-area>
})
NotificationArea.displayName = 'NotificationArea'
