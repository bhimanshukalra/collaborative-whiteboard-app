import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

function EmptyOrg() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="no-org.svg" alt="Empty" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board!</h2>
      <p>Create an organization to get started.</p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create an organization</Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none w-[430px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default EmptyOrg;
