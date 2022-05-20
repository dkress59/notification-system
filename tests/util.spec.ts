import { fireEvent } from '@testing-library/dom'

import { NotificationType } from '../src'
import {
	getClosingButtonElement,
	getHeadlineElement,
	getIconElement,
	getStyleElement,
} from '../src/utils'

describe('util.ts', () => {
	describe('getIconElement', () => {
		it('type=error matches snapshot', () => {
			expect(getIconElement(NotificationType.ERROR)).toMatchSnapshot()
		})
		it('type=info matches snapshot', () => {
			expect(getIconElement(NotificationType.INFO)).toMatchSnapshot()
		})
		it('type=success matches snapshot', () => {
			expect(getIconElement(NotificationType.SUCCESS)).toMatchSnapshot()
		})
		it('type=warning matches snapshot', () => {
			expect(getIconElement(NotificationType.WARNING)).toMatchSnapshot()
		})
	})
	describe('getHeadlineElement', () => {
		it('headline matches snapshot', () => {
			expect(getHeadlineElement('mock_headline')).toMatchSnapshot()
		})
		it('undefined returns undefined', () => {
			expect(getHeadlineElement(undefined)).toBeUndefined()
		})
	})
	describe('getClosingButtonElement', () => {
		it('matches snapshot', () => {
			expect(getClosingButtonElement(jest.fn())).toMatchSnapshot()
		})
		it('fires when clicked', () => {
			const mockCallback = jest.fn()
			const closingButton = getClosingButtonElement(mockCallback)
			fireEvent.mouseDown(closingButton)
			expect(mockCallback).toHaveBeenCalled()
		})
		it('fires when enter pressed', () => {
			const mockCallback = jest.fn()
			const closingButton = getClosingButtonElement(mockCallback)
			fireEvent.keyDown(closingButton, { key: 'Enter' })
			expect(mockCallback).toHaveBeenCalled()
		})
	})
	describe('getStyleElement', () => {
		it('matches snapshot', () => {
			expect(
				getStyleElement('mock-selector { mock-property: mock-value; }'),
			).toMatchSnapshot()
		})
	})
})
