import React from "react";

function ModalDefalt({ isOpen, message, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="joinModal text-center">
      {/* 모달 백그라운드 */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: "999998",
        }}
        onClick={onClose}
      />
      {/* 실제 모달 창 */}
      <div
        style={{
          width: "400px",
          height: "auto",
          margin: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          borderRadius: "5px",
          zIndex: "999999",
        }}
      >
        <p className="py-[50px] text-[18px]">{message}</p>
        <hr />
        <div className="py-[20px]">
          <button
            type="button"
            onClick={onConfirm}
            className="text-white bg-blue-400 hover:bg-blue-500 duration-150 rounded-[5px] px-7 py-3"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDefalt;
