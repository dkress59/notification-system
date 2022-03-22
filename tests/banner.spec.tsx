import { act, fireEvent, render, screen } from '@testing-library/react'

import { Banner } from '../src/banner'
import { FinalBannerProps, NotificationType } from '../src/types'

const mockProps: FinalBannerProps = {
	removeThisFromDom: () => {},
	autoHide: false,
	children: <>Mock Content</>,
	title: 'Mock Title',
	type: NotificationType.SUCCESS,
}

describe('<Banner />', () => {
	it('initialises to correct defaults', () => {
		const { container } = render(<Banner removeThisFromDom={() => {}} />)
		expect(container).toMatchSnapshot()
	})
	it('type=success applies correct className', () => {
		render(<Banner {...mockProps} />)
		const banner = screen.getByTestId('banner-component')
		expect(banner.classList).toContain('custom-banner-type-success')
	})
	it('type=info applies correct className', () => {
		render(<Banner {...mockProps} type={NotificationType.INFO} />)
		const banner = screen.getByTestId('banner-component')
		expect(banner.classList).toContain('custom-banner-type-info')
	})
	it('type=warning applies correct className', () => {
		render(<Banner {...mockProps} type={NotificationType.WARNING} />)
		const banner = screen.getByTestId('banner-component')
		expect(banner.classList).toContain('custom-banner-type-warning')
	})
	it('type=error displays the correct icon for', () => {
		render(<Banner {...mockProps} type={NotificationType.ERROR} />)
		const icon = screen.getByTestId('banner-icon')
		expect(icon.innerHTML).toBe(
			'<span class="text-xl inline-block -mt-1 transform-gpu -rotate-12">╲</span>',
		)
	})
	it('fades out on dismissal', async () => {
		render(<Banner {...mockProps} type={NotificationType.ERROR} />)
		const banner = screen.getByTestId('banner-component')
		const dismissButton = banner.querySelector('.dismiss')!
		expect(banner.classList).toContain('opacity-100')
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(banner.classList).toContain('opacity-0')
	})
	it('removes itself from DOM after fading out', async () => {
		const mockRemoveFromDom = jest.fn()
		render(<Banner {...mockProps} removeThisFromDom={mockRemoveFromDom} />)
		const banner = screen.getByTestId('banner-component')
		const dismissButton = banner.querySelector('.dismiss')!
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(mockRemoveFromDom).not.toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
	it('autohide=true omits the dimiss button', () => {
		render(<Banner {...mockProps} autoHide={true} />)
		const banner = screen.getByTestId('banner-component')
		const dismissButton = banner.querySelector('.dismiss')
		expect(dismissButton).toBeNull()
	})
	it('autohide=true dismisses itself', async () => {
		const mockRemoveFromDom = jest.fn()
		render(
			<Banner
				{...mockProps}
				removeThisFromDom={mockRemoveFromDom}
				autoHide={true}
			/>,
		)
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 3600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
})
