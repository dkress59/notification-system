import React, { forwardRef, useEffect, useRef } from 'react'

import { Elements } from '../../../core/src/components'
import { NotificationEvent } from '../../../core/src/types'
import { ModalNotificationProps } from '../types'
import { getCurrentRef } from '../util'

export const ModalNotification = forwardRef<
	Elements.HTMLModalNotificationElement,
	ModalNotificationProps
>(
	(
		{
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
		},
		ref,
	) => {
		const internalRef =
			useRef<null | Elements.HTMLModalNotificationElement>(null)

		useEffect(() => {
			const currentRef = getCurrentRef({ internalRef, ref })!

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
				ref={ref ?? internalRef}
				show-confirm={showConfirm ?? !!labelConfirm}
				show-decline={showDecline ?? !!labelDecline}
				type={type}
			>
				{children}
			</modal-notification>
		)
	},
)
ModalNotification.displayName = 'ModalNotification'
