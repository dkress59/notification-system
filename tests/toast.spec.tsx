import { act, fireEvent, render, screen } from '@testing-library/react'

import { Toast } from '../src/toast'
import { FinalToastProps, ToastType } from '../src/types'

const mockProps: FinalToastProps = {
	removeToastFromDom: () => {},
	autoHide: false,
	children: <>Mock Content</>,
	title: 'Mock Title',
	type: ToastType.SUCCESS,
}

describe('<Toast />', () => {
	it('initialises to correct defaults', () => {
		const { container } = render(<Toast removeToastFromDom={() => {}} />)
		expect(container).toMatchSnapshot()
	})
	it('type=success applies correct className', () => {
		render(<Toast {...mockProps} />)
		const toast = screen.getByTestId('toast-component')
		expect(toast.classList).toContain('sosafe-toast-type-success')
	})
	it('type=info applies correct className', () => {
		render(<Toast {...mockProps} type={ToastType.INFO} />)
		const toast = screen.getByTestId('toast-component')
		expect(toast.classList).toContain('sosafe-toast-type-info')
	})
	it('type=warning applies correct className', () => {
		render(<Toast {...mockProps} type={ToastType.WARNING} />)
		const toast = screen.getByTestId('toast-component')
		expect(toast.classList).toContain('sosafe-toast-type-warning')
	})
	it('type=error displays the correct icon for', () => {
		render(<Toast {...mockProps} type={ToastType.ERROR} />)
		const icon = screen.getByTestId('toast-icon')
		expect(icon.innerHTML).toBe(
			'<span class="text-xl inline-block -mt-1 transform-gpu -rotate-12">╲</span>',
		)
	})
	it('fades out on dismissal', async () => {
		render(<Toast {...mockProps} type={ToastType.ERROR} />)
		const toast = screen.getByTestId('toast-component')
		const dismissButton = toast.querySelector('.dismiss')!
		expect(toast.classList).toContain('opacity-100')
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(toast.classList).toContain('opacity-0')
	})
	it('removes itself from DOM after fading out', async () => {
		const mockRemoveFromDom = jest.fn()
		render(<Toast {...mockProps} removeToastFromDom={mockRemoveFromDom} />)
		const toast = screen.getByTestId('toast-component')
		const dismissButton = toast.querySelector('.dismiss')!
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(mockRemoveFromDom).not.toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
	it('autohide=true omits the dimiss button', () => {
		render(<Toast {...mockProps} autoHide={true} />)
		const toast = screen.getByTestId('toast-component')
		const dismissButton = toast.querySelector('.dismiss')
		expect(dismissButton).toBeNull()
	})
	it('autohide=true dismisses itself', async () => {
		const mockRemoveFromDom = jest.fn()
		render(
			<Toast
				{...mockProps}
				removeToastFromDom={mockRemoveFromDom}
				autoHide={true}
			/>,
		)
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 3600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
})
