import React, { forwardRef } from 'react'

import { Elements } from '../../../core/src/components'
import { NotificationAreaProps } from '../types'

export const NotificationArea = forwardRef<
	Elements.HTMLNotificationAreaElement,
	NotificationAreaProps
>(({ children }, ref) => {
	return <notification-area ref={ref}>{children}</notification-area>
})
NotificationArea.displayName = 'NotificationArea'
