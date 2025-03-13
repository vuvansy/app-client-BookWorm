import { sendRequest } from "@/utils/api";
import BoxProductByType from "./box-productbytype";

const ITEMS_PER_PAGE = 15;

const Page = async () => {
  const res = await sendRequest<IModelPaginate<IBook>>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/new`,
    method: "GET",
    queryParams: { all: true, page: 1, limit: ITEMS_PER_PAGE },
  });
  const genreRes = await sendRequest<IBackendRes<IGenre[]>>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
    method: "GET",
  });

  return (
    <BoxProductByType
      initialData={res?.data || []}
      totalItems={res?.meta?.total || 0}
      limit={ITEMS_PER_PAGE}
      genres={genreRes?.data || []}
    />
  );
};

export default Page;
