import Image from "next/image";
import Link from "next/link";

export type AuthorProps = { displayName: string; slug: string; imgUrl?: string | null };

export function AuthorChip({ displayName, slug, imgUrl }: AuthorProps) {
	return (
		<Link href={`/authors/${slug}`}>
			<a
				href={`/authors/${slug}`}
				className="glass glass-hover flex w-full items-center gap-2 rounded-full py-[2px] pl-[2px] pr-3 md:w-fit"
			>
				{imgUrl ? (
					<Image
						priority={true}
						className="relative flex-shrink-0 rounded-full"
						height="36"
						width="36"
						src={imgUrl}
						alt={`Picture of ${displayName}`}
					/>
				) : (
					<div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-500"></div>
				)}
				<span className="text-sm">{displayName}</span>
			</a>
		</Link>
	);
}

export function AuthorsList({ authors }: { authors: AuthorProps[] }) {
	return (
		<div className="flex flex-wrap gap-2 md:gap-8">
			{authors?.map(author => (
				<AuthorChip
					key={author.slug}
					slug={author.slug}
					displayName={author.displayName}
					imgUrl={author.imgUrl}
				/>
			))}
		</div>
	);
}
