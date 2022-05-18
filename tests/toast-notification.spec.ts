import { fireEvent, screen } from '@testing-library/dom'

describe('<toast-notification />', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('matches snapshot', () => {
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('headline', 'mock_headline')
		notification.setAttribute('type', 'error')
		notification.innerHTML = '<p>slotted_paragraph</p>'
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		const dismissButton = element.shadowRoot!.querySelector('.dismiss')
		expect(dismissButton).not.toBeNull()
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('fades in', () => {
		jest.useFakeTimers()
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		expect(element.classList).toContain('hidden')
		jest.runOnlyPendingTimers()
		expect(element.classList).not.toContain('hidden')
		jest.useRealTimers()
	})
	it('hides dismiss button if auto-hide is set', () => {
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('auto-hide', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		const dismissButton = element.shadowRoot!.querySelector('.dismiss')
		expect(dismissButton).toBeNull()
	})
	it('auto-hides', () => {
		jest.useFakeTimers()
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('auto-hide', '')
		document.body.appendChild(notification)
		jest.runAllTimers()
		fireEvent.transitionEnd(notification)
		const element = screen.queryByTestId('notification')
		expect(element).toBeNull()
		jest.useRealTimers()
	})
	it('can be dismissed programmatically', () => {
		jest.useFakeTimers()
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		expect(element.classList).toContain('hidden')
		jest.runOnlyPendingTimers()
		expect(element.classList).not.toContain('hidden')
		notification.dismiss()
		expect(element.classList).toContain('hidden')
		jest.useRealTimers()
	})
	// eslint-disable-next-line jest/no-disabled-tests
	it.skip('removes itself from the DOM after dismissal', () => {
		// FixMe
		jest.useFakeTimers()
		const notification = document.createElement('toast-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		jest.runAllTimers()
		const element = screen.getByTestId('notification')
		const dismissButton = element.shadowRoot!.querySelector('.dismiss')!
		fireEvent.click(dismissButton)
		fireEvent.transitionEnd(notification)
		expect(screen.queryByTestId('notification')).toBeNull()
		jest.useRealTimers()
	})
})
