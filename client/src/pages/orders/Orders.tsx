// import { Link } from "react-router-dom";
// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useAuth } from "../../utils/AuthContext";

// const Orders: React.FC = () => {
//   interface Column {
//     id: "container" | "location" | "quantity" | "price" | "totalprice";
//     label: string;
//     minWidth?: number;
//     align?: "center";
//     format?: (value: number) => string;
//   }
//   interface Data {
//     container: string;
//     location: string;
//     quantity:string;
//     price:string,
//     _id: string;
//   }
//   interface Order {
//     paymentStatus: string;
//     orderStatus: string;
//     items: [object];
//     bookingId: string;
//     _id: string;
//     paymentMethod: string;
//     userDetail:object
//   }
// const [orders,setOrders]=React.useState<Order[]>([])
//   const columns: Column[] = [
//     { id: "container", label: "Container", minWidth: 200 },
//     { id: "location", label: "Location", minWidth: 200 },
//     {
//       id: "quantity",
//       label: "Quantity",
//       minWidth: 150,
//     },
//     {
//       id: "price",
//       label: "Per Unit",
//       minWidth: 150,
//     },
//     {
//       id: "totalprice",
//       label: "Total Unit",
//       minWidth: 150,
//     },
//   ];

//   function createData(
//     container: string,
//     location: string,
//     quantity: string,
//     price: string,
//     _id: string
//   ): Data {
//     return { container, location, quantity, price, _id };
//   }
//   const { user } = useAuth();
//   const userId = user?.id || "";

//   useEffect(() => {
//     fetchOrders();
//   }, []);
//   const fetchOrders = async () => {
//     try {
//       const response = await axiosInstance.get("/api/order/getbyuser", {
//         params: { userId: userId },
//       });
//       console.log(response);
//       const orders=response.data?.orders
//       setOrders(orders)
//     } catch (error: any) {
//       console.log(error, "error");
//     }
//   };

//   const rows = [
//    // set items from each order data  order.items
//     createData(
//       "20’ft-dry container-new",
//       "Chennai, India",
//       "09",
//       "$2300",
//       "id1"
//     ),
//   ];

//   return (
//     <>
//       <div className="bg-white">
//         <div className="container mx-auto flex flex-col gap-8 ">
//           <div className="flex justify-between items-center mt-4">
//             <div className=" flex flex-col gap-2">
//               <div className="text-xl md:text-3xl text-[#0B0A0A] ">Orders</div>
//               <div className="text-[10px] md:text-sm text-[#7A7474]">
//                 <Link to={"/"}>Home / </Link>
//                 <span className="font-semibold text-[#0B0A0A]">Orders </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-6 my-4">
//             <div className="flex items-center gap-4">
//               <div className="px-4 py-2 text-[#005E99] text-sm rounded-xl bg-[#D7F0FF] font-semibold">
//                 All
//               </div>
//               <div className="px-4 py-2 text-[#221F1F] text-sm rounded-xl bg-[#E4E4E4] font-semibold">
//                 Processing
//               </div>
//               <div className="px-4 py-2 text-[#221F1F] text-sm rounded-xl bg-[#E4E4E4] font-semibold">
//                 Invoice
//               </div>
//               <div className="px-4 py-2 text-[#221F1F] text-sm rounded-xl bg-[#E4E4E4] font-semibold">
//                 Collected
//               </div>
//               <div className="px-4 py-2 text-[#221F1F] text-sm rounded-xl bg-[#E4E4E4] font-semibold">
//                 Cancelled
//               </div>
//             </div>

//            {orders && orders.map((order)=>{
//             <>
//               <div className="flex flex-col gap-3 px-8 py-8 shadow-[0px_0px_4px_rgb(0,0,0,0.2)] rounded-xl">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-2xl font-semibold">Order Details</h3>
//                 <div className="p-3 bg-[#DAFFF9] rounded-md">
//                   <p className="text-sm text-[#15B097]">Product Collected</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h4 className="text-xl font-semibold">Booking Id</h4>
//                   <span className="text-[#655F5F]">#143566</span>
//                 </div>
//                 <div>
//                   <h4 className="text-xl font-semibold">Order Date/time</h4>
//                   <span className="text-[#655F5F]">08/07/2024-12:30 PM</span>
//                 </div>
//               </div>
//               <div className="divider p-0 m-0"></div>
//               <div className="flex justify-between border-[#E4E4E4]">
//                 <div>
//                   <h4 className="text-[22px] font-semibold">Customer Name</h4>
//                   <span className="text-[#221F1F] text-[18px]">
//                     Turcon Maritime
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-[22px] font-semibold">Phone No</h4>
//                   <span className="text-[#221F1F] text-[18px]">
//                     +91 9582454549
//                   </span>
//                 </div>
//                 <div>
//                   <h4 className="text-[22px] font-semibold">Email</h4>
//                   <span className="text-[#221F1F] text-[18px]">
//                     www.sales@turccon.com{" "}
//                   </span>
//                 </div>
//               </div>
//               <div className="divider p-0 m-0"></div>

//               <div className="flex flex-col p-3 gap-3">
//                 <h2 className="text-2xl font-semibold">Description</h2>
//                 <Paper sx={{ width: "100%" }}>
//                   <TableContainer>
//                     <Table stickyHeader aria-label="sticky table">
//                       <TableHead>
//                         <TableRow>
//                           {columns.map((column) => (
//                             <TableCell
//                               key={column.id}
//                               align={column.align}
//                               style={{
//                                 minWidth: column.minWidth,
//                                 background: "#E4E4E4",
//                               }}
//                             >
//                               <span className="font-semibold">
//                                 {" "}
//                                 {column.label}
//                               </span>
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {rows.map((row) => {
//                           return (
//                             <TableRow
//                               hover
//                               role="checkbox"
//                               tabIndex={-1}
//                               key={row._id}
//                             >
//                               {columns.map((column) => {
//                                 const value = row[column.id as keyof Data];
//                                 return (
//                                   <TableCell
//                                     key={column.id}
//                                     align={column.align}
//                                     sx={{ padding: "8px" }}
//                                   >
//                                     {value}
//                                   </TableCell>
//                                 );
//                               })}
//                             </TableRow>
//                           );
//                         })}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </Paper>
//               </div>
//               <div className="flex justify-between"></div>
//               <div className="flex justify-between"></div>
//             </div>
//             </>

//           }) }
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Orders;
import { Link, NavLink, Outlet } from "react-router-dom";
import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useEffect, useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useAuth } from "../../utils/AuthContext";
// import { useDolorFormat } from "../../utils/useDollorFormat";

const Orders: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col  ">
        <div className="flex justify-between items-center mt-4">
          <div className=" flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A] ">Orders</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}>Home / </Link>
              <span className="font-semibold text-[#0B0A0A]">Orders </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 my-4">
          <div className="flex  text-xs lg:text-sm font-semibold  items-center gap-3 lg:gap-4 overflow-x-scroll lg:overflow-auto">
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/all"
            >
              All
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/processing"
            >
              Processing
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/invoice"
            >
              Invoice
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl  ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/collected"
            >
              Collected
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-[6px] rounded-lg md:px-4 md:py-2  md:rounded-xl ${
                  isActive
                    ? "text-[#005E99] bg-[#D7F0FF]"
                    : "text-[#221F1F] bg-[#E4E4E4]"
                }`
              }
              to="/buy/orders/cancelled"
            >
              Cancelled
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Orders;
