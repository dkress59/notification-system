import React, { forwardRef, useEffect, useRef } from 'react'

import { NotificationEvent } from ':core/types'

import { ToastNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export const ToastNotification = forwardRef<
	HTMLToastNotificationElement,
	ToastNotificationProps
>(({ autoHide, autoHideAfterMs, children, headline, onDismiss, type }, ref) => {
	const internalRef = useRef<null | HTMLToastNotificationElement>(null)

	useEffect(() => {
		const currentRef = getCurrentRef({ internalRef, ref })!

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
			ref={ref ?? internalRef}
			type={type}
		>
			{children}
		</toast-notification>
	)
})
ToastNotification.displayName = 'ToastNotification'
