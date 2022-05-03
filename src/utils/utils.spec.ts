import { format } from './utils'

describe('format', () => {
	it('returns empty string for no names defined', () => {
		expect(format(undefined, undefined, undefined)).toBe('')
	})

	it('formats just first names', () => {
		expect(format('Joseph', undefined, undefined)).toBe('Joseph')
	})

	it('formats first and last names', () => {
		expect(format('Joseph', undefined, 'Publique')).toBe('Joseph Publique')
	})

	it('formats first, middle and last names', () => {
		expect(format('Joseph', 'Quincy', 'Publique')).toBe(
			'Joseph Quincy Publique',
		)
	})
})
