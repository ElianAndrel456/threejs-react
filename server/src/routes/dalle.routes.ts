import { Router } from 'express'
import { Configuration, OpenAIApi } from 'openai'
const router = Router()

router.post('/', async (req, res) => {
	try {
		if (!req.body.apiKey) {
			throw new Error('API Key is required')
		}

		const config = new Configuration({
			apiKey: req.body.apiKey,
		})

		const openai = new OpenAIApi(config)

		const response = await openai.createImage({
			prompt: req.body.prompt + ' has a picture for t-shirt',
			n: 1,
			size: '1024x1024',
			response_format: 'b64_json',
		})

		const image = response.data.data[0].b64_json

		res.status(200).json({ photo: image })
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message })
		}
	}
})

export default router
