import { fireEvent, screen } from '@testing-library/dom'

import { Elements } from ':core/components'
import { NotificationEvent, NotificationType } from ':core/types'
import { getIconElement } from ':core/utils'

describe('<modal-notification />', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('shadow root matches snapshot', () => {
		const notification = document.createElement('modal-notification')
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
		const notification = document.createElement('modal-notification')
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
		const notification = document.createElement('modal-notification')
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
		const notification = document.createElement('modal-notification')
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
	it('can be dismissed programmatically', () => {
		jest.useFakeTimers()
		const notification = <Elements.HTMLModalNotificationElement>(
			document.createElement('modal-notification')
		)
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
	it('fires "modalDismissed" event', () => {
		const mockCallback = jest.fn()
		const notification = <Elements.HTMLModalNotificationElement>(
			document.createElement('modal-notification')
		)
		notification.setAttribute('data-testid', 'notification')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(
			NotificationEvent.MODAL_DISMISSED,
			mockCallback,
		)
		expect(mockCallback).not.toHaveBeenCalled()
		notification.dismiss()
		fireEvent.transitionEnd(notification)
		expect(mockCallback).toHaveBeenCalled()
	})
	it('removes itself from the DOM after dismissal', () => {
		jest.useFakeTimers()
		const notification = document.createElement('modal-notification')
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
	it('displays a confirm button', () => {
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		document.body.appendChild(notification)
		const confirmButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.confirm')
		expect(confirmButton).toHaveTextContent('Confirm')
		const declineButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.decline')
		expect(declineButton).toBeNull()
	})
	it('displays a decline button', () => {
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-decline', '')
		document.body.appendChild(notification)
		const declineButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.decline')
		expect(declineButton).toHaveTextContent('Decline')
		const confirmButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.confirm')
		expect(confirmButton).toBeNull()
	})
	it('displays custom button labels', () => {
		const labelConfirm = 'Accept'
		const labelDecline = 'Cancel'
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		notification.setAttribute('show-decline', '')
		notification.setAttribute('label-confirm', labelConfirm)
		notification.setAttribute('label-decline', labelDecline)
		document.body.appendChild(notification)
		const confirmButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.confirm')
		expect(confirmButton).toHaveTextContent(labelConfirm)
		const declineButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.decline')
		expect(declineButton).toHaveTextContent(labelDecline)
	})
	it('disables confirm button if condition="false"', () => {
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		notification.setAttribute('condition', 'false')
		document.body.appendChild(notification)
		const confirmButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.confirm')
		expect(confirmButton).toHaveAttribute('disabled', '')
	})
	it('has changeable condition', () => {
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		notification.setAttribute('condition', 'false')
		document.body.appendChild(notification)
		expect(
			screen
				.getByTestId('notification')
				.shadowRoot!.querySelector('footer button.confirm'),
		).toHaveAttribute('disabled', '')
		notification.setAttribute('condition', 'true')
		expect(
			screen
				.getByTestId('notification')
				.shadowRoot!.querySelector('footer button.confirm'),
		).not.toHaveAttribute('disabled')
	})
	it('dismisses modal when confirm button clicked', () => {
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		document.body.appendChild(notification)
		const confirmButton = screen
			.getByTestId('notification')
			.shadowRoot!.querySelector('footer button.confirm')!
		fireEvent.click(confirmButton)
		expect(notification.classList).toContain('hidden')
	})
	it('fires confirmTriggered when confirm button clicked', () => {
		const mockCallback = jest.fn()
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(
			NotificationEvent.MODAL_CONFIRMED,
			mockCallback,
		)
		const confirmButton = element.shadowRoot!.querySelector(
			'footer button.confirm',
		)!
		fireEvent.mouseDown(confirmButton)
		expect(mockCallback).toHaveBeenCalled()
	})
	it('fires declineTriggered when decline button clicked', () => {
		const mockCallback = jest.fn()
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-decline', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(NotificationEvent.MODAL_DECLINED, mockCallback)
		const declineButton = element.shadowRoot!.querySelector(
			'footer button.decline',
		)!
		fireEvent.mouseDown(declineButton)
		expect(mockCallback).toHaveBeenCalled()
	})
	it('can be confirmed via keyboard (enter)', () => {
		const mockCallback = jest.fn()
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-confirm', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(
			NotificationEvent.MODAL_CONFIRMED,
			mockCallback,
		)
		const confirmButton = element.shadowRoot!.querySelector(
			'footer button.confirm',
		)!
		fireEvent.keyDown(confirmButton, { key: 'Enter' })
		expect(mockCallback).toHaveBeenCalled()
	})
	it('can be declined via keyboard (enter)', () => {
		const mockCallback = jest.fn()
		const notification = document.createElement('modal-notification')
		notification.setAttribute('data-testid', 'notification')
		notification.setAttribute('show-decline', '')
		document.body.appendChild(notification)
		const element = screen.getByTestId('notification')
		element.addEventListener(NotificationEvent.MODAL_DECLINED, mockCallback)
		const declineButton = element.shadowRoot!.querySelector(
			'footer button.decline',
		)!
		fireEvent.keyDown(declineButton, { key: 'Enter' })
		expect(mockCallback).toHaveBeenCalled()
	})
})
