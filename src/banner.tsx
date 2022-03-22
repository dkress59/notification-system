import React, { useEffect, useState } from 'react'

import { FinalBannerProps, NotificationType } from './types'
import { getBannerClassName, getIcon } from './util'

export function Banner({
	autoHide = false,
	children,
	removeThisFromDom,
	title,
	type = NotificationType.SUCCESS,
}: FinalBannerProps) {
	const autoHideAfterMs = 3000
	const hiddenClassName = 'opacity-0 scale-y-0'
	const visibleClassName = 'opacity-100 scale-y-100'

	const [transition, setTransition] = useState(hiddenClassName)

	const className = getBannerClassName(type) + ' ' + transition
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
		<aside {...{ className }} data-testid="banner-component">
			{title && <h4>{title}</h4>}
			<span className="icon" data-testid="banner-icon">
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
