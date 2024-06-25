import { Header } from '@/components/header'

interface PageParams {
  params: {
    slug: string
  }
}

export default async function Projects({ params }: PageParams) {
  return (
    <div className="py-4">
      <Header slug={params.slug} />
      <main></main>
    </div>
  )
}
