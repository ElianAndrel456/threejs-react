import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { DecalTyps, EditorTabs, FilterTabs } from '../config/constanst'
import { Tab } from '../components/Tab'
import { CustomButton } from '../components/CustomButton'
import { ColorPicker } from '../components/ColorPicker'
import { FilePicker } from '../components/FilePicker'
import { AiPicker } from '../components/AiPicker'
import { reader } from '../config/helpers'

export const Customizer = () => {
	const snap = useSnapshot(state)

	const [file, setFile] = React.useState<File | null>(null)
	const [apiKey, setApiKey] = React.useState('')
	const [prompt, setPrompt] = React.useState('')
	const [generatingImg, setGeneratingImg] = React.useState(false)
	const [activeEditorTab, setActiveEditorTab] = React.useState('')
	const [activeFilterTab, setActiveFilterTab] = React.useState({
		logoShirt: true,
		stylishShirt: false,
	})

	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorPicker />
			case 'filepicker':
				return (
					<FilePicker
						file={file}
						setFile={setFile}
						readFile={readFile}
					/>
				)
			case 'aipicker':
				return (
					<AiPicker
						prompt={prompt}
						setPrompt={setPrompt}
						generatingImg={generatingImg}
						handleSubmit={handleSubmit}
						apiKey={apiKey}
						setApiKey={setApiKey}
					/>
				)
		}
	}

	const handleSubmit = async (type: 'logo' | 'full') => {
		if (!prompt) return alert('Please enter a prompt')
		try {
			setGeneratingImg(true)
			const res = await fetch('http://localhost:3001/api/v1/dalle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt: prompt,
					apiKey: apiKey,
				}),
			})

			const data = await res.json()
			handleDecals(type, `data:image/png;base64,${data.photo}`)
		} catch (error) {
			alert(error)
		} finally {
			setGeneratingImg(false)
			setActiveEditorTab('')
		}
	}

	const handleDecals = (types: 'logo' | 'full', result: unknown) => {
		const decalType = DecalTyps[types]

		state[decalType.stateProperty] = result as string

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab)
		}
	}

	const handleActiveFilterTab = (tabName: 'logoShirt' | 'stylishShirt') => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tabName]
				break
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tabName]
				break
			default:
				state.isFullTexture = false
				state.isLogoTexture = true
				break
		}

		setActiveFilterTab((prev) => ({
			...prev,
			[tabName]: !prev[tabName],
		}))
	}

	const readFile = (type: 'logo' | 'full') => {
		if (!file) return

		reader(file!).then((res) => {
			handleDecals(type, res)
			setActiveEditorTab('')
		})
	}

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key={'custom'}
						className='absolute top-0 left-0 z-10'
						{...slideAnimation('left')}>
						<div className='flex items-center min-h-screen'>
							<div className='editortabs-container tabs'>
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => setActiveEditorTab(tab.name)}
									/>
								))}
								{generateTabContent()}
							</div>
						</div>
					</motion.div>
					<motion.div
						className='absolute z-10 top-5 right-5'
						{...fadeAnimation}>
						<CustomButton
							type='filled'
							title='Go Back'
							handleClick={() => (state.intro = true)}
							customStyles='w-fit px-4 py-2.5 font-bold text-sm'
						/>
					</motion.div>
					<motion.div className='filtertabs-container'>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => handleActiveFilterTab(tab.name)}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
