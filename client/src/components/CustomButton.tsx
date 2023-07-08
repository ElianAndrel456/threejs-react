import { useSnapshot } from 'valtio'
import state from '../store'
import { getContrastingColor } from '../config/helpers'

type ButtonType = 'filled' | 'outlined'

export const CustomButton = ({
	customStyles,
	handleClick,
	title,
	type,
}: {
	type: ButtonType
	title: string
	handleClick: () => void
	customStyles?: string
}) => {
	const snap = useSnapshot(state)

	const generateStyle = (type: ButtonType) => {
		if (type === 'filled') {
			return {
				backgroundColor: snap.color,
				color: '#fff',
			}
		}
		if (type === 'outlined') {
			return {
				backgroundColor: 'transparent',
				color: getContrastingColor(snap.color),
				border: `1px solid ${snap.color}`,
			}
		}
	}

	return (
		<button
			className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
			style={generateStyle(type)}
			onClick={handleClick}>
			{title}
		</button>
	)
}
