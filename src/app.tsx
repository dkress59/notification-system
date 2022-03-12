import React from 'react'

import { Toast } from './toast'
import { ToastType } from './types'

export function App() {
	return (
		<>
			<main>
				<br />
				<br />
				<br />
				<h1>Webpack Development Server is running!</h1>
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
