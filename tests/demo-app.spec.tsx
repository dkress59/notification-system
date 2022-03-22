import { act, fireEvent, render, screen } from '@testing-library/react'

import { DemoApp } from '../src/demo-app'
import { NotificationProvider } from '../src/hooks'

function Stage() {
	return (
		<NotificationProvider>
			<DemoApp />
		</NotificationProvider>
	)
}

describe('<DemoApp />', () => {
	describe('Spawning works correctly for <Toast />', () => {
		it('of type success', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-success-toast')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type autHide', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-autHide-toast')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type info', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-info-toast')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type error', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-error-toast')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type warning', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-warning-toast')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
	})
	describe('Spawning works correctly for <Modal />', () => {
		it('of type success', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-success-modal')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('with buttons', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-button-modal')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type info', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-info-modal')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type error', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-error-modal')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type warning', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-warning-modal')
			const notificationContainer = screen.getByTestId(
				'notification-container',
			)
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
	})
	it('redundant confirm-button test, purely for test coverage', async () => {
		const originalConsoleLog = console.log
		const mockConsoleLog = jest.fn()
		console.log = mockConsoleLog
		render(<Stage />)
		const spawnButton = screen.getByTestId('spawn-button-modal')
		fireEvent.click(spawnButton)
		await act(() => Promise.resolve())
		const confirmButton = screen.getByTestId('confirm-button')
		fireEvent.click(confirmButton)
		expect(mockConsoleLog).toHaveBeenCalledWith({
			message: 'Button clicked!',
		})
		console.log = originalConsoleLog
	})
	describe('Spawning works correctly for <Banner />', () => {
		it('of type success', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-success-banner')
			const notificationContainer = screen.getByTestId('banner-container')
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type autHide', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-autHide-banner')
			const notificationContainer = screen.getByTestId('banner-container')
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type info', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-info-banner')
			const notificationContainer = screen.getByTestId('banner-container')
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type error', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-error-banner')
			const notificationContainer = screen.getByTestId('banner-container')
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
		it('of type warning', async () => {
			render(<Stage />)
			const button = screen.getByTestId('spawn-warning-banner')
			const notificationContainer = screen.getByTestId('banner-container')
			fireEvent.click(button)
			await act(() => Promise.resolve())
			expect(notificationContainer.children).toHaveLength(1)
		})
	})
})
