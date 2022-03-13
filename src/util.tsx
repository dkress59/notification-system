import React from 'react'

import { Toast } from './toast'
import { ToastInCollection } from './types'

export function getCollectionMapper(removeToastFromDom: (id: string) => void) {
	return ({ props, id }: ToastInCollection) => (
		<Toast
			{...props}
			key={id}
			removeToastFromDom={() => removeToastFromDom(id)}
		/>
	)
}
