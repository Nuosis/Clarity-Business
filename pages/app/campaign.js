import React, { useEffect, useState } from 'react'
import WelcomeHeader from '@/components/common/WelcomeHeader'
import Breadcrumb from '@/components/common/Breadcrumb'
import CampaignBody from '@/components/pages/app/CampaignBody'
import Layout from '@/components/layout/Layout'

export default function Campaign() {

    const breadcrumbItem = [
        {
            name: "App",
        },
        {
            name: "My Campaigns",
        },
    ]

    const [campaignsModal, setCampaignsModal] = useState(false)
    const openCampaignsModal = () => {
        setCampaignsModal(!campaignsModal)
    }
    useEffect(() => {
        document.body.classList[campaignsModal ? "add" : "remove"]("overflow-hidden")
    }, [campaignsModal])

    return (
        <Layout>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <CampaignBody openCampaignsModal={openCampaignsModal} campaignsModal={campaignsModal} />
        </Layout>
    )
}
