import { generateStaticParamsFor, importPage } from "nextra/pages";
import { getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props) {
  const params = await props.params;
  try {
    const { metadata } = await importPage(params?.mdxPath ?? []);
    return metadata ?? {};
  } catch {
    return {};
  }
}

const components = getMDXComponents();
const Wrapper = components?.wrapper ?? (({ children }) => <>{children}</>);

export default async function Page(props) {
  const params = await props.params;
  const pathSegments = params?.mdxPath ?? [];
  const result = await importPage(pathSegments);
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
