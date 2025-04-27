import { sendRequest } from "@/utils/api";
import BoxProductByType from "./box-productbytype";

const ITEMS_PER_PAGE = 15;
const DEFAULT_SORT = "name";

const Page = async ({ params }: { params: { type: string } }) => {
  const { type } = params;

  const res = await sendRequest<IBackendRes<IModelPaginate<IBook>>>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/book/${type}`,
    method: "GET",
    queryParams: {
      all: true,
      page: 1,
      limit: ITEMS_PER_PAGE,
      sort: DEFAULT_SORT,
    },
  });

  const genreRes = await sendRequest<IBackendRes<IGenre[]>>({
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/genre`,
    method: "GET",
  });

  return (
    <BoxProductByType
      initialData={res?.data?.result || []}
      totalItems={res?.data?.meta?.total || 0}
      totalPages={res?.data?.meta?.pages || 1}
      limit={ITEMS_PER_PAGE}
      genres={genreRes?.data || []}
      type={type}
    />
  );
};

export default Page;
