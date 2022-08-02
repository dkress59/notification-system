import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { NotificationType } from ':core/types'

import { BannerArea } from './components/banner-area'
import { BannerNotification } from './components/banner-notification'
import { ModalNotification } from './components/modal-notification'
import { NotificationArea } from './components/notification-area'
import { ToastNotification } from './components/toast-notification'

function DemoApp() {
	const [forceReRender, setForceReRender] = useState(false)
	const [bannerChild2, setBannerChild2] = useState(false)
	const notificationAreaRef = useRef<null | HTMLNotificationAreaElement>(null)
	const bannerRef = useRef<null | HTMLBannerNotificationElement>(null)
	const modalRef = useRef<null | HTMLModalNotificationElement>(null)

	useEffect(() => {
		notificationAreaRef.current?.spawnModal({
			content: 'yoyoyo',
			headline: 'Modal spawned',
			type: NotificationType.WARNING,
		})
		const to1 = setTimeout(() => setBannerChild2(true), 2000)
		const to2 = setTimeout(() => bannerRef.current?.dismiss(), 5000)
		const to3 = setTimeout(() => setForceReRender(true), 8000)
		return () => {
			clearTimeout(to1)
			clearTimeout(to2)
			clearTimeout(to3)
		}
	}, [])

	return (
		<>
			<BannerArea>
				<BannerNotification
					headline="some headline"
					ref={bannerRef}
					type={NotificationType.ERROR}
				>
					demo content
				</BannerNotification>
				{bannerChild2 && (
					<BannerNotification
						headline="some headline 2"
						type={NotificationType.INFO}
						onDismiss={() => alert('banner hidden!')}
					>
						demo content
					</BannerNotification>
				)}
			</BannerArea>
			{forceReRender && <>Re-Rendered</>}
			<NotificationArea ref={notificationAreaRef}>
				<ToastNotification
					headline="Info Toast"
					type={NotificationType.INFO}
				>
					Toast Content
				</ToastNotification>
				<ToastNotification
					headline="Toast title"
					autoHide={true}
					autoHideAfterMs={1000}
					onDismiss={() => alert('toast auto-hidden!')}
				/>
				<ModalNotification
					condition={true}
					labelConfirm="Accept"
					onConfirm={() => alert('modal confirmed!')}
					ref={modalRef}
				>
					Modal content
				</ModalNotification>
			</NotificationArea>
		</>
	)
}

const container = document.getElementById('app')!

const root = createRoot(container)
root.render(<DemoApp />)
