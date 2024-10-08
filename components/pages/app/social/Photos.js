import React from 'react'
import { SlideshowLightbox } from 'lightbox.js-react'
import {
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
} from '@/public/images'
import Image from 'next/image'

export default function Photos() {

    const socialPhotos = [
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        gallery6,
        gallery7,
        gallery8,
        gallery9,
        gallery10,
        gallery11,
        gallery12,
    ]

    return (
        <>
            <div className='text-[24px]/[30px] font-medium my-2'>
                Photos
            </div>
            <div className='card rounded-xl bg-card-color p-1'>
                <SlideshowLightbox showThumbnails lightboxIdentifier="socialPhotos" onOpen={() => { document.body.classList.add("overflow-hidden") }} onClose={() => { document.body.classList.remove("overflow-hidden") }} className="grid xxl:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 gap-1 group">
                    {socialPhotos.map((item, key) => (
                        <Image key={key} src={item} data-lightboxjs="socialPhotos" alt='gallery' layout="responsive" className="rounded-md w-full relative transition-all group-hover:grayscale group-hover:brightness-50 hover:!grayscale-0 hover:!brightness-100" />
                    ))}
                </SlideshowLightbox>
            </div>
        </>
    )
}
