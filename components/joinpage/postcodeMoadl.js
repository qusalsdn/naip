import React,{ useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';//postCode 쓰기 위해

export default function PostcodeModal({setAddr1Input, validateAddress, setAddr2Input, setAddrModalOpen, handleAddrClose}) {
    const DaumPostcode = dynamic(
        () => import('react-daum-postcode'),
        { ssr: false }
    );
    
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        setAddr1Input(fullAddress);
        validateAddress(fullAddress)
        setAddr2Input('');
        setAddrModalOpen(false); // 주소 선택 후 모달 닫기
    
    };
    return (
        <div>
            {/* 모달 백그라운드 */}
            <div style={{position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.2)', zIndex: '999998'}} onClick={handleAddrClose} />
                {/* 실제 모달 창 */}
            <div style={{width: '500px', height: 'auto', position: 'fixed', top: '50%', left:'50%', transform:'translate(-50%, -50%)', backgroundColor:'#ffffff', borderRadius:'5px', padding:'5px', zIndex:'999999'}}>
                <DaumPostcode onComplete={handleComplete} />
            </div>
        </div>
    )
}
