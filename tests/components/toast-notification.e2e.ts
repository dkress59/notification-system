import { newE2EPage } from '@stencil/core/testing'

const mockComponent = '<toast-notification></toast-notification>'
const tagName = 'toast-notification'
const dismissSelector = 'toast-notification >>> .dismiss'

describe('<toast-notification />', () => {
	it('renders', async () => {
		const page = await newE2EPage()

		await page.setContent(mockComponent)
		const element = await page.find(tagName)
		expect(element).toHaveClass('hydrated')
	})

	it('can change headline', async () => {
		const page = await newE2EPage()
		const initialHeadline = 'Initial Headline'
		const changedHeadline = 'Changed Headline'

		await page.setContent(
			`<toast-notification headline="${initialHeadline}"></toast-notification>`,
		)
		const component = await page.find(tagName)
		const headline = await page.find('toast-notification >>> h4')
		expect(headline.textContent).toEqual(initialHeadline)

		component.setProperty('headline', changedHeadline)
		await page.waitForChanges()
		expect(headline.textContent).toEqual(changedHeadline)
	})

	it('is dismissible via click', async () => {
		const page = await newE2EPage()

		await page.setContent(mockComponent)
		const component = await page.find(tagName)
		expect(component).toBeTruthy()
		expect(component).not.toHaveClass('hidden')

		const dismissButton = await page.find(dismissSelector)
		expect(dismissButton.textContent).toEqual('✕')

		await dismissButton.click()
		await page.waitForChanges()
		expect(component).toHaveClass('hidden')
		const removedComponent = await page.find(tagName)
		expect(removedComponent).toBeFalsy()
	})

	it('is programmatically dismissible', async () => {
		const page = await newE2EPage()

		await page.setContent(mockComponent)
		const component = await page.find(tagName)
		expect(component).toBeTruthy()
		expect(component).not.toHaveClass('hidden')

		await component.callMethod('dismiss')
		await page.waitForChanges()
		expect(component).toHaveClass('hidden')
		const removedComponent = await page.find(tagName)
		expect(removedComponent).toBeFalsy()
	})

	it('fires toastDismissed event', async () => {
		const page = await newE2EPage()

		await page.setContent(mockComponent)
		const component = await page.find(tagName)
		const dismissButton = await page.find(dismissSelector)

		const dismissSpy = await component.spyOnEvent('toastDismissed')
		expect(dismissSpy).not.toHaveReceivedEvent()
		await dismissButton.click()
		expect(dismissSpy).toHaveReceivedEvent()
	})

	it('can hide automatically', async () => {
		const page = await newE2EPage()

		await page.setContent(
			'<toast-notification auto-hide></toast-notification>',
		)
		const component = await page.find(tagName)
		expect(component).toBeTruthy()
		expect(component).not.toHaveClass('hidden')

		const dismissButton = await page.find(dismissSelector)
		expect(dismissButton).toBeFalsy()

		await page.waitForEvent('toastDismissed')
		expect(component).toHaveClass('hidden')
		const removedComponent = await page.find(tagName)
		expect(removedComponent).toBeFalsy()
	})
})
