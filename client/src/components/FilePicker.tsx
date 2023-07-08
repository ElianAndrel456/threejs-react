import React from 'react'
import { CustomButton } from './CustomButton'

export const FilePicker = ({
	file,
	setFile,
	readFile,
}: {
	setFile: React.Dispatch<React.SetStateAction<File | null>>
	file: File | null
	readFile: (type: 'logo' | 'full') => void
}) => {
	return (
		<div className='filepicker-container'>
			<div className='flex-1 flex flex-col'>
				<input
					type='file'
					name=''
					id='file-upload'
					accept='image/*'
					onChange={(e) => setFile(e.target.files![0])}
				/>
				<label
					htmlFor='file-upload'
					className='filepicker-label'>
					Upload File
				</label>
				<p>{file === null ? 'No file Selected' : file && file.name}</p>
			</div>
			<div className='mt-4 flex flex-wrap gap-3 '>
				<CustomButton
					type='outlined'
					title='Logo'
					handleClick={() => readFile('logo')}
					customStyles='text-xs'
				/>
				<CustomButton
					type='filled'
					title='Full'
					handleClick={() => readFile('full')}
					customStyles='text-xs'
				/>
			</div>
		</div>
	)
}
