import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  if (!user) return <p>No user!</p>;

  return (
    <>
      <Header
        title={transformation?.title}
        subtitle={transformation?.subTitle}
      />

      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creaditBalance}
      />
    </>
  );
}

export default AddTransformationTypePage;
