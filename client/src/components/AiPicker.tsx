import React from 'react'
import { CustomButton } from './CustomButton'

export const AiPicker = ({
	prompt,
	setPrompt,
	generatingImg,
	handleSubmit,
	apiKey,
	setApiKey,
}: {
	prompt: string
	setPrompt: React.Dispatch<React.SetStateAction<string>>
	generatingImg: boolean
	handleSubmit: (type: 'logo' | 'full') => Promise<void>
	apiKey: string
	setApiKey: React.Dispatch<React.SetStateAction<string>>
}) => {
	return (
		<div className='aipicker-container'>
			<textarea
				placeholder='Ask AI...'
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				rows={4}
				className='bg-transparent border-b-2 border-gray-300 w-full'
			/>
			<input
				type='text'
				placeholder='Your API key From Openai'
				className='bg-transparent border-b-2 border-gray-300 w-full'
				value={apiKey}
				onChange={(e) => setApiKey(e.target.value)}
			/>

			<div className='flex flex-wrap gap-3'>
				{generatingImg ? (
					<CustomButton
						type='outlined'
						title='Asking AI...'
						customStyles='text-xs'
						handleClick={() => {}}
					/>
				) : (
					<>
						<CustomButton
							type='outlined'
							handleClick={() => handleSubmit('logo')}
							title='AI Logo'
							customStyles='text-xs'
						/>
						<CustomButton
							type='outlined'
							handleClick={() => handleSubmit('full')}
							title='AI Full'
							customStyles='text-xs'
						/>
					</>
				)}
			</div>
		</div>
	)
}
