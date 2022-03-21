import React, { useEffect, useState } from 'react'

import { FinalToastProps, ToastType } from './types'

function getToastClassName(type: ToastType) {
	if (type === ToastType.INFO) return 'custom-toast custom-toast-type-info'
	if (type === ToastType.ERROR) return 'custom-toast custom-toast-type-error'
	if (type === ToastType.WARNING)
		return 'custom-toast custom-toast-type-warning'
	return 'custom-toast custom-toast-type-success'
}

function getToastIcon(type: ToastType) {
	if (type === ToastType.INFO) return 'i'
	if (type === ToastType.ERROR)
		return (
			<span className="text-xl inline-block -mt-1 transform-gpu -rotate-12">
				&#9586;
			</span>
		)
	if (type === ToastType.WARNING) return '!'
	return <>&#10003;</>
}

export function Toast({
	autoHide = false,
	children,
	removeToastFromDom,
	type = ToastType.SUCCESS,
}: FinalToastProps) {
	const [opacity, setOpacity] = useState('opacity-0')

	const className = getToastClassName(type) + ' ' + opacity

	const onDismiss = () => {
		setOpacity('opacity-0')
	}

	useEffect(() => {
		setOpacity('opacity-100')
		const timeOut = autoHide ? setTimeout(() => onDismiss(), 3000) : null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [])

	useEffect(() => {
		const timeOut =
			opacity === 'opacity-0'
				? setTimeout(() => removeToastFromDom(), 500)
				: null
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [opacity])

	return (
		<aside {...{ className }} data-testid="toast-component">
			<h4>Lorem Ipsum</h4>
			<span className="icon" data-testid="toast-icon">
				{getToastIcon(type)}
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
