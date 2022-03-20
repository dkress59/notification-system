import React from 'react'

import { Toast } from './toast'
import { ToastInCollection } from './types'

export const collectionMapper = ({ props, id }: ToastInCollection) => (
	<Toast {...props} key={id} />
)
