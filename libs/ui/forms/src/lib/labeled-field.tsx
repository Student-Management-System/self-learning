import { PropsWithChildren } from "react";

export function LabeledField({
	children,
	label,
	htmlFor,
	error,
	optional
}: PropsWithChildren<{ label: string; htmlFor?: string; error?: string; optional?: boolean }>) {
	return (
		<fieldset className="relative flex w-full flex-col gap-1">
			<label htmlFor={htmlFor}>
				<span className="text-sm font-semibold">{label}</span>
				{optional && <span className="px-2 text-xs text-light">Optional</span>}
				{error && <span className="px-4 text-xs text-red-500">{error}</span>}
			</label>
			{children}
		</fieldset>
	);
}

export function FieldError({ error }: { error?: string | null }) {
	if (error) {
		return <p className="absolute left-0 -bottom-5 text-xs text-red-500">{error}</p>;
	}

	return null;
}
