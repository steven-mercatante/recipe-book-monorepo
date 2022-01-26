import * as React from "react";

interface Props {
  picture?: string | null;
}

export function UserAvatar({ picture }: Props) {
  if (!picture) return null;

  return (
    <div>
      <img className="inline-block h-9 w-9 rounded-full" src={picture} alt="" />
    </div>
  );
}
