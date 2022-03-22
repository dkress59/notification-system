import { act, fireEvent, render, screen } from '@testing-library/react'

import { Modal } from '../src/modal'
import { FinalModalProps, NotificationType } from '../src/types'

const mockProps: FinalModalProps = {
	children: <>Mock Content</>,
	condition: true,
	labelConfirm: 'Mock Accept Label',
	labelDecline: 'Mock Decline Label',
	onConfirm: jest.fn(),
	onDecline: jest.fn(),
	removeThisFromDom: jest.fn(),
	title: 'Mock Title',
	type: NotificationType.SUCCESS,
}

describe('<Modal />', () => {
	it('initialises to correct defaults', () => {
		const { container } = render(<Modal removeThisFromDom={jest.fn()} />)
		expect(container).toMatchSnapshot()
	})
	it('initialises to correct default labels', () => {
		const { container } = render(
			<Modal
				removeThisFromDom={jest.fn()}
				onConfirm={jest.fn()}
				onDecline={jest.fn()}
			/>,
		)
		expect(container).toMatchSnapshot()
	})
	it('type=success applies correct className', () => {
		render(<Modal {...mockProps} />)
		const modal = screen.getByTestId('modal-component')
		expect(modal.classList).toContain('custom-modal-type-success')
	})
	it('type=info applies correct className', () => {
		render(<Modal {...mockProps} type={NotificationType.INFO} />)
		const modal = screen.getByTestId('modal-component')
		expect(modal.classList).toContain('custom-modal-type-info')
	})
	it('type=warning applies correct className', () => {
		render(<Modal {...mockProps} type={NotificationType.WARNING} />)
		const modal = screen.getByTestId('modal-component')
		expect(modal.classList).toContain('custom-modal-type-warning')
	})
	it('type=error displays the correct icon for', () => {
		render(<Modal {...mockProps} type={NotificationType.ERROR} />)
		const icon = screen.getByTestId('modal-icon')
		expect(icon.innerHTML).toBe(
			'<span class="text-xl inline-block -mt-1 transform-gpu -rotate-12">╲</span>',
		)
	})
	it('fades out on dismissal', async () => {
		render(<Modal {...mockProps} type={NotificationType.ERROR} />)
		const modal = screen.getByTestId('modal-component')
		const dismissButton = modal.querySelector('.dismiss')!
		expect(modal.classList).toContain('opacity-100')
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(modal.classList).toContain('opacity-0')
	})
	it('removes itself from DOM after fading out', async () => {
		const mockRemoveFromDom = jest.fn()
		render(<Modal {...mockProps} removeThisFromDom={mockRemoveFromDom} />)
		const modal = screen.getByTestId('modal-component')
		const dismissButton = modal.querySelector('.dismiss')!
		fireEvent.click(dismissButton)
		await act(() => Promise.resolve())
		expect(mockRemoveFromDom).not.toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
	it('dismisses itself onConfirm', async () => {
		const mockRemoveFromDom = jest.fn()
		const mockOnConfirm = jest.fn()
		render(
			<Modal
				{...mockProps}
				removeThisFromDom={mockRemoveFromDom}
				onConfirm={mockOnConfirm}
			/>,
		)
		const confirmButton = screen.getByTestId('confirm-button')!
		fireEvent.click(confirmButton)
		await act(() => Promise.resolve())
		expect(mockOnConfirm).toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
	it('dismisses itself onDecline', async () => {
		const mockRemoveFromDom = jest.fn()
		const mockOnDecline = jest.fn()
		render(
			<Modal
				{...mockProps}
				removeThisFromDom={mockRemoveFromDom}
				onDecline={mockOnDecline}
			/>,
		)
		const declineButton = screen.getByTestId('decline-button')!
		fireEvent.click(declineButton)
		await act(() => Promise.resolve())
		expect(mockOnDecline).toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).toHaveBeenCalled()
	})
	it('does not allow onAccept if condition=false', async () => {
		const mockRemoveFromDom = jest.fn()
		const mockOnConfirm = jest.fn()
		render(
			<Modal
				{...mockProps}
				removeThisFromDom={mockRemoveFromDom}
				onConfirm={mockOnConfirm}
				condition={false}
			/>,
		)
		const confirmButton = screen.getByTestId('confirm-button')!
		fireEvent.click(confirmButton)
		await act(() => Promise.resolve())
		expect(mockOnConfirm).not.toHaveBeenCalled()
		await act(
			() => new Promise(resolve => setTimeout(() => resolve(), 600)),
		)
		expect(mockRemoveFromDom).not.toHaveBeenCalled()
	})
})
