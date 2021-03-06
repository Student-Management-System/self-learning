import { SectionCard, SectionCardHeader } from "@self-learning/ui/common";
import { MarkdownField } from "@self-learning/ui/forms";
import { Controller } from "react-hook-form";

export function ArticleInput({ index, onRemove }: { index: number; onRemove: () => void }) {
	return (
		<div className="mx-auto w-[90vw]">
			<SectionCard>
				<SectionCardHeader
					title="Artikel"
					subtitle="Schreibe einen Artikel. Unterstützt Markdown."
				/>

				<button
					type="button"
					className="absolute top-8 right-8 w-fit text-sm text-red-500"
					onClick={onRemove}
				>
					Entfernen
				</button>

				<Controller
					name={`content.${index}.value.content`}
					render={({ field }) => (
						<MarkdownField
							content={field.value}
							setValue={value => field.onChange(value)}
						/>
					)}
				></Controller>
			</SectionCard>
		</div>
	);
}
