"use client"

import useOrigin from "@/hooks/UseOrigin";
import { useParams } from "next/navigation";
import ApiAlert from "./ApiAlert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;

}

const ApiList: React.FC<ApiListProps> = ({
   entityIdName, entityName
}) => {
   const params = useParams()
   const origin = useOrigin()

   const baseUrl = `${origin}/api`
  return (
   <>

       <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`}/>
       <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
       <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`}/>
       <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
       <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
    </>
   )
}

export default ApiList