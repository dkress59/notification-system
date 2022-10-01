import React from 'react'

import { NotificationAreaProps } from '../types'

export function NotificationArea({ children, ref }: NotificationAreaProps) {
	return <notification-area ref={ref}>{children}</notification-area>
}
