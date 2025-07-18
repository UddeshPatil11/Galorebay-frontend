import axios from 'axios'

const upload = async file => {
	const ext = file.name.split('.').pop()
	const renamedFile = new File([file], `${Date.now()}.${ext}`, { type: file.type })

	const formData = new FormData()
	formData.append('file', renamedFile)
	formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET)
	formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME)

	// Determine correct endpoint
	const fileType = file.type.startsWith('video') ? 'video' : 'image'
	const endpoint = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/${fileType}/upload`

	try {
		const res = await axios.post(endpoint, formData)

		return res.data.secure_url
	} catch {
		console.error('Error!')
	}
}

export default upload
