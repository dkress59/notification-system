import React, { useContext } from 'react'

import { NotificationContext } from './context'
import { NotificationType } from './types'

const demoTitle = 'Lorem Ipsum'
const demoContent = (
	<>
		Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
		necessitatibus sunt quisquam officia quidem.
	</>
)

export function DemoApp() {
	const { spawnToast, spawnModal } = useContext(NotificationContext)

	return (
		<main className="flex">
			<article className="w-1/2">
				<br />
				<br />
				<br />
				<h1>Webpack Development Server is running!</h1>
				<button
					data-testid="spawn-success-toast"
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
					data-testid="spawn-autHide-toast"
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
					data-testid="spawn-info-toast"
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: NotificationType.INFO,
							children: demoContent,
						})
					}
				>
					Spawn an info toast
				</button>
				<br />
				<button
					data-testid="spawn-error-toast"
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: NotificationType.ERROR,
							children: demoContent,
						})
					}
				>
					Spawn an error toast
				</button>
				<br />
				<button
					data-testid="spawn-warning-toast"
					onClick={() =>
						spawnToast({
							title: demoTitle,
							type: NotificationType.WARNING,
							children: demoContent,
						})
					}
				>
					Spawn a warning toast
				</button>
				<br />
			</article>
			<article className="w-1/2">
				<br />
				<br />
				<br />
				<h1>Webpack Development Server is running!</h1>
				<button
					data-testid="spawn-success-modal"
					onClick={() =>
						spawnModal({
							title: demoTitle,
							children: demoContent,
						})
					}
				>
					Spawn a success modal
				</button>
				<br />
				<button
					data-testid="spawn-info-modal"
					onClick={() =>
						spawnModal({
							title: demoTitle,
							type: NotificationType.INFO,
							children: demoContent,
						})
					}
				>
					Spawn an info modal
				</button>
				<br />
				<button
					data-testid="spawn-error-modal"
					onClick={() =>
						spawnModal({
							title: demoTitle,
							type: NotificationType.ERROR,
							children: demoContent,
						})
					}
				>
					Spawn an error modal
				</button>
				<br />
				<button
					data-testid="spawn-warning-modal"
					onClick={() =>
						spawnModal({
							title: demoTitle,
							type: NotificationType.WARNING,
							children: demoContent,
						})
					}
				>
					Spawn a warning modal
				</button>
				<br />
			</article>
		</main>
	)
}
