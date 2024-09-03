import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { SetCartCount } from "../../store/slice/containerCount";
import bankIcon from "/bank.svg";
import creditIcon from "/credit.svg";
import locationIcon from "/location.svg";
import containerImg from "/cartContainer.png";
import infoIcon from "/info.svg";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../utils/AuthContext";

interface CustomRadioButtonProps {
  value: string;
  label: string;
  imgSrc: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

const CartItem: React.FC<{
  _id: string;
  name: string;
  size: string;
  portLocation: string;
  country: string;
  type: string;
  price: number;
  condition: string;
  itemCount: number;
  userId: string;
}> = ({
  name,
  portLocation,
  price,
  itemCount,
  country,
  size,
  type,
  condition,
}) => {
  const UsFormat = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return formattedAmount;
  };

  return (
    <>
      <div className="border flex flex-col gap-1 bg-gray-50 p-4 rounded-md">
        <div className="flex gap-2 items-center md:justify-between">
          <div className="flex flex-col gap-2 md:border-r-2 md:basis-2/5 ">
            <div className="flex ">
              <img src={locationIcon} alt="Location" />
              <p>
                {portLocation}
                <span className="text-xs text-gray-400"> {country}</span>
              </p>
            </div>

            <div className="flex gap-2 lg:items-center">
              <div className="w-20">
                <img src={containerImg} alt={name} />
              </div>

              <div className="flex-col flex gap-2 w-1/2 md:w-auto text-center">
                <h2 className="font-semibold text-start">
                  {size} {type} {name}
                </h2>
                <div className="flex justify-between">
                  <div className="chip inline">{condition}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block ">
            <h3 className="text-sm text-center">Unit Price</h3>
            <p className="text-center font-semibold">{UsFormat(price)}</p>
          </div>

          <div className="hidden md:block  text-center">
            <h3 className="text-sm ">Quantity</h3>
            <div className="text-center  cursor-pointer mx-auto font-semibold">
              {itemCount}
            </div>
          </div>
          <div className="hidden md:block ">
            <h3 className="text-sm text-center">Total price</h3>
            <p className="hidden md:block  text-[#15B097] text-lg text-center h-full font-semibold">
              {UsFormat(price * itemCount)}
            </p>
          </div>
        </div>

        <div className="flex md:hidden justify-between items-center">
          <div className="md:hidden block">
            <h3 className="text-sm text-center">Unit Price</h3>
            <p className="text-center font-semibold">{UsFormat(price)}</p>
          </div>

          <div className="md:hidden block">
            <h3 className="text-sm ">Quantity</h3>
            <div className="text-center cursor-pointer mx-auto font-semibold">
              {itemCount}
            </div>
          </div>

          <div className="md:hidden block ">
            <h3 className="text-sm text-center">Total price</h3>
            <p className="text-xl text-[#15B097]  text-center h-full font-semibold">
              {UsFormat(price * itemCount)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  value,
  label,
  imgSrc,
  checked,
  onChange,
  className,
}) => (
  <label
    className={`flex items-center gap-4 cursor-pointer ${className} ${
      checked ? "bg-[#005e99] text-white" : ""
    }`}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden" // Hide default radio button
    />
    <div
      className={`w-5 h-5 border-2 rounded-full ${
        checked ? "border-white" : "border-gray-400"
      } flex items-center justify-center`}
    >
      {checked && <div className="w-3 h-3 bg-white rounded-full" />}
    </div>
    <div className="flex items-center gap-2">
      <img
        src={imgSrc}
        alt={label}
        className="w-6 h-6"
        style={{ filter: checked ? "invert(1) brightness(2)" : undefined }}
      />
      <p className="font-semibold">{label}</p>
    </div>
  </label>
);

const ReviewOrder: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || "";
  const [error, setError] = useState<string>("");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(event.target.value);
    setError("");
  };
  const itemTotal = items?.map((item) => item.price * item.itemcount);

  const UsFormat = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return formattedAmount;
  };
  const rawTotalPrice = itemTotal.reduce((acc, item) => acc + item, 0);

  const totalPrice = UsFormat(rawTotalPrice);

  const rawTax = rawTotalPrice * 0.1;

  const tax = UsFormat(rawTax);

  const rawTotalAmount = rawTotalPrice + rawTax;

  const totalAmount = UsFormat(rawTotalAmount);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreementChecked(event.target.checked);
    setError("");
  };
  const createOrder = async () => {
    try {
      const response = await axiosInstance.post("/api/order/create", {
        userId,
        paymentMethod: selectedPaymentMethod,
        tax: rawTax,
        totalAmount: rawTotalAmount,
        totalPrice: rawTotalPrice,
      });
      console.log(response);
      console.log(response.data.message);
      const msg = response.data?.message;
      if (msg) {
        setIsBooked(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    //order data:{items:[id1,id2,userId,paymentmethod]}
    if (!selectedPaymentMethod) {
      setError("Please select a payment method.");
    } else if (!isAgreementChecked) {
      setError("You must agree to the Sales Agreement.");
    } else {
      setError("");
      createOrder();
    }
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get(`/api/cart/getcart`, {
        params: { userId },
      });
      setItems(response.data);

      dispatch(SetCartCount(response.data.length));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleGoToOrders = () => {
    navigate("/buy/orders/all");
    setIsBooked(false);
  };

  return (
    <div className="container mx-auto">
      {isBooked && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="z-20 fixed w-full flex items-center justify-center  inset-0 text-center  ">
            <div className="flex flex-col items-center justify-center max-w-[550px] w-full rounded-xl bg-white py-8 px-14 gap-6">
              <h3 className="text-2xl font-semibold">Congratulations!!!</h3>
              <div>{/* lotte */}</div>
              <h4 className="font-semibold text-lg">
                Your Booking Request Submitted Successfully!
              </h4>
              <p className="text-[#4E4949] text-xs">
                Thank you for your request. Our team will contact you shortly to
                finalize the details. Please click the 'Go to Orders' button
                below to check your orders.
              </p>
              <div onClick={handleGoToOrders}>
                <div className="btn btn-prime">Go To Orders</div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex-col flex gap-4 my-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A]">
              Review Order
            </div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              <Link to={"/"}>home</Link> /{" "}
              <Link to={"/buy/inventory"}>Inventory </Link>/{" "}
              <Link to={"/buy/cart"}>Cart /</Link>
              <span className="font-semibold text-[#0B0A0A]">
                {" "}
                Review Order
              </span>
            </div>
          </div>
          <div className="btn btn-secondbtn" onClick={handleBack}>
            Back
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-6 gap-10">
          {items.length > 0 ? (
            <>
              <div className="lg:w-2/3 flex flex-col gap-2">
                <div className="flex items-start gap-2 bg-[#f7fcff] p-4  rounded-md } ">
                  <img src={infoIcon} alt="Info" className="w-3 pt-1" />
                  <p className="text-[#008FE8] text-[10px] md:text-sm ">
                    We offer 5 free storage days. Please confirm your awareness.
                    (Orders not picked up within this time frame may be
                    canceled, and storage fees may apply.)
                  </p>
                </div>
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    portLocation={item.portLocation}
                    price={item.price}
                    country={item.country}
                    type={item.type}
                    size={item.size}
                    condition={item.condition}
                    itemCount={item.itemcount}
                    userId={userId}
                  />
                ))}
              </div>
              <div className=" p-6 Summary bg-[#FAFAFA] w-full lg:w-1/3 mx-auto rounded-md flex flex-col gap-4">
                <div className="p-4 flex flex-col gap-6 bg-white rounded-md">
                  <h2 className="text-3xl text-center">Summary</h2>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <p className="text-xl">Items</p>
                      <p className="font-semibold text-lg">{items.length}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xl">Price</p>
                      <p className="font-semibold text-lg">{totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xl">Tax (10%)</p>
                      <p className=" font-semibold  text-lg">{tax}</p>
                    </div>
                  </div>
                  <div>
                    <div className="divider p-0 m-0"></div>{" "}
                    <div className="flex justify-between">
                      <p className="text-xl font-semibold">Total Amount</p>
                      <p className=" font-semibold text-[#15B097]   text-xl">
                        {totalAmount}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex
                  items-center justify-start gap-2"
                  >
                    <input
                      type="checkbox"
                      id="agree"
                      checked={isAgreementChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agree" className="text-xs ">
                      I Agree with the{" "}
                      <span className="text-[#005E99] font-semibold">
                        Sales Agreement
                      </span>
                    </label>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-6 bg-white rounded-md">
                  <h2 className="text-2xl font-semibold ">Payment</h2>

                  <div className="flex flex-col gap-4">
                    <CustomRadioButton
                      value="bank"
                      label="Bank Transfer"
                      imgSrc={bankIcon}
                      checked={selectedPaymentMethod === "bank"}
                      onChange={handleChange}
                      className={"p-2 rounded-md "}
                    />
                    <CustomRadioButton
                      value="card"
                      label="Credit / Debit Card"
                      imgSrc={creditIcon}
                      checked={selectedPaymentMethod === "card"}
                      onChange={handleChange}
                      className={"p-2 rounded-md"}
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-center lg:text-start text-red-500 text-xs">
                    {error}
                  </p>
                )}

                <div className="btn btn-prime w-full" onClick={handleSubmit}>
                  Send Booking Request
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col gap-2 text-center">
              please select cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
