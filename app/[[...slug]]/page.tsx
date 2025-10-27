import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('slug')

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const result = await importPage(params.slug || [])
  const { default: MDXContent, toc, metadata } = result

  if (Wrapper) {
    return (
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    )
  }

  return <MDXContent {...props} params={params} />
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const { metadata } = await importPage(params.slug || [])
  return metadata
}
