import fs from 'fs'
import path from 'path'

export async function getPostData(id: string) {
    const fileContents = fs.readFileSync(id, 'utf8')
  
    return {
      id,
      fileContents,
    }
  }