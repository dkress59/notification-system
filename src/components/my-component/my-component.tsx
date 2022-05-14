import { Component, h, JSX, Prop } from '@stencil/core'

function format(first?: string, middle?: string, last?: string): string {
	return (
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		(first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
	)
}

@Component({
	tag: 'my-component',
	styleUrl: 'my-component.scss',
	shadow: true,
})
export class MyComponent {
	/**
	 * The first name
	 */
	@Prop() first: string

	/**
	 * The middle name
	 */
	@Prop() middle: string

	/**
	 * The last name
	 */
	@Prop() last: string

	private getText(): string {
		return format(this.first, this.middle, this.last)
	}

	render() {
		return (<div>Hello, World! I'm {this.getText()}</div>) as JSX.Element
	}
}
