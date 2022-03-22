import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { useContext } from 'react'

import { NotificationContext } from '../src/context'
import { BannerArea, NotificationProvider } from '../src/hooks'

function SpawnToastButton() {
	const { spawnToast } = useContext(NotificationContext)
	return (
		<button
			data-testid="spawn-button"
			onClick={() =>
				spawnToast({
					title: 'Mock Toast',
					children: 'Mock Toast Content',
				})
			}
		>
			Spawn a toast
		</button>
	)
}

function SpawnModalButton() {
	const { spawnModal } = useContext(NotificationContext)
	return (
		<button
			data-testid="spawn-button"
			onClick={() =>
				spawnModal({
					title: 'Mock Modal',
					children: 'Mock Modal Content',
				})
			}
		>
			Spawn a modal
		</button>
	)
}

function SpawnBannerButton() {
	const { spawnBanner } = useContext(NotificationContext)
	return (
		<button
			data-testid="spawn-button"
			onClick={() =>
				spawnBanner({
					title: 'Mock Banner',
					children: 'Mock Banner Content',
				})
			}
		>
			Spawn a banner
		</button>
	)
}

describe('Custom Hooks', () => {
	describe('NotificationProvider', () => {
		describe('useToast', () => {
			it('initialises with empty collection', () => {
				render(
					<NotificationProvider>
						<React.Fragment />
					</NotificationProvider>,
				)
				const notificationContainer = screen.getByTestId(
					'notification-container',
				)!
				expect(notificationContainer.children).toHaveLength(0)
			})
			it('correctly adds a toast to the collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationContainer = screen.getByTestId(
					'notification-container',
				)!
				const spawnToastButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				expect(notificationContainer.children).toHaveLength(1)
			})
			it('correctly adds additional toast to the collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationContainer = screen.getByTestId(
					'notification-container',
				)!
				const spawnToastButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				expect(notificationContainer.children).toHaveLength(2)
			})
			it('correctly adds a modal to the collection', async () => {
				render(
					<NotificationProvider>
						<SpawnModalButton />
					</NotificationProvider>,
				)
				const notificationContainer = screen.getByTestId(
					'notification-container',
				)!
				const spawnModalButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnModalButton)
				await act(() => Promise.resolve())
				expect(notificationContainer.children).toHaveLength(1)
			})
			it('correctly adds a banner to the collection', async () => {
				render(
					<NotificationProvider>
						<BannerArea />
						<SpawnBannerButton />
					</NotificationProvider>,
				)
				const bannerContainer = screen.getByTestId('banner-container')!
				const spawnBannerButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnBannerButton)
				await act(() => Promise.resolve())
				expect(bannerContainer.children).toHaveLength(1)
			})
			it('correctly removes DOM node from collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationContainer = screen.getByTestId(
					'notification-container',
				)!
				const spawnToastButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())

				const dismissButton = screen.getAllByTestId('dismiss-button')[1]
				fireEvent.click(dismissButton)
				await act(() => Promise.resolve())
				await act(
					() =>
						new Promise(resolve =>
							setTimeout(() => resolve(), 600),
						),
				)

				expect(notificationContainer.children).toHaveLength(1)
			})
		})
	})
})
