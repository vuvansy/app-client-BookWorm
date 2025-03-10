import React from "react";
import { sendRequest } from "@/utils/api";
import BoxProductByType from "./box-productbytype";

const Page = async () => {
  const response = await sendRequest<IBackendRes<IBook[]>>({
    url: "http://localhost:4000/api/v1/book",
    method: "GET",
  });

  const dataBookNew = response?.data ?? [];

  return <BoxProductByType dataBookNew={dataBookNew} />;
};

export default Page;
