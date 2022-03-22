import React, { useEffect, useRef, useState } from 'react'

import { FinalModalProps, NotificationType } from './types'
import { getIcon, getModalClassName } from './util'

export function Modal({
	children,
	removeThisFromDom,
	labelConfirm = 'Accept',
	labelDecline = 'Decline',
	onConfirm,
	onDecline,
	title,
	type = NotificationType.SUCCESS,
}: FinalModalProps) {
	const hiddenClassName = 'opacity-0 mt-8 scale-95'
	const visibleClassName = 'opacity-100 mt-0 scale-100'

	const [transition, setTransition] = useState(hiddenClassName)
	const ref = useRef<null | HTMLElement>(null)

	const className = getModalClassName(type) + ' ' + transition
	const onDismiss = () => {
		if (onDecline) onDecline()
		setTransition(hiddenClassName)
	}
	const onConfirmFinal = () => {
		if (onConfirm) onConfirm()
		setTransition(hiddenClassName)
	}

	useEffect(() => {
		setTransition(visibleClassName)
	}, [])

	useEffect(() => {
		const timeOut =
			transition === hiddenClassName
				? setTimeout(() => {
						if (ref.current) removeThisFromDom()
				  }, 500)
				: null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [transition])

	return (
		<aside {...{ className }} data-testid="modal-component" ref={ref}>
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
			{(onConfirm || onDecline) && (
				<footer>
					{onConfirm && (
						<button
							onClick={onConfirmFinal}
							className="confirm"
							data-testid="confirm-button"
						>
							{labelConfirm}
						</button>
					)}
					{onDecline && (
						<button
							onClick={onDismiss}
							className="decline"
							data-testid="decline-button"
						>
							{labelDecline}
						</button>
					)}
				</footer>
			)}
		</aside>
	)
}
