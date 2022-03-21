import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { useContext } from 'react'

import { NotificationContext } from '../src/context'
import { NotificationProvider } from '../src/hooks'

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

describe('Custom Hooks', () => {
	describe('NotificationProvider', () => {
		describe('useToast', () => {
			it('initialises with empty collection', () => {
				render(
					<NotificationProvider>
						<React.Fragment />
					</NotificationProvider>,
				)
				const notificationWrapper = screen.getByTestId(
					'notification-wrapper',
				)!
				expect(notificationWrapper.children).toHaveLength(0)
			})
			it('correctly adds a toast to the collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationWrapper = screen.getByTestId(
					'notification-wrapper',
				)!
				const spawnToastButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				expect(notificationWrapper.children).toHaveLength(1)
			})
			it('correctly adds additional toast to the collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationWrapper = screen.getByTestId(
					'notification-wrapper',
				)!
				const spawnToastButton = screen.getByTestId('spawn-button')
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				fireEvent.click(spawnToastButton)
				await act(() => Promise.resolve())
				expect(notificationWrapper.children).toHaveLength(2)
			})
			it('correctly removes DOM node from collection', async () => {
				render(
					<NotificationProvider>
						<SpawnToastButton />
					</NotificationProvider>,
				)
				const notificationWrapper = screen.getByTestId(
					'notification-wrapper',
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

				expect(notificationWrapper.children).toHaveLength(1)
			})
		})
	})
})
