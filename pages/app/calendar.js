import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumb from '@/components/common/Breadcrumb'
import WelcomeHeader from '@/components/common/WelcomeHeader'
import Layout from '@/components/layout/Layout'

export default function Calendar() {

    const breadcrumbItem = [
        {
            name: "App",
        },
        {
            name: "Calendar",
        },
    ]

    return (
        <Layout>
            <Breadcrumb breadcrumbItem={breadcrumbItem} />
            <WelcomeHeader income />
            <div className='card md:p-6 p-4 rounded-xl bg-card-color'>
                <FullCalendar
                    plugins={[interactionPlugin, dayGridPlugin]}
                    initialView="dayGridMonth"
                    editable
                    selectable
                    events="https://fullcalendar.io/demo-events.json"
                />
            </div>
        </Layout>
    )
}
