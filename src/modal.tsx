import React, { useEffect, useState } from 'react'

import { FinalNotificationProps, NotificationType } from './types'
import { getClassName, getIcon } from './util'

export function Modal({
	autoHide = false,
	children,
	removeToastFromDom,
	type = NotificationType.SUCCESS,
}: FinalNotificationProps) {
	const hiddenClassName = 'opacity-0 mt-8'
	const visibleClassName = 'opacity-100 mt-0'

	const [transition, setTransition] = useState(hiddenClassName)

	const className = getClassName(type) + ' ' + transition
	const onDismiss = () => setTransition(hiddenClassName)

	useEffect(() => {
		setTransition(visibleClassName)
		const timeOut = autoHide ? setTimeout(() => onDismiss(), 3000) : null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [])

	useEffect(() => {
		const timeOut =
			transition === hiddenClassName
				? setTimeout(() => removeToastFromDom(), 500)
				: null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [transition])

	return (
		<aside {...{ className }} data-testid="toast-component">
			<h4>Lorem Ipsum</h4>
			<span className="icon" data-testid="toast-icon">
				{getIcon(type)}
			</span>
			<div>{children}</div>
			{!autoHide && (
				<span
					className="dismiss"
					data-testid="dismiss-button"
					onClick={() => onDismiss()}
				>
					&#x2715;
				</span>
			)}
		</aside>
	)
}
