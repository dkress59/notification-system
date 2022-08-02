import { screen } from '@testing-library/dom'

import { NotificationType } from ':core/types'

describe('<notification-area />', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('matches snapshot', () => {
		const area = document.createElement('notification-area')
		area.setAttribute('data-testid', 'notification-area')
		area.innerHTML = '<p>slotted_paragraph</p>'
		document.body.appendChild(area)
		const element = screen.getByTestId('notification-area')
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('can spawn a toast-notification (with defaults)', () => {
		const area = document.createElement('notification-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnToast({ content: 'mock_content' })
		const element = screen.getByTestId('notification-area')
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('spawned toast-notification receives props', () => {
		const mockProps = {
			content: 'mock_content',
			autoHide: true,
			autoHideAfterMs: 456,
			headline: 'mock_headline',
			type: NotificationType.INFO,
		}
		const area = document.createElement('notification-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnToast(mockProps)
		const element = screen.getByTestId('notification-area')
		const notification =
			element.shadowRoot?.querySelector('toast-notification')
		expect(notification?.innerHTML).toEqual(mockProps.content)
		expect(notification).toHaveAttribute(
			'auto-hide',
			String(mockProps.autoHide),
		)
		expect(notification).toHaveAttribute(
			'auto-hide-after-ms',
			String(mockProps.autoHideAfterMs),
		)
		expect(notification).toHaveAttribute('headline', mockProps.headline)
		expect(notification).toHaveAttribute('type', mockProps.type)
	})
	it('can spawn a modal-notification (with defaults)', () => {
		const area = document.createElement('notification-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnModal({ content: 'mock_content' })
		const element = screen.getByTestId('notification-area')
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('spawned modal-notification receives props', () => {
		const mockProps = {
			content: 'mock_content',
			condition: false,
			headline: 'mock_headline',
			labelConfirm: 'mock_confirm',
			labelDecline: 'mock_decline',
			showConfirm: true,
			showDecline: true,
			type: NotificationType.INFO,
		}
		const area = document.createElement('notification-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnModal(mockProps)
		const element = screen.getByTestId('notification-area')
		const notification =
			element.shadowRoot?.querySelector('modal-notification')
		expect(notification?.innerHTML).toEqual(mockProps.content)
		expect(notification).toHaveAttribute(
			'condition',
			String(mockProps.condition),
		)
		expect(notification).toHaveAttribute('headline', mockProps.headline)
		expect(notification).toHaveAttribute(
			'label-confirm',
			mockProps.labelConfirm,
		)
		expect(notification).toHaveAttribute(
			'label-decline',
			mockProps.labelDecline,
		)
		expect(notification).toHaveAttribute(
			'show-confirm',
			String(mockProps.showConfirm),
		)
		expect(notification).toHaveAttribute(
			'show-decline',
			String(mockProps.showDecline),
		)
		expect(notification).toHaveAttribute('type', mockProps.type)
		const modal = screen
			.getByTestId('notification-area')
			.shadowRoot!.querySelector('modal-notification')!
		const confirmButton = modal.shadowRoot!.querySelector(
			'footer button.confirm',
		)!
		expect(confirmButton).toHaveAttribute('disabled', '')
	})
})
