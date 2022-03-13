import { act, render } from '@testing-library/react'

import { ToastType } from '../src/types'
import { getCollectionMapper } from '../src/util'

describe('utilities', () => {
	describe('getCollectionMapper', () => {
		it('correctly maps collection', () => {
			const mockRemoveFromDom = jest.fn()
			const mockMapper = getCollectionMapper(mockRemoveFromDom)
			expect(
				mockMapper({
					props: {
						autoHide: false,
						children: <>Mock Content</>,
						title: 'Mock Title',
						type: ToastType.INFO,
					},
					id: 'mock-id',
				}),
			).toMatchSnapshot()
		})
		it('passes in the removeToastFromDom function', async () => {
			const mockRemoveFromDom = jest.fn()
			const mockMapper = getCollectionMapper(mockRemoveFromDom)
			const mappedCollection = mockMapper({
				props: {
					autoHide: true,
					children: <>Mock Content</>,
					title: 'Mock Title',
					type: ToastType.INFO,
				},
				id: 'mock-id',
			})
			render(mappedCollection)
			await act(
				() => new Promise(resolve => setTimeout(() => resolve(), 3600)),
			)
			expect(mockRemoveFromDom).toHaveBeenCalled()
		})
	})
})
