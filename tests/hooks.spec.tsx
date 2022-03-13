import { act, renderHook } from '@testing-library/react-hooks'

import { useToast } from '../src/hooks'
import { ToastInCollection, ToastProps } from '../src/types'

interface UseToastValue {
	spawnToast: (props: ToastProps) => void
	removeToastFromDom: (id: string) => void
	collection: ToastInCollection[]
}

describe('Custom Hooks', () => {
	describe('useToast', () => {
		it('initialises with empty collection', () => {
			const { result } = renderHook(() => useToast())
			expect(result.current.collection).toEqual([])
		})
		it('correctly adds a toast to the collection', () => {
			const { result } = renderHook(() => useToast())
			act(() => result.current.spawnToast({}))
			expect(result.current.collection).toHaveLength(1)
		})
		it('correctly adds additional toast to the collection', () => {
			const { result } = renderHook(() => useToast())
			act(() => result.current.spawnToast({}))
			act(() => result.current.spawnToast({}))
			expect(result.current.collection).toHaveLength(2)
		})
		it('correctly removes DOM node from collection', () => {
			const { result } = renderHook(() => useToast())
			act(() => result.current.spawnToast({}))
			act(() => result.current.spawnToast({}))
			const secondToast = (result.all.pop() as UseToastValue)
				.collection[1]
			act(() => result.current.removeToastFromDom(secondToast.id))
			expect((result.all.pop() as UseToastValue).collection).toHaveLength(
				1,
			)
		})
	})
})
