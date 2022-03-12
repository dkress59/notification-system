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
				<Toast>
					Lorem ipsum dolor sit amet consectetur adipisicing elit,
					facilis necessitatibus sunt quisquam officia quidem.
				</Toast>
				<Toast autoHide={true}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit,
					facilis necessitatibus sunt quisquam officia quidem.
				</Toast>
				<Toast type={ToastType.INFO}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit,
					facilis necessitatibus sunt quisquam officia quidem.
				</Toast>
				<Toast type={ToastType.ERROR}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit,
					facilis necessitatibus sunt quisquam officia quidem.
				</Toast>
				<Toast type={ToastType.WARNING}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit,
					facilis necessitatibus sunt quisquam officia quidem.
				</Toast>
			</footer>
		</>
	)
}
