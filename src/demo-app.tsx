import React, { useContext } from 'react'

import { NotificationContext } from './context'
import { BannerArea } from './hooks'
import { NotificationType } from './types'

const demoBannerTitle = undefined
const demoBannerContent = (
	<>
		Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
		necessitatibus sunt quisquam officia quidem.
	</>
)

const demoModalTitle = 'Lorem Ipsum'
const demoModalContent = (
	<>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum culpa
		facilis praesentium iusto officia tempora exercitationem explicabo, id
		autem delectus natus consequuntur sed numquam. Eligendi voluptatem
		repellendus sed perferendis illo. Lorem, ipsum dolor sit amet
		consectetur adipisicing elit. Totam, delectus nemo. Voluptatibus dolore,
		aliquam totam harum deserunt a possimus iste, tempora id tempore
		exercitationem, laudantium laboriosam! Voluptatem deleniti quisquam
		eius.
	</>
)

const demoToastTitle = 'Lorem Ipsum'
const demoToastContent = (
	<>
		Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis
		necessitatibus sunt quisquam officia quidem.
	</>
)

const onButtonClick = () => {
	// eslint-disable-next-line no-console
	console.log({ message: 'Button clicked!' })
}

export function DemoApp() {
	const { spawnBanner, spawnModal, spawnToast } =
		useContext(NotificationContext)

	return (
		<main className="flex flex-wrap" id="demo-app">
			<BannerArea />
			<article className="w-1/2 flex-grow">
				<h1>Try out the banner component!</h1>
				<button
					data-testid="spawn-success-banner"
					onClick={() =>
						spawnBanner({
							title: demoBannerTitle,
							children: demoBannerContent,
						})
					}
				>
					Spawn a success banner
				</button>
				<br />
				<button
					data-testid="spawn-autHide-banner"
					onClick={() =>
						spawnBanner({
							autoHide: true,
							title: demoBannerTitle,
							children: demoBannerContent,
						})
					}
				>
					Spawn an automatically hiding success banner
				</button>
				<br />
				<button
					data-testid="spawn-info-banner"
					onClick={() =>
						spawnBanner({
							title: demoBannerTitle,
							type: NotificationType.INFO,
							children: demoBannerContent,
						})
					}
				>
					Spawn an info banner
				</button>
				<br />
				<button
					data-testid="spawn-error-banner"
					onClick={() =>
						spawnBanner({
							title: demoBannerTitle,
							type: NotificationType.ERROR,
							children: demoBannerContent,
						})
					}
				>
					Spawn an error banner
				</button>
				<br />
				<button
					data-testid="spawn-warning-banner"
					onClick={() =>
						spawnBanner({
							title: demoBannerTitle,
							type: NotificationType.WARNING,
							children: demoBannerContent,
						})
					}
				>
					Spawn a warning banner
				</button>
				<br />
			</article>
			<article className="w-1/2 flex-grow">
				<h1>Try out the toast component!</h1>
				<button
					data-testid="spawn-success-toast"
					onClick={() =>
						spawnToast({
							title: demoToastTitle,
							children: demoToastContent,
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
							title: demoToastTitle,
							children: demoToastContent,
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
							title: demoToastTitle,
							type: NotificationType.INFO,
							children: demoToastContent,
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
							title: demoToastTitle,
							type: NotificationType.ERROR,
							children: demoToastContent,
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
							title: demoToastTitle,
							type: NotificationType.WARNING,
							children: demoToastContent,
						})
					}
				>
					Spawn a warning toast
				</button>
				<br />
			</article>
			<article className="w-1/2 flex-grow">
				<h1>Try out the modal component!</h1>
				<button
					data-testid="spawn-success-modal"
					onClick={() =>
						spawnModal({
							title: demoModalTitle,
							children: demoModalContent,
						})
					}
				>
					Spawn a success modal
				</button>
				<br />
				<button
					data-testid="spawn-button-modal"
					onClick={() =>
						spawnModal({
							title: demoModalTitle,
							children: demoModalContent,
							onConfirm: onButtonClick,
							onDecline: onButtonClick,
						})
					}
				>
					Spawn a success modal with buttons
				</button>
				<br />
				<button
					data-testid="spawn-info-modal"
					onClick={() =>
						spawnModal({
							title: demoModalTitle,
							type: NotificationType.INFO,
							children: demoModalContent,
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
							title: demoModalTitle,
							type: NotificationType.ERROR,
							children: demoModalContent,
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
							title: demoModalTitle,
							type: NotificationType.WARNING,
							children: demoModalContent,
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
