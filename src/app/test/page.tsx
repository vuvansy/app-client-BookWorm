import { sendRequest } from '@/utils/api'



const TestPage = async () => {
  const res = await sendRequest<IBackendRes<IGenre[]>>({
    url: "http://localhost:4000/api/v1/genre",
    method: "GET"

  })
  // console.log(">>>>>> check rs data", res);

  //   const onFinish = async (values: any) => {
  //     console.log('Success:', values);
  //     const { name, email, password, age, gender, role, address } = values;

  //     const data = { name, email, password, age, gender, role, address };
  //     const res = await fetch(
  //         "http://localhost:8000/api/v1/users",
  //         {
  //             method: "POST",
  //             headers: {
  //                 'Authorization': `Bearer ${access_token}`,
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(data)
  //         })

  //     const d = await res.json();
  //     if (d.data) {
  //         //success
  //         await getData();
  //         notification.success({
  //             message: "Tạo mới user thành công.",
  //         })
  //         handleCloseCreateModal();
  //     } else {
  //         ///
  //         notification.error({
  //             message: "Có lỗi xảy ra",
  //             description: JSON.stringify(d.message)
  //         })
  //     }
  // };

  return (
    <div>
      <h1 className='flex justify-center text-sub-heading-bold text-yellow-1 '>Xu Hướng Mua Sắm</h1>
      {
        res.data?.map(item => {
          return (

            <div key={item._id} className='flex'>z
              <p>{item.name} - </p>
              <p>{item.image}</p>
            </div>
          )
        })
      }

    </div>
  )
};

export default TestPage;
