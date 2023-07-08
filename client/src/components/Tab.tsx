import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio'

interface TabI {
	name: string
	icons: string
}

export const Tab = ({
	tab,
	handleClick,
	isFilterTab,
	isActiveTab,
}: {
	tab: TabI
	handleClick: () => void
	isFilterTab?: boolean
	isActiveTab?: boolean
}) => {
	const snap = useSnapshot(state)

	const activeStyles =
		isFilterTab && isActiveTab
			? { backgroundColor: snap.color, opacity: 0.5 }
			: { backgroundColor: 'transparent', opacity: 1 }

	return (
		<div
			key={tab.name}
			className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
			onClick={handleClick}
			style={activeStyles}>
			<img
				src={tab.icons}
				alt={tab.name}
				className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12'} object-contain`}
			/>
		</div>
	)
}
