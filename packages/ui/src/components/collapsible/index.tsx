type CollapsibleProps = {
	onChange: (checked: boolean) => void;
	className?: string;
};
function CollapsibleRoot({ onChange, className, ...props }: CollapsibleProps) {
	return <></>;
}
type CollapsibleTriggerProps = {};

const CollapsibleTrigger = ({ ...props }: CollapsibleTriggerProps) => {
	return <></>;
};
type CollapsibleContentProps = {};

const CollapsibleContent = ({ ...props }: CollapsibleContentProps) => {
	return <></>;
};

export const Collapsible = {
	Trigger: CollapsibleTrigger,
	Content: CollapsibleContent,
	Root: CollapsibleRoot,
};
