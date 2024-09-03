import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../utils/AuthContext";
import { useDolorFormat } from "../../utils/useDollorFormat";
import NoOrder from "../../components/emptyOrder/NoOrder";
const ProcessingOrder = () => {
  interface Column {
    id: "container" | "location" | "quantity" | "price" | "totalprice";
    label: string;
    minWidth?: number;
    align?: "center" | "right";
    format?: (value: number) => string;
  }

  interface Item {
    condition: string;
    country: string;
    createdAt: string;
    itemcount: number;
    portLocation: string;
    sellerId: [object];
    size: string;
    stockCount: number;
    price: string;
    updatedAt: string;
    userId: string;
    type: string;
    _id: string;
  }

  interface Order {
    paymentStatus: string;
    orderStatus: string;
    items: Item[];
    bookingId: string;
    _id: string;
    paymentMethod: string;
    userDetails: {
      fullName: string;
      phone: string;
      email: string;
    };
    createdAt: string;
    tax: number;
    totalAmount: number;
    totalPrice: number;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const columns: Column[] = [
    { id: "container", label: "Container" },
    { id: "location", label: "Location", align: "center" },
    {
      id: "quantity",
      label: "Quantity",
      align: "center",
    },
    {
      id: "price",
      label: "Per Unit",
      align: "center",
    },
    {
      id: "totalprice",
      label: "Total Price",
      align: "right",
    },
  ];

  const { user } = useAuth();
  const userId = user?.id || "";

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const dollor = useDolorFormat;

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/api/order/getbyuser", {
        params: { userId, orderStatus: "processing" },
      });
      setOrders(response.data?.orders || []);
      console.log(response, "res");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      {orders.length === 0 && <NoOrder />}

      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col gap-3 px-8 py-8 shadow-[0px_0px_4px_rgb(0,0,0,0.2)] rounded-xl"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl xl:text-2xl font-semibold">Order Details</h3>
            <div className="p-3 bg-[#E4E4E4] text-[#221F1F] rounded-md">
              <p className="text-sm capitalize">{order.orderStatus}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between lg:items-center">
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Booking Id</h4>
              <span className="text-[#655F5F] text-sm">
                {order.bookingId.toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">
                Order Date/time
              </h4>
              <span className="text-[#655F5F] text-sm">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="divider p-0 m-0"></div>
          <div className="flex flex-wrap lg:items-center justify-between border-[#E4E4E4] lg:text-center">
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">
                Customer Name
              </h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.fullName}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Phone No</h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.phone}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Email</h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.email}
              </span>
            </div>
          </div>
          <div className="divider p-0 m-0"></div>
          <div className="flex flex-col p-3 gap-3 bg-[#fafafa] rounded-md">
            <h2 className="text-2xl font-semibold">Description</h2>
            <Paper sx={{ width: "100%", boxShadow: "none" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: "#fafafa",
                            borderBottom: "none",
                          }}
                        >
                          <span className="font-semibold">{column.label}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item._id}
                        sx={{
                          background: "#fafafa",
                          border: "none !important",
                          "&:hover": {
                            backgroundColor: "#fafafa !important",
                          },
                        }}
                      >
                        {columns.map((column) => {
                          let cellValue;

                          switch (column.id) {
                            case "container":
                              cellValue = `${item.condition} - ${item.size}`;
                              break;
                            case "location":
                              cellValue = `${item.country} - ${item.portLocation}`;
                              break;
                            case "quantity":
                              cellValue = item.itemcount;
                              break;
                            case "price":
                              cellValue = dollor(Number(item.price));
                              break;
                            case "totalprice":
                              cellValue = dollor(
                                item.itemcount * parseFloat(item.price)
                              );
                              break;
                            default:
                              cellValue = "N/A";
                              break;
                          }

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ padding: "8px", borderBottom: "none" }}
                            >
                              {cellValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="divider p-0 m-0"></div>
            <div className="flex justify-between flex-col text-center md:w-1/3 md:ml-auto">
              <div className="flex  items-center  justify-between">
                <h3 className="text-lg font-semibold">Amount</h3>
                <span className="text-lg ">
                  {dollor(Number(order.totalPrice))}
                </span>
              </div>
              <div className="flex  items-center  justify-between">
                <h3 className="text-lg font-semibold">Tax(10%)</h3>
                <span className="text-lg ">{dollor(Number(order.tax))}</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Amount</h3>
                <span className="text-lg  text-[#15B097]">
                  {dollor(Number(order.totalAmount))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-between">
            <div>
              <h4 className="text-lg ">Payment Method</h4>
              <p className="text-[#655F5F] text-sm font-semibold  capitalize">
                {order.paymentMethod} Transfer
              </p>
            </div>
            <div className="">
              <h4 className=" text-lg">Payment Status</h4>
              <p className=" font-semibold text-[#C03744] text-sm capitalize ">
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProcessingOrder;
