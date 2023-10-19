import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div>
                <div className='text-center mb-3'>
                    <Skeleton width={100} />
                </div>
                <Skeleton width={280} height={40} />
                <Skeleton width={280} height={40} />
                <Skeleton width={280} height={40} />
                <Skeleton width={280} className='mt-5' />
            </div>
        </div>
    )
}

export default Loading