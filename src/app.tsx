import React from 'react'

import { useToast } from './hooks'
import { ToastType } from './types'
import { getCollectionMapper } from './util'

const demoTitle = 'Lorem Ipsum'
const demoContent = (
	<>
		Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
		necessitatibus sunt quisquam officia quidem.
	</>
)

export function App() {
	const { spawnToast, collection, removeToastFromDom } = useToast()

	return (
		<>
			<main>
				<br />
				<br />
				<br />
				<h1>Webpack Development Server is running!</h1>
				<button
					onClick={() =>
						spawnToast({
							title: demoTitle,
							children: demoContent,
						})
					}
				>
					Spawn a success toast
				</button>
				<br />
				<button
					onClick={() =>
						spawnToast({
							autoHide: true,
							title: demoTitle,
							children: demoContent,
						})
					}
				>
					Spawn an automatically hiding success toast
				</button>
				<br />
				<button
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: ToastType.INFO,
							children: demoContent,
						})
					}
				>
					Spawn an info toast
				</button>
				<br />
				<button
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: ToastType.ERROR,
							children: demoContent,
						})
					}
				>
					Spawn an error toast
				</button>
				<br />
				<button
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: ToastType.WARNING,
							children: demoContent,
						})
					}
				>
					Spawn a warning toast
				</button>
				<br />
			</main>
			<footer id="toast-wrapper">
				{collection.map(getCollectionMapper(removeToastFromDom))}
			</footer>
		</>
	)
}
