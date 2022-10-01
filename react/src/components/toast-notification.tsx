import React, { useEffect, useRef } from 'react'

import { ToastNotification as HTMLToastNotification } from ':core/components'
import { NotificationEvent } from ':core/types'

import { ToastNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export function ToastNotification({
	autoHide,
	autoHideAfterMs,
	children,
	headline,
	onDismiss,
	type,
	ref,
}: ToastNotificationProps) {
	const internalRef = useRef<null | HTMLToastNotification>(null)

	useEffect(() => {
		const currentRef = getCurrentRef<HTMLToastNotification>({
			internalRef,
			ref,
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
			ref={ref ?? internalRef}
			type={type}
		>
			{children}
		</toast-notification>
	)
}
