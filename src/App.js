import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [order, setOrder] = useState({
    name: "",
    address: "",
    storename: "",
    items: "",
    time: "",
    status: "접수됨",
  });
  const [orders, setOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filterTime, setFilterTime] = useState("전체");

  const handleSubmit = () => {
    if (
      order.name &&
      order.address &&
      order.storename &&
      order.items &&
      order.time
    ) {
      setOrders([...orders, order]);
      setSubmitted(true);
      setOrder({
        name: "",
        address: "",
        storename: "",
        items: "",
        time: "",
        status: "접수됨",
      });
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  const updateOrderStatus = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const filteredOrders =
    filterTime === "전체"
      ? orders
      : orders.filter((o) => o.time === filterTime);

  return (
    <div className="container">
      <header className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7610/7610611.png"
          alt="배송 일러스트"
          className="header-illustration"
        />
        <h1 className="title">소상공인 배달 연합 시스템</h1>
        <p className="subtitle">지역 상점들을 위한 묶음 배송 서비스</p>
      </header>

      <div className="form-section">
        <input
          placeholder="이름"
          value={order.name}
          onChange={(e) => setOrder({ ...order, name: e.target.value })}
          className="input"
        />

        <input
          placeholder="주소 또는 수령 위치"
          value={order.address}
          onChange={(e) => setOrder({ ...order, address: e.target.value })}
          className="input"
        />

        <input
          placeholder="가게명/상호명"
          value={order.storename}
          onChange={(e) => setOrder({ ...order, storename: e.target.value })}
          className="input"
        />

        <input
          placeholder="상품 목록 (예: 김밥 2줄, 물 1병)"
          value={order.items}
          onChange={(e) => setOrder({ ...order, items: e.target.value })}
          className="input"
        />

        <select
          value={order.time}
          onChange={(e) => setOrder({ ...order, time: e.target.value })}
          className="input"
        >
          <option value="">수령 희망 시간 선택</option>
          <option value="9:00~11:00">9:00~11:00</option>
          <option value="11:00~13:00">11:00~13:00</option>
          <option value="13:00~15:00">13:00~15:00</option>
          <option value="15:00~17:00">15:00~17:00</option>
          <option value="17:00~19:00">17:00~19:00</option>
        </select>

        <button onClick={handleSubmit} className="submit-button">
          🧺 주문하기
        </button>
      </div>

      {submitted && (
        <div className="confirmation">✅ 주문이 접수되었습니다!</div>
      )}

      {orders.length > 0 && (
        <div className="dashboard">
          <h2 className="dashboard-title"> 주문 목록</h2>

          <select
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            className="filter-select"
          >
            <option value="전체">전체</option>
            <option value="9:00~11:00">9:00~11:00</option>
            <option value="11:00~13:00">11:00~13:00</option>
            <option value="13:00~15:00">13:00~15:00</option>
            <option value="15:00~17:00">15:00~17:00</option>
            <option value="17:00~19:00">17:00~19:00</option>
          </select>

          {filteredOrders.map((ord, idx) => (
            <div key={idx} className="order-card">
              <div>
                <strong> 이름:</strong> {ord.name}
              </div>
              <div>
                <strong> 위치:</strong> {ord.address}
              </div>
              <div>
                <strong> 가게명:</strong> {ord.storename}
              </div>
              <div>
                <strong>상품:</strong> {ord.items}
              </div>
              <div>
                <strong>시간:</strong> {ord.time}
              </div>
              <div>
                <strong>상태:</strong> {ord.status}
              </div>
              <div className="pill-button-group">
                <button
                  onClick={() => updateOrderStatus(idx, "배송 완료")}
                  className="pill pill-done"
                >
                  ✅ 배송 완료
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
