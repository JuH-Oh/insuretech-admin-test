import type { ApproveItem, OpinionItem, NotificationItem } from '@/types/documents';

export interface AppealItem {
  id: string;
  claimId: string;
  complex: string;
  dongHo: string;
  accidentType: string;
  opinionType: string;
  reason: string;
  status: '접수' | '검토중' | '수용' | '기각';
  submittedAt: string;
  reviewComment?: string;
}

export interface IndemnityItem {
  id: string;
  claimId: string;
  complex: string;
  accidentType: string;
  targetCompany: string;
  amount: number;
  status: '확인' | '통보' | '협상중' | '정산완료' | '소송';
  createdAt: string;
  settledAt?: string;
}

export const approveItems: ApproveItem[] = [
  {
    claimId: 'CLM-0382',
    accidentType: '급배수 누수',
    complex: '은평뉴타운',
    dongHo: '301동 901호',
    finalAmount: 1190000,
    requestDate: '2026-03-25',
    status: '대기',
  },
  {
    claimId: 'CLM-0398',
    accidentType: '누수·침수',
    complex: '헬리오시티',
    dongHo: '102동 1204호',
    finalAmount: 800000,
    requestDate: '2026-03-31',
    status: '대기',
  },
  {
    claimId: 'CLM-0375',
    accidentType: '욕실 배관 누수',
    complex: '래미안 원베일리',
    dongHo: '101동 301호',
    finalAmount: 577850,
    requestDate: '2026-03-20',
    status: '승인',
    approveDate: '2026-03-21',
    approver: '김지수 손해사정사',
  },
  {
    claimId: 'CLM-0390',
    accidentType: '놀이터사고',
    complex: '송도더샵',
    dongHo: 'A동 공용',
    finalAmount: 1400000,
    requestDate: '2026-03-29',
    status: '대기',
  },
];

export const opinionItems: OpinionItem[] = [
  {
    id: 'OPN-001',
    claimId: 'CLM-0385',
    type: '면책의견서',
    summary: '잠실파크리오 타일파손 — 입주민 과실 면책',
    date: '2026-03-25',
    status: '발송완료',
    recipient: '홍○○',
  },
  {
    id: 'OPN-002',
    claimId: 'CLM-0378',
    type: '면책의견서',
    summary: '분당파크뷰 바닥재 파손 — 자연노화 면책',
    date: '2026-03-20',
    status: '발송완료',
    recipient: '분당파크뷰 관리사무소',
  },
  {
    id: 'OPN-003',
    claimId: 'CLM-0365',
    type: '면책의견서',
    summary: '헬리오시티 창호 결로 — 면책조항 해당',
    date: '2026-03-12',
    status: '발송완료',
    recipient: '박○○',
  },
  {
    id: 'OPN-004',
    claimId: 'CLM-0385',
    type: '이의신청검토',
    summary: '잠실파크리오 타일파손 — 이의신청 접수',
    date: '2026-04-01',
    status: '이의신청접수',
  },
  {
    id: 'OPN-005',
    claimId: 'CLM-0398',
    type: '손해사정의견서',
    summary: '헬리오시티 누수 — 손해사정 의견서',
    date: '2026-03-31',
    status: '발송완료',
    recipient: '헬리오시티 관리사무소',
  },
  {
    id: 'OPN-006',
    claimId: 'CLM-0382',
    type: '보완요청',
    summary: '은평뉴타운 급배수 — 추가 사진 요청',
    date: '2026-03-24',
    status: '작성중',
  },
];

export const notifications: NotificationItem[] = [
  { message: '101동 1502호 방문요청 접수', time: '10분 전', type: 'info' },
  { message: 'CLM-0398 현장조사 보고서 도착', time: '1시간 전', type: 'success' },
  { message: 'CLM-0385 이의신청 접수', time: '3시간 전', type: 'warning' },
];

export const appealItems: AppealItem[] = [
  {
    id: 'APL-001',
    claimId: 'CLM-0370',
    complex: '래미안 원베일리',
    dongHo: '201동 1502호',
    accidentType: '누수·침수',
    opinionType: '면책의견서',
    reason: '상층 배관 노후 누수로 인한 피해인데 면책 처리는 부당합니다. 시공사 책임이 명백합니다.',
    status: '접수',
    submittedAt: '2026-04-01',
  },
  {
    id: 'APL-002',
    claimId: 'CLM-0355',
    complex: '헬리오시티',
    dongHo: '102동 801호',
    accidentType: '균열·파손',
    opinionType: '면책의견서',
    reason: '외벽 균열이 사용승인 4년차에 발생했는데 시공사 하자가 아니라는 판단에 이의를 제기합니다.',
    status: '검토중',
    submittedAt: '2026-03-28',
    reviewComment: '현장 재조사 중',
  },
  {
    id: 'APL-003',
    claimId: 'CLM-0340',
    complex: '은평뉴타운',
    dongHo: '301동 601호',
    accidentType: '화재·폭발',
    opinionType: '면책의견서',
    reason: '화재 원인이 전기 배선 불량으로 밝혀졌음에도 입주민 과실로 처리한 것에 이의를 제기합니다.',
    status: '수용',
    submittedAt: '2026-03-20',
    reviewComment: '전기 배선 불량 확인됨. 이의신청 수용, TYPE C 재분류 처리.',
  },
  {
    id: 'APL-004',
    claimId: 'CLM-0325',
    complex: '마포래미안',
    dongHo: '803동 302호',
    accidentType: '신체손해',
    opinionType: '면책의견서',
    reason: '주차장 바닥 파손으로 인한 낙상 사고인데 입주민 과실로 처리한 것은 부당합니다.',
    status: '기각',
    submittedAt: '2026-03-15',
    reviewComment: 'CCTV 분석 결과 입주민 과실 확인. 기각.',
  },
];

export const indemnityItems: IndemnityItem[] = [
  { id: 'IDM-001', claimId: 'CLM-0395', complex: '마포래미안', accidentType: '균열·파손', targetCompany: '○○건설', amount: 5200000, status: '협상중', createdAt: '2026-03-15' },
  { id: 'IDM-002', claimId: 'CLM-0380', complex: '헬리오시티', accidentType: '누수·침수', targetCompany: '△△시공', amount: 1800000, status: '통보', createdAt: '2026-03-20' },
  { id: 'IDM-003', claimId: 'CLM-0360', complex: '래미안 원베일리', accidentType: '균열·파손', targetCompany: '○○건설', amount: 3400000, status: '정산완료', createdAt: '2026-03-01', settledAt: '2026-03-28' },
  { id: 'IDM-004', claimId: 'CLM-0340', complex: '은평뉴타운', accidentType: '누수·침수', targetCompany: '□□도급', amount: 8700000, status: '소송', createdAt: '2026-02-10' },
];
