import { Skeleton } from "@nextui-org/react";

type UserTextProps = {
  text?: string | number | null;
  className?: string;
  title?: string;
};
export function UserText(props: UserTextProps) {
  if (!props.text) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Skeleton isLoaded={!!props.text}>
        <span className={props.className}>{props.title}</span>
      </Skeleton>
      <Skeleton isLoaded={!!props.text}>
        <span className={props.className}>{props.text}</span>
      </Skeleton>
    </div>
  );
}
