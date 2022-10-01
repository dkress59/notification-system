import React, { useEffect, useRef } from 'react'

import { BannerNotification as HTMLBannerNotification } from ':core/components'
import { NotificationEvent } from ':core/types'

import { BannerNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export function BannerNotification({
	autoHide,
	autoHideAfterMs,
	children,
	headline,
	onDismiss,
	type,
	ref,
}: BannerNotificationProps) {
	const internalRef = useRef<null | HTMLBannerNotification>(null)

	useEffect(() => {
		const currentRef = getCurrentRef<HTMLBannerNotification>({
			internalRef,
			ref,
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
			ref={ref ?? internalRef}
			type={type}
		>
			{children}
		</banner-notification>
	)
}
