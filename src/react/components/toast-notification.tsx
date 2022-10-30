import React, { useEffect, useRef } from 'react'

import { HTMLToastNotificationElement } from '../../core/components'
import { NotificationEvent } from '../../core/types'
import { ToastNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export function ToastNotification({
	autoHide,
	autoHideAfterMs,
	children,
	headline,
	onDismiss,
	type,
	forwardRef,
}: ToastNotificationProps) {
	const internalRef = useRef<null | HTMLToastNotificationElement>(null)

	useEffect(() => {
		const currentRef = getCurrentRef<HTMLToastNotificationElement>({
			internalRef,
			ref: forwardRef,
		})!

		const dismissAction = onDismiss ?? (() => null)

		currentRef.addEventListener(
			NotificationEvent.TOAST_DISMISSED,
			dismissAction,
		)

		return () => {
			currentRef.removeEventListener(
				NotificationEvent.TOAST_DISMISSED,
				dismissAction,
			)
		}
	})

	return (
		<toast-notification
			auto-hide={!!autoHide}
			auto-hide-after-ms={autoHideAfterMs}
			headline={headline}
			ref={forwardRef ?? internalRef}
			type={type}
		>
			{children}
		</toast-notification>
	)
}
