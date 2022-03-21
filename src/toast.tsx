import React, { useEffect, useState } from 'react'

import { FinalToastProps, NotificationType } from './types'
import { getIcon, getToastClassName } from './util'

export function Toast({
	autoHide = false,
	children,
	removeThisFromDom,
	title,
	type = NotificationType.SUCCESS,
}: FinalToastProps) {
	const autoHideAfterMs = 3000
	const hiddenClassName = 'opacity-0'
	const visibleClassName = 'opacity-100'

	const [transition, setTransition] = useState(hiddenClassName)

	const className = getToastClassName(type) + ' ' + transition
	const onDismiss = () => setTransition(hiddenClassName)

	useEffect(() => {
		setTransition(visibleClassName)
		const timeOut = autoHide
			? setTimeout(() => onDismiss(), autoHideAfterMs)
			: null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
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
		<aside {...{ className }} data-testid="toast-component">
			{title && <h4>{title}</h4>}
			<span className="icon" data-testid="toast-icon">
				{getIcon(type)}
			</span>
			<div>{children}</div>
			{!autoHide && (
				<span
					className="dismiss"
					data-testid="dismiss-button"
					onClick={onDismiss}
				>
					&#x2715;
				</span>
			)}
		</aside>
	)
}
