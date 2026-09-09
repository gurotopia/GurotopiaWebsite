import { source } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { DocsBody } from "fumadocs-ui/page";
import { OverviewContainer } from "@/components/layout/overview-container";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function OverviewDocsPage(props: PageProps) {
  const params = await props.params;

  // if slug is "introduction", map it to the index []
  let searchSlug = params.slug;
  if (params.slug?.length === 1 && params.slug[0] === "introduction") {
    searchSlug = [];
  }

  const page = source.getPage(searchSlug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <OverviewContainer>
      <div className="max-w-[720px] px-6 pt-14 pb-12 space-y-10 overflow-hidden text-foreground">
        <div>
          <h1 className="text-[32px] leading-[1.15] font-bold tracking-tight mb-3 text-foreground">
            {page.data.title}
          </h1>
          {page.data.description && (
            <p className="text-muted-foreground text-[15px]">{page.data.description}</p>
          )}
        </div>

        {/* section divider matching overview page */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="text-[15px] leading-relaxed">
          <DocsBody>
            <MDX components={getMDXComponents({})} />
          </DocsBody>
        </div>
      </div>
    </OverviewContainer>
  );
}

export async function generateStaticParams() {
  const params = source.generateParams();
  return params.map((p) => ({
    slug: p.slug.length === 0 ? ["introduction"] : p.slug,
  }));
}
