import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase' // Import Firebase storage instance

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param {File} file - The file to upload.
 * @param {string} folder - The folder name in storage (default: "uploads/").
 * @returns {Promise<string>} - A promise that resolves to the file URL.
 */
export const upload = async (file, folder = 'uploads/') => {
	if (!file) {
		throw new Error('No file provided.')
	}

	const storageRef = ref(storage, `${folder}${file.name}`)

	try {
		// Upload file to Firebase Storage
		await uploadBytes(storageRef, file)

		// Get and return the download URL
		return await getDownloadURL(storageRef)
	} catch (error) {
		console.error('Upload failed', error)
		throw error
	}
}

export default upload
