import { newSpecPage } from '@stencil/core/testing'

import { NotificationType } from '../src/types'
import { getButton, getHeadline, getIcon } from '../src/utils'

describe('utils', () => {
	describe('getButton', () => {
		it('matches snapshot', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getButton(jest.fn()),
			})
			expect(page.root).toMatchSnapshot()
		})
		it('fires custom onClick event', async () => {
			const mockEventHandler = jest.fn()
			const page = await newSpecPage({
				components: [],
				template: () => getButton(mockEventHandler),
			})
			const button = page.root!
			expect(button).toBeTruthy()
			button.dispatchEvent(new Event('click'))
			expect(mockEventHandler).toHaveBeenCalled()
		})
	})
	describe('getHeadline', () => {
		it('returns undefined if no headline is provided', () => {
			expect(getHeadline()).toBeUndefined()
		})
		it('matches snapshot if a headline is provided', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getHeadline('Mock Headline'),
			})
			expect(page.root).toMatchSnapshot()
		})
	})
	describe('getIcon', () => {
		it('type success matches snapshot', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getIcon(NotificationType.SUCCESS),
			})
			expect(page.root).toMatchSnapshot()
		})
		it('type error matches snapshot', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getIcon(NotificationType.ERROR),
			})
			expect(page.root).toMatchSnapshot()
		})
		it('type info matches snapshot', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getIcon(NotificationType.INFO),
			})
			expect(page.root).toMatchSnapshot()
		})
		it('type warning matches snapshot', async () => {
			const page = await newSpecPage({
				components: [],
				template: () => getIcon(NotificationType.WARNING),
			})
			expect(page.root).toMatchSnapshot()
		})
	})
})
