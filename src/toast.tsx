import React, { useEffect, useState } from 'react'

import { ToastProps, ToastType } from './types'

function getToastClassName(type: ToastType) {
	if (type === ToastType.INFO) return 'sosafe-toast sosafe-toast-type-info'
	if (type === ToastType.ERROR) return 'sosafe-toast sosafe-toast-type-error'
	if (type === ToastType.WARNING)
		return 'sosafe-toast sosafe-toast-type-warning'
	return 'sosafe-toast sosafe-toast-type-success'
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

export function Toast({ type = ToastType.SUCCESS }: ToastProps) {
	const [opacity, setOpacity] = useState('opacity-0')
	const [display, setDisplay] = useState('block')

	const className = getToastClassName(type) + ' ' + opacity + ' ' + display

	useEffect(() => {
		setOpacity('opacity-100')
	}, [])

	useEffect(() => {
		let timeOut: NodeJS.Timeout | null = null
		if (opacity === 'opacity-0')
			timeOut = setTimeout(() => setDisplay('hidden'), 500)
		return () => {
			if (timeOut) clearTimeout(timeOut)
		}
	}, [opacity])

	return (
		<aside {...{ className }}>
			<h4>Lorem Ipsum</h4>
			<span className="icon">{getToastIcon(type)}</span>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
				necessitatibus sunt quisquam officia quidem.
			</p>
			<span className="dismiss" onClick={() => setOpacity('opacity-0')}>
				&#x2715;
			</span>
		</aside>
	)
}
