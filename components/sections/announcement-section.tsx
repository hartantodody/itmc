import AnnouncementSectionClient from './announcement-section.client'

export default function AnnouncementSection() {
  return (
    <AnnouncementSectionClient
      title='Training Announcement'
      subtitle='Pengumuman pelatihan terbaru dari IMTC.'
      limit={6}
    />
  )
}
