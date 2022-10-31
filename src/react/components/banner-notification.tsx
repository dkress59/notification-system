import React, { useEffect, useRef } from 'react'

import { HTMLBannerNotificationElement } from '../../core/components'
import { NotificationEvent } from '../../core/types'
import { BannerNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export function BannerNotification({
	autoHide,
	autoHideAfterMs,
	children,
	headline,
	onDismiss,
	type,
	forwardRef,
}: BannerNotificationProps) {
	const internalRef = useRef<null | HTMLBannerNotificationElement>(null)

	useEffect(() => {
		const currentRef = getCurrentRef<HTMLBannerNotificationElement>({
			internalRef,
			ref: forwardRef,
		})!

		const dismissAction = onDismiss ?? (() => null)

		currentRef.addEventListener(
			NotificationEvent.BANNER_DISMISSED,
			dismissAction,
		)

		return () => {
			currentRef.removeEventListener(
				NotificationEvent.BANNER_DISMISSED,
				dismissAction,
			)
		}
	})

	return (
		<banner-notification
			auto-hide={!!autoHide}
			auto-hide-after-ms={autoHideAfterMs}
			headline={headline}
			ref={forwardRef ?? internalRef}
			type={type}
		>
			{children}
		</banner-notification>
	)
}
