import React, { useState } from 'react';
import SignupForm from './SignupForm';
import Description from '../LoginPage/Description';
import TermsDetails from './Terms'; 
import './style.css';


function SignupPage() {
  const [agreedToTerms1, setAgreedToTerms1] = useState(false);
  const [agreedToTerms2, setAgreedToTerms2] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);

  const [showSignupForm, setShowSignupForm] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [confirmation1, setConfirmation1] = useState(false);
  const [confirmation2, setConfirmation2] = useState(false);

  const handleAgreeToTerms = (setAgreed, setShowModal, setConfirmation) => {
    setAgreed((prevAgreed) => !prevAgreed);
    setShowModal(false);
    setConfirmation(true);
  };

  const handleModalClick1 = (e) => {
    if (e.target.className === 'modal') {
      handleHideModal1();
    }
  };

  const handleShowModal1 = () => {
    setShowModal1(true);
  };

  const handleHideModal1 = () => {
    setShowModal1(false);
  };

  const handleAgreeToTerms1 = () => {
    handleAgreeToTerms(setAgreedToTerms1, setShowModal1, setConfirmation1);
  };

  const handleModalClick2 = (e) => {
    if (e.target.className === 'modal') {
      handleHideModal2();
    }
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };

  const handleHideModal2 = () => {
    setShowModal2(false);
  };

  const handleAgreeToTerms2 = () => {
    handleAgreeToTerms(setAgreedToTerms2, setShowModal2, setConfirmation2);
  };

  const handleAgreeAll = () => {
    if (!allAgreed) {
      setAgreedToTerms1(true);
      setAgreedToTerms2(true);
      setAllAgreed(true);
    } else {
      setAgreedToTerms1(false);
      setAgreedToTerms2(false);
      setAllAgreed(false);
    }
  };

  const handleNextButtonClick = () => {
    if (agreedToTerms1 && agreedToTerms2) {
      setShowSignupForm(true);
    }
  };

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>목적</th>
          <th>항목</th>
          <th>보유기간</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.목적}</td>
            <td>{item.항목}</td>
            <td>{item.보유기간}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

  const [data, setData] = useState([
    { 목적: 'LiQuest플랫폼 일반 회원가입 및 서비스의 이용, 유지, 종료', 항목: '회원가입 신청인의 성명(국문 및 영문), 이메일(아이디), 비밀번호, 휴대전화번호, 성별, 생년월일, 연계정보(CI), 회사코드(기업고객에 한함)', 보유기간: 'LiQuest플랫폼 제공 서비스 이용기간 동안.분쟁대비를 위해 서비스 이용기간 종료 후 6개월까지.단, 분쟁지속시 해결시 까지 보유※ 예외법령에 특별한 규정이 있을 경우 관련 법령에 따라 보관' },
    { 목적: 'LiQuest 네트워크 서비스 제공, 이용관련 문의 불만처리, 고객민원처리 등', 항목: '성명, 이메일, 사진, 소셜미디어 계정정보', 보유기간: '개인 페이지 삭제시 또는 회원탈퇴시까지 보유' },
    { 목적: '관련 법률에 따르거나 서비스 이용 또는 업무처리과정에서 생성되어 수집/이용', 항목: '이용시간/이용기록, 접속로그, 이용 컨텐츠, 쿠키, 접속IP정보, 결제기록, 이용정지기록 등 서비스 이용정보', 보유기간: 'LiQuest플랫폼 제공 서비스 이용기간' },
    { 목적: 'LiQuest가 제공하는 이용자 맞춤형 서비스 제공', 항목: '성명, 이메일(아이디), 휴대폰정보, 이용시간/이용기록, 접속로그, 이용 컨텐츠, 쿠키, 접속IP정보, 결제기록, 이용정지기록 등 서비스 이용정보', 보유기간: 'LiQuest플랫폼 제공 서비스 이용기간' },
  ]);
    
  return (
    <div style={{ padding: '63px' }}>
      <section style={{ width: '100%', height: '75vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1', display: 'flex' }}>
          <Description />
          {showSignupForm ? (
            <SignupForm />
          ) : (
            <div style={{ 
              flexBasis: '50%', alignItems: 'center', justifyContent: 'center', 
              display:'flex', flexDirection:'column', padding:'63px'}}>
              <div class="flex flex-wrap -mx-3 mb-4">
              <h1 className='font-bold'>LiQuest 서비스 약관에 동의해 주세요</h1>
              </div>
              <div class="flex flex-wrap -mx-3 mb-4">
              <button onClick={handleAgreeAll} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white'>
                {allAgreed ? '전체 동의 해제' : '모두 동의'}
              </button>
              </div>
              <div class="flex flex-wrap -mx-3 mb-4">
              <button onClick={handleShowModal1} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white'>{['LiQuest 이용약관', agreedToTerms1 && ' 완료']}</button>
              </div>
              {showModal1 && (
                <div className="modal" onClick={handleModalClick1}>
                  <div className="modal-content" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <TermsDetails />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {!confirmation1 && (
                      <label>
                        <input type="checkbox" checked={agreedToTerms1} onChange={handleAgreeToTerms1} />
                        동의 하시겠습니까?
                      </label>
                    )}
                    {confirmation1 && (
                    <label>
                        <input type="checkbox" checked={agreedToTerms1} onChange={handleAgreeToTerms1} />
                        동의 하셨습니다.
                      </label>)}
                  </div>
                </div>
                </div>
              )}
              <div class="flex flex-wrap -mx-3 mb-4">
              <button onClick={handleShowModal2} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white'>{['개인정보 수집 및 이용 동의', agreedToTerms2 && ' 완료']}</button>
              </div>
              {showModal2 && (
                <div className="modal" onClick={handleModalClick2}>
                  <div className="modal-content" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table data={data} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {!confirmation2 && (
                      <label>
                        <input type="checkbox" checked={agreedToTerms2} onChange={handleAgreeToTerms2} />
                        동의 하시겠습니까?
                      </label>
                    )}
                    {confirmation2 && (
                    <label>
                        <input type="checkbox" checked={agreedToTerms2} onChange={handleAgreeToTerms2} />
                        동의 하셨습니다.
                      </label>)}
                  </div>
                </div>
                </div>
              )}
              <div class="flex flex-wrap -mx-3 mb-4">
              <button
                onClick={handleNextButtonClick}
                className={`py-2 w-full px-3 rounded-md text-white font-semibold 
                  ${agreedToTerms1 && agreedToTerms2 
                    ? 'bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white transition ease-in-out duration-300' 
                    : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!agreedToTerms1 || !agreedToTerms2}
              >
                다음
              </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
