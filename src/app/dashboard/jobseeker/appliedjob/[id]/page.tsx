import { prisma } from '@/lib'
import React from 'react'

export default async function AppliedJob({params}:{params:{id:string}}) {
    const {id:id} = await params as {id:string}
    await prisma.job.findUnique({
        where:{id:id},

    })
  return (
    <>
    
    </>
  )
}
