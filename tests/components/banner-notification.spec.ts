import { fireEvent, screen } from '@testing-library/dom'

import { NotificationEvent, NotificationType } from '../../src/types'
import { getIconElement } from '../../src/utils'

describe('<banner-notification />', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('shadow root matches snapshot', () => {
		const notification = document.createElement('banner-notification')
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
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		expect(element.classList).toContain('hidden')
		jest.runOnlyPendingTimers()
		expect(element.classList).not.toContain('hidden')
		jest.useRealTimers()
	})
	it('has changeable type', () => {
		const initialType = NotificationType.INFO
		const changedType = NotificationType.ERROR
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('type', initialType)
		document.body.appendChild(notification)
		expect(
			screen
				.getByTestId('notification')
				.shadowRoot!.querySelector('.icon')!,
		).toEqual(getIconElement(initialType))

		notification.setAttribute('type', changedType)
		expect(
			screen
				.getByTestId('notification')
				.shadowRoot!.querySelector('.icon')!,
		).toEqual(getIconElement(changedType))
	})
	it('has changeable headline', () => {
		const initialHeadline = 'mock_headline'
		const changedHeadline = 'mock_headline_changed'
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('headline', initialHeadline)
		document.body.appendChild(notification)
		expect(
			screen.getByTestId('notification').shadowRoot!.querySelector('h4'),
		).toHaveTextContent(initialHeadline)

		notification.setAttribute('headline', changedHeadline)
		expect(
			screen.getByTestId('notification').shadowRoot!.querySelector('h4'),
		).toHaveTextContent(changedHeadline)
	})
	it('hides dismiss button if auto-hide is set', () => {
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('auto-hide', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		const dismissButton = element.shadowRoot!.querySelector('.dismiss')
		expect(dismissButton).toBeNull()
	})
	it('auto-hides', () => {
		jest.useFakeTimers()
		const notification = document.createElement('banner-notification')
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
		const notification = document.createElement('banner-notification')
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
	it('fires "bannerDismissed" event', () => {
		const mockCallback = jest.fn()
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(
			NotificationEvent.BANNER_DISMISSED,
			mockCallback,
		)
		expect(mockCallback).not.toHaveBeenCalled()
		notification.dismiss()
		fireEvent.transitionEnd(notification)
		expect(mockCallback).toHaveBeenCalled()
	})
	it('removes itself from the DOM after dismissal', () => {
		jest.useFakeTimers()
		const notification = document.createElement('banner-notification')
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		jest.runAllTimers()
		const element = screen.getByTestId('notification')
		const dismissButton = element.shadowRoot!.querySelector('.dismiss')!
		fireEvent.mouseDown(dismissButton)
		fireEvent.transitionEnd(notification)
		expect(screen.queryByTestId('notification')).toBeNull()
		jest.useRealTimers()
	})
})
