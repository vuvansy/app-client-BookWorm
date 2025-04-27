"use client";
import React from "react";
import { Breakpoint, Table } from "antd";


interface Distributor {
  key: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
     responsive: ['md'] as Breakpoint[],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
     responsive: ['md'] as Breakpoint[],
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    key: "phone",
     responsive: ['md'] as Breakpoint[],
  },
];

const dataSource: Distributor[] = [
    {
        key: "1",
        name: "BookWorm SÔNG LÀ", 
        address: "Tầng B1 TTTM Vincom Hùng Vương - Đường Hùng Vương - TP Bến Tre",
        email: "bookworm.songla@gmail.com",
        phone: "0932 111 222",
      },
      {
        key: "2",
        name: "BookWorm VINH", 
        address: "Tầng 2 BigC Vinh, Số 2 đường Trần Phú, TP Vinh, Nghệ An",
        email: "bookworm.vinh@gmail.com",
        phone: "0943 222 333",
      },
      {
        key: "3",
        name: "NHÀ SÁCH - SIÊU THỊ ĐỒNG NAI", 
        address: "Quốc Lộ 1, P. Tân Biên, TP. Biên Hòa, Đồng Nai",
        email: "nshadongnai@gmail.com",
        phone: "0911 333 444",
      },
      {
        key: "4",
        name: "NHÀ SÁCH CÂY GỖ", 
        address: "14 Minh Phụng, Q6, TP.HCM",
        email: "nshacaygo@gmail.com",
        phone: "0912 444 555",
      },
      {
        key: "5",
        name: "BookWorm AN GIANG", 
        address: "Số 10 Cao Thắng, P. Mỹ Long, TP. Long Xuyên, Tỉnh An Giang",
        email: "bookworm.angiang@gmail.com",
        phone: "0923 555 666",
      },
      {
        key: "6",
        name: "BookWorm NHA TRANG", 
        address: "Tầng 2 BigC Nha Trang, 01 đường 19/5, P. Vĩnh Điềm, TP. Nha Trang",
        email: "bookworm.nhatrang@gmail.com",
        phone: "0934 666 777",
      },
      {
        key: "7",
        name: "BookWorm HUẾ",
        address: "Tầng 1, TTTM Vincom Huế, 50A Hùng Vương, TP. Huế",
        email: "bookworm.hue@gmail.com",
        phone: "0945 777 888",
      },
      {
        key: "8",
        name: "BookWorm GIA LAI", 
        address: "TTTM Gia Lai, 02 đường Trần Hưng Đạo, P. Diên Hồng, TP. Pleiku, Gia Lai",
        email: "bookworm.gialai@gmail.com",
        phone: "0956 888 999",
      },
      {
        key: "9",
        name: "BookWorm ĐÀ NẴNG", 
        address: "Tầng 2 BigC Đà Nẵng, 255 Hùng Vương, Q. Thanh Khê, TP. Đà Nẵng",
        email: "bookworm.danang@gmail.com",
        phone: "0967 999 000",
      },
      {
        key: "10",
        name: "NHÀ SÁCH PHÚ THỌ", 
        address: "TTTM Việt Trì, 01 đường Hòa Phong, TP. Việt Trì, Phú Thọ",
        email: "nhasach.phutho@gmail.com",
        phone: "0978 000 111",
      },
];

const expandedRowRender = (record: Distributor) => {
  return (
    <div style={{ paddingLeft: "50px" }}>
      <p>
        <strong>Địa chỉ:</strong> {record.address}
      </p>
      <p>
        <strong>Email:</strong> {record.email}
      </p>
      <p>
        <strong>Điện thoại:</strong> {record.phone}
      </p>
    </div>
  );
};

const DistributorsPage: React.FC = () => {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 16, fontSize: 20 }}>
        HỆ THỐNG TRUNG TÂM - NHÀ SÁCH
      </h1>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        bordered
        // Cấu hình cho phép mở rộng (expand)
        expandable={{
          expandedRowRender, // Nội dung hiển thị khi expand
          rowExpandable: () => true, // Cho phép mọi dòng đều expand
        }}
      />
    </div>
  );
};

export default DistributorsPage;
