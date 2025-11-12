
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {

   try {
     const { token, expire, signature } = getUploadAuthParams({
         privateKey: process.env.IMAGE_PRIVATE_KEY as string, 
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
 
     })
 
     return Response.json({ 
         token, 
         expire, 
         signature, 
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY ,
     })
   } catch (error) {
    return Response.json({
        error: "Authentication for Imaekit failed"
    }, 
    { status: 500 })
   }
}