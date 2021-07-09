import { getSession } from "next-auth/client";
import { useState } from "react";
import prisma from "../../services/prisma/prisma";
import Create from "./create";

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    const congregationId = (session?.user as any)?.organizationId;

    const congregations = await prisma.organization.findMany();
    return {
        props: { congregations, congregationId }
    }
}

const Organization: React.FC<{ congregations, congregationId }> = (props) => {
    const findCongregation = (id: string) => props.congregations.find(c => c.id === Number(id))
    const [propsCreate] = useState(findCongregation(props.congregationId))

    return (<><Create props={propsCreate}></Create></>)
}

export default Organization