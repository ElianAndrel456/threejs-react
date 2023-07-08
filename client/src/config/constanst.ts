import { ai, download, fileIcon, logoShirt, stylishShirt, swatch } from '../assets'

export const EditorTabs = [
	{
		name: 'colorpicker',
		icons: swatch,
	},
	{
		name: 'filepicker',
		icons: fileIcon,
	},
	{
		name: 'aipicker',
		icons: ai,
	},
]

export const FilterTabs = [
	{
		name: 'logoShirt' as const,
		icons: logoShirt,
	},
	{
		name: 'stylishShirt' as const,
		icons: stylishShirt,
	},
]

export const DownloadTab = [
	{
		name: 'download' as const,
		icons: download,
	},
]

export const DecalTyps = {
	logo: {
		stateProperty: 'logoDecal' as const,
		filterTab: 'logoShirt' as const,
	},
	full: {
		stateProperty: 'fullDecal' as const,
		filterTab: 'stylishShirt' as const,
	},
}
