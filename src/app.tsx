import React from 'react'

enum ToastType {
	SUCCESS = 'success',
	INFO = 'info',
	ERROR = 'error',
	WARNING = 'warning',
}

interface ToastProps {
	type?: ToastType
}

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

function Toast({ type = ToastType.SUCCESS }: ToastProps) {
	const className = getToastClassName(type)
	return (
		<aside {...{ className }}>
			<h4>Lorem Ipsum</h4>
			<span className="icon">{getToastIcon(type)}</span>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
				necessitatibus sunt quisquam officia quidem.
			</p>
			<span className="dismiss">&#x2715;</span>
		</aside>
	)
}

export function App() {
	return (
		<>
			<main>
				<h1>Webpack running!</h1>
			</main>
			<footer id="toast-wrapper">
				<Toast />
				<Toast type={ToastType.INFO} />
				<Toast type={ToastType.ERROR} />
				<Toast type={ToastType.WARNING} />
			</footer>
		</>
	)
}
