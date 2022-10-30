import React, { useEffect, useRef } from 'react'

import { HTMLModalNotificationElement } from '../../core/components'
import { NotificationEvent } from '../../core/types'
import { ModalNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export function ModalNotification({
	children,
	condition,
	headline,
	labelConfirm,
	labelDecline,
	onConfirm,
	onDecline,
	onDismiss,
	showConfirm,
	showDecline,
	type,
	forwardRef,
}: ModalNotificationProps) {
	const internalRef = useRef<null | HTMLModalNotificationElement>(null)

	useEffect(() => {
		const currentRef = getCurrentRef({ internalRef, ref: forwardRef })!

		const confirmAction = onConfirm ?? (() => null)
		const declineAction = onDecline ?? (() => null)
		const dismissAction = onDismiss ?? (() => null)

		currentRef.addEventListener(
			NotificationEvent.MODAL_CONFIRMED,
			confirmAction,
		)
		currentRef.addEventListener(
			NotificationEvent.MODAL_DECLINED,
			declineAction,
		)
		currentRef.addEventListener(
			NotificationEvent.MODAL_DISMISSED,
			dismissAction,
		)

		return () => {
			currentRef.removeEventListener(
				NotificationEvent.MODAL_CONFIRMED,
				confirmAction,
			)
			currentRef.removeEventListener(
				NotificationEvent.MODAL_DECLINED,
				declineAction,
			)
			currentRef.removeEventListener(
				NotificationEvent.MODAL_DISMISSED,
				dismissAction,
			)
		}
	})

	return (
		<modal-notification
			condition={condition}
			headline={headline}
			label-confirm={labelConfirm}
			label-decline={labelDecline}
			ref={forwardRef ?? internalRef}
			show-confirm={showConfirm ?? !!labelConfirm}
			show-decline={showDecline ?? !!labelDecline}
			type={type}
		>
			{children}
		</modal-notification>
	)
}
