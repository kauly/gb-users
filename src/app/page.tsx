import { octokit } from "@/lib/github";
import { Button } from "@nextui-org/button";

export default async function Home() {
  const data = await octokit.rest.users.getByUsername({
    username: "dalgrande",
  });

  console.log(data);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}
