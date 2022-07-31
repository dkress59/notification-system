import { screen } from '@testing-library/dom'

import { NotificationType } from ':core/types'

describe('<banner-area />', () => {
	beforeEach(() => {
		document.body.innerHTML = ''
	})
	it('matches snapshot', () => {
		const area = document.createElement('banner-area')
		area.setAttribute('data-testid', 'notification-area')
		area.innerHTML = '<p>slotted_paragraph</p>'
		document.body.appendChild(area)
		const element = screen.getByTestId('notification-area')
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('can spawn a banner-notification (with defaults)', () => {
		const area = document.createElement('banner-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnBanner({ content: 'mock_content' })
		const element = screen.getByTestId('notification-area')
		expect(element.shadowRoot?.innerHTML).toMatchSnapshot()
	})
	it('spawned banner-notification receives props', () => {
		const mockProps = {
			content: 'mock_content',
			autoHide: true,
			autoHideAfterMs: 456,
			headline: 'mock_headline',
			type: NotificationType.INFO,
		}
		const area = document.createElement('banner-area')
		area.setAttribute('data-testid', 'notification-area')
		document.body.appendChild(area)
		area.spawnBanner(mockProps)
		const element = screen.getByTestId('notification-area')
		const notification = element.shadowRoot?.querySelector(
			'banner-notification',
		)
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
})
