import React from 'react'

import { NotificationAreaProps } from '../types'

export function NotificationArea({
	children,
	forwardRef,
}: NotificationAreaProps) {
	return <notification-area ref={forwardRef}>{children}</notification-area>
}
