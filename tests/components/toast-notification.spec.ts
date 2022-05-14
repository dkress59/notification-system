import { newSpecPage } from '@stencil/core/testing'

import { ToastNotification } from '../../src'

const mockContent = 'Mock Content'
const mockHeadline = 'Mock Headline'
const mockClassName = 'mock-class-name'

describe('<toast-notification />', () => {
	it('matches snapshot without props', async () => {
		const { root } = await newSpecPage({
			components: [ToastNotification],
			html: '<toast-notification></toast-notification>',
		})
		expect(root).toMatchSnapshot()
	})

	// eslint-disable-next-line jest/no-disabled-tests
	it.skip('matches snapshot with props', async () => {
		const { root } = await newSpecPage({
			components: [ToastNotification],
			html: `<toast-notification class="${mockClassName}" headline="${mockHeadline}">${mockContent}</toast-notification>`,
		})
		expect(root).toMatchSnapshot()
	})
})
