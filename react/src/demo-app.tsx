import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

import { NotificationType } from ':core/types'

function DemoApp() {
	const bannerAreaRef = useRef<null | HTMLBannerAreaElement>(null)
	const notificationAreaRef = useRef<null | HTMLNotificationAreaElement>(null)

	useEffect(() => {
		bannerAreaRef.current?.spawnBanner({
			content: 'yoyoyo',
			type: NotificationType.WARNING,
			headline: 'Banner spawned',
		})
		notificationAreaRef.current?.spawnModal({
			content: 'yoyoyo',
			headline: 'Modal spawned',
		})
	}, [])

	return (
		<>
			<banner-area ref={bannerAreaRef}>
				<banner-notification
					headline="some headline"
					type={NotificationType.ERROR}
				>
					demo content
				</banner-notification>
			</banner-area>
			<notification-area ref={notificationAreaRef}>
				<toast-notification headline="Toast title" auto-hide />
			</notification-area>
		</>
	)
}

const container = document.getElementById('app')!

const root = createRoot(container)
root.render(<DemoApp />)
