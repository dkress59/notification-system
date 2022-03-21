import React, { useEffect, useState } from 'react'

import { FinalModalProps, NotificationType } from './types'
import { getIcon, getModalClassName } from './util'

export function Modal({
	children,
	removeThisFromDom,
	labelAccept,
	labelDecline,
	onAccept,
	onDecline,
	title,
	type = NotificationType.SUCCESS,
}: FinalModalProps) {
	const hiddenClassName = 'opacity-0 mt-8 scale-95'
	const visibleClassName = 'opacity-100 mt-0 scale-100'

	const [transition, setTransition] = useState(hiddenClassName)

	const className = getModalClassName(type) + ' ' + transition
	const onDismiss = () => {
		if (onDecline) onDecline()
		setTransition(hiddenClassName)
	}

	useEffect(() => {
		setTransition(visibleClassName)
	}, [])

	useEffect(() => {
		const timeOut =
			transition === hiddenClassName
				? setTimeout(() => removeThisFromDom(), 500)
				: null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [transition])

	return (
		<aside {...{ className }} data-testid="modal-component">
			{title && <h4>{title}</h4>}
			<span className="icon" data-testid="modal-icon">
				{getIcon(type)}
			</span>
			<div>{children}</div>
			<span
				className="dismiss"
				data-testid="dismiss-button"
				onClick={onDismiss}
			>
				&#x2715;
			</span>
			{onAccept && (
				<button onClick={onAccept} data-testid="accept-button">
					{labelAccept ?? 'Accept'}
				</button>
			)}
			{onDecline && (
				<button onClick={onDismiss} data-testid="decline-button">
					{labelDecline ?? 'Decline'}
				</button>
			)}
		</aside>
	)
}
