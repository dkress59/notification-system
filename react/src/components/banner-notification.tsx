import React, { forwardRef, useEffect, useRef } from 'react'

import { NotificationEvent } from ':core/types'

import { BannerNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export const BannerNotification = forwardRef<
	HTMLBannerNotificationElement,
	BannerNotificationProps
>(({ autoHide, autoHideAfterMs, children, headline, onDismiss, type }, ref) => {
	const internalRef = useRef<null | HTMLBannerNotificationElement>(null)

	useEffect(() => {
		const currentRef = getCurrentRef({ internalRef, ref })!

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
			ref={ref ?? internalRef}
			type={type}
		>
			{children}
		</banner-notification>
	)
})
BannerNotification.displayName = 'BannerNotification'
