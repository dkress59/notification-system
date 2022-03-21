import React from 'react'

import { NotificationType } from './types'

export function getClassName(type: NotificationType) {
	if (type === NotificationType.INFO)
		return 'custom-toast custom-toast-type-info'
	if (type === NotificationType.ERROR)
		return 'custom-toast custom-toast-type-error'
	if (type === NotificationType.WARNING)
		return 'custom-toast custom-toast-type-warning'
	return 'custom-toast custom-toast-type-success'
}

export function getIcon(type: NotificationType) {
	if (type === NotificationType.INFO) return 'i'
	if (type === NotificationType.ERROR)
		return (
			<span className="text-xl inline-block -mt-1 transform-gpu -rotate-12">
				&#9586;
			</span>
		)
	if (type === NotificationType.WARNING) return '!'
	return <>&#10003;</>
}
