import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadPDF(file: File) {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  
  const result = await cloudinary.uploader.upload(
    `data:application/pdf;base64,${base64}`,
    { 
      resource_type: 'raw',
      public_id: file.name.replace('.pdf', ''),
      use_filename: true
    }
  )
  
  return result.secure_url
}