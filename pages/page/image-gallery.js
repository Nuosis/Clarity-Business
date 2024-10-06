import React from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import WelcomeHeader from '@/components/common/WelcomeHeader'
import { SlideshowLightbox } from 'lightbox.js-react'
import Layout from '@/components/layout/Layout'
import Image from 'next/image'
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

export default function ImageGallery() {

    const breadcrumbItem = [
        {
            name: "More Pages",
        },
        {
            name: "Image Gallery",
        },
    ]

    const galleryPhotos = [
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
        <Layout>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <div className='card rounded-xl bg-card-color p-1'>
                <SlideshowLightbox showThumbnails lightboxIdentifier="galleryPhotos" onOpen={() => { document.body.classList.add("overflow-hidden") }} onClose={() => { document.body.classList.remove("overflow-hidden") }} className="grid xxl:grid-cols-4 sm:grid-cols-3 ssm:grid-cols-2 gap-1 group">
                    {galleryPhotos.map((item, key) => (
                        <Image key={key} src={item} data-lightboxjs="galleryPhotos" alt='gallery' width={500} height={500} className="rounded-md w-full relative transition-all group-hover:grayscale group-hover:brightness-50 hover:!grayscale-0 hover:!brightness-100" />
                    ))}
                </SlideshowLightbox>
            </div>
        </Layout>
    )
}
