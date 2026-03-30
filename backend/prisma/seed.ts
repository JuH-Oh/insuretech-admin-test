import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ── Users ──
  const adjuster = await prisma.user.create({
    data: {
      email: 'jisu.kim@aptinsurance.co.kr',
      name: '김지수',
      role: 'adjuster',
    },
  });

  const legal = await prisma.user.create({
    data: {
      email: 'legal@aptinsurance.co.kr',
      name: 'APT Insurance 법무팀',
      role: 'legal',
    },
  });

  // ── Complexes ──
  const helio = await prisma.complex.create({
    data: {
      name: '헬리오시티 102동 1204호',
      address: '서울시 송파구',
      builtAt: new Date('2017-06-01'),
    },
  });

  const mapo = await prisma.complex.create({
    data: {
      name: '마포래미안 803호',
      address: '서울시 마포구',
      builder: '○○건설',
      builtAt: new Date('2018-11-01'),
      warrantyYr: 10,
    },
  });

  const jamsil = await prisma.complex.create({
    data: {
      name: '잠실파크리오 1205호',
      address: '서울시 송파구',
    },
  });

  const songdo = await prisma.complex.create({
    data: {
      name: '송도더샵 A동 201호',
      address: '인천시 연수구',
      builder: '△△건설',
      builtAt: new Date('2019-03-01'),
    },
  });

  const bundang = await prisma.complex.create({
    data: {
      name: '분당파크뷰 502호',
      address: '성남시 분당구',
    },
  });

  const raemian = await prisma.complex.create({
    data: {
      name: '래미안 원베일리 301호',
      address: '서울시 서초구',
    },
  });

  const eunpyeong = await prisma.complex.create({
    data: {
      name: '은평뉴타운 관리동',
      address: '서울시 은평구',
    },
  });

  // ── Policies ──
  const helioPolicy = await prisma.policy.create({
    data: {
      complexId: helio.id,
      policyType: 'housing_fire',
      holderName: '헬리오시티 입주자대표회의',
      deductible: 30000,
    },
  });

  const mapoPolicy = await prisma.policy.create({
    data: {
      complexId: mapo.id,
      policyType: 'fire',
      holderName: '마포래미안 관리사무소',
    },
  });

  const jamsilPolicy = await prisma.policy.create({
    data: {
      complexId: jamsil.id,
      policyType: 'liability',
      holderName: '잠실파크리오 관리사무소',
    },
  });

  // ── Claims ──
  // CLM-0244: 은평뉴타운 — Type C, wait
  await prisma.claim.create({
    data: {
      id: 'CLM-0244',
      complexId: eunpyeong.id,
      assigneeId: adjuster.id,
      description: '엘리베이터 낙상 사고',
      type: 'C',
      status: 'wait',
      amount: 1240000,
      aiConfidence: 0.983,
      claimedAt: new Date('2026-03-12'),
    },
  });

  // CLM-0247: 헬리오시티 — Type C, done
  await prisma.claim.create({
    data: {
      id: 'CLM-0247',
      complexId: helio.id,
      policyId: helioPolicy.id,
      assigneeId: adjuster.id,
      description: '천장 급배수 누수',
      type: 'C',
      status: 'done',
      amount: 607850,
      aiConfidence: 0.971,
      claimedAt: new Date('2026-03-14T09:23:00+09:00'),
      // Type C detail
      estimation: {
        create: {
          totalAmount: 607850,
          calcSeconds: 401,
          vendorEstimate: 850000,
          depreciation: 60150,
          indirectRate: 0.105,
          finalAmount: 607850,
          items: {
            create: [
              { name: '방수층 보수', description: '탄성도막 방수', quantity: 3.10, unit: '㎡', standardSrc: 'standard_cost', subtotal: 79100, sortOrder: 0 },
              { name: '천장 재도장', description: '퍼티 + 도장 2회', quantity: 12.30, unit: '㎡', standardSrc: 'price_index', subtotal: 124700, sortOrder: 1 },
              { name: '균열주입', description: '에폭시 수지', quantity: 4.70, unit: 'm', standardSrc: 'standard_cost', subtotal: 104900, sortOrder: 2 },
              { name: '석고보드 교체', description: '미선택', quantity: 2.40, unit: '㎡', subtotal: 42700, isSelected: false, sortOrder: 3 },
            ],
          },
        },
      },
      // Photos
      photos: {
        create: [
          {
            label: '세그멘테이션 결과',
            fileUrl: '/uploads/CLM-0247/segmentation.jpg',
            sortOrder: 0,
            annotations: [{ text: 'AREA 2.4㎡', position: 'bottom-right', color: 'var(--color-primary)' }],
          },
          { label: '근접 확인', fileUrl: '/uploads/CLM-0247/close1.jpg', sortOrder: 1 },
          { label: '재료 확인', fileUrl: '/uploads/CLM-0247/material.jpg', sortOrder: 2 },
        ],
      },
      // AI Reasons
      aiReasons: {
        create: [
          { reasonText: '공용 급배수 배관 누출에 의한 전유부 피해 확인', sortOrder: 0 },
          { reasonText: 'TYPE A(시공 하자) 근거 불충분', sortOrder: 1 },
          { reasonText: 'TYPE B(점유자 과실) 증거 없음 → 정당 보상 대상', sortOrder: 2 },
        ],
      },
      // Events (timeline)
      events: {
        create: [
          { title: '청구 접수', eventAt: new Date('2026-03-14T09:23:00+09:00'), status: 'done', sortOrder: 0 },
          { title: 'AI 분류 완료 (TYPE C)', eventAt: new Date('2026-03-14T09:24:00+09:00'), status: 'done', sortOrder: 1 },
          { title: '적산 산출 완료 (607,850원)', eventAt: new Date('2026-03-14T09:31:00+09:00'), status: 'done', sortOrder: 2 },
          { title: '법률 의견서 첨부', eventAt: new Date('2026-03-14T09:45:00+09:00'), status: 'done', sortOrder: 3 },
          { title: '손해사정사 최종 승인 대기', status: 'now', stepNumber: 5, sortOrder: 4 },
        ],
      },
      // Documents
      documents: {
        create: [
          {
            docType: 'adjustment_opinion',
            title: '손해사정 의견서',
            content: '보험업법 제185조 기반 손해사정 의견서',
            status: 'wait',
            reviewedBy: 'APT Insurance 법무팀',
            reviewedAt: new Date('2026-03-14T09:45:00+09:00'),
          },
        ],
      },
    },
  });

  // CLM-0246: 마포래미안 — Type A, transfer
  await prisma.claim.create({
    data: {
      id: 'CLM-0246',
      complexId: mapo.id,
      policyId: mapoPolicy.id,
      assigneeId: adjuster.id,
      description: '외벽 수직 관통균열',
      type: 'A',
      status: 'transfer',
      aiConfidence: 0.912,
      claimedAt: new Date('2026-03-13T14:05:00+09:00'),
      typeADetail: {
        create: {
          defectType: '주요 구조부 균열 (10년 담보)',
          warrantyRemaining: '5년 1개월 — 소송 적격',
          totalClaimEst: 3800000000,
          unitClaimEst: 38000000,
          isExemption: true,
        },
      },
      photos: {
        create: [
          {
            label: '전경 — 소송 증거 등록',
            fileUrl: '/uploads/CLM-0246/overview.jpg',
            sortOrder: 0,
            annotations: [
              { text: '균열 측정 0.8mm', position: 'bottom-left', color: 'var(--color-amber)' },
              { text: '증거 등록 완료', position: 'top-right', color: 'var(--color-green)' },
            ],
          },
          { label: '근접 1', fileUrl: '/uploads/CLM-0246/close1.jpg', sortOrder: 1 },
          { label: '근접 2', fileUrl: '/uploads/CLM-0246/close2.jpg', sortOrder: 2 },
        ],
      },
      aiReasons: {
        create: [
          { reasonText: '수직 관통균열 폭 0.8mm — 건설기준 허용치(0.3mm) 2.7배 초과', sortOrder: 0 },
          { reasonText: '균열 방향·패턴이 전단 변형 구조적 하자와 일치 — 외부 충격 아님', sortOrder: 1 },
          { reasonText: '건축 4.9년차, 하자담보 기간(10년) 이내 → 시공사 귀책', sortOrder: 2 },
        ],
      },
      precedents: {
        create: [
          { caseNumber: '대법원 2019다287231', description: '외벽 균열 시공사 귀책 인정 — 손해배상 확정', sortOrder: 0 },
          { caseNumber: '서울고법 2021나38421', description: '동일 균열 패턴 공동주택 하자담보책임 인용', sortOrder: 1 },
        ],
      },
      events: {
        create: [
          { title: 'AI 하자 분류 완료 (시공상 하자 확인)', eventAt: new Date('2026-03-13T14:05:00+09:00'), status: 'done', sortOrder: 0 },
          { title: '증거자료 패키지 자동 생성 → APT Insurance 소송팀 전달', eventAt: new Date('2026-03-13T14:07:00+09:00'), status: 'done', sortOrder: 1 },
          { title: '소송 제기 준비 중', status: 'now', stepNumber: 3, sortOrder: 2 },
          { title: '변론 진행 예정', status: 'wait', stepNumber: 4, sortOrder: 3 },
        ],
      },
      documents: {
        create: [
          { docType: 'litigation_brief', title: '소송 이관 근거서', status: 'transfer', reviewedBy: 'APT Insurance 법무팀' },
        ],
      },
    },
  });

  // CLM-0245: 잠실파크리오 — Type B, sent
  await prisma.claim.create({
    data: {
      id: 'CLM-0245',
      complexId: jamsil.id,
      policyId: jamsilPolicy.id,
      claimantName: '홍○○',
      description: '세탁기 배수 연결 불량',
      type: 'B',
      status: 'sent',
      aiConfidence: 0.958,
      claimedAt: new Date('2026-03-13T11:30:00+09:00'),
      typeBDetail: {
        create: {
          applicableClause: '보험약관 제4조 제2항 제3호 — 피보험자/점유자의 고의·과실',
          objectionDeadline: new Date('2026-04-12'),
          currentStep: 0,
          flowSteps: [
            { label: '면책 통보 완료', description: '2026-03-13 법률 의견서와 함께 면책 사유 발송 완료. 이의신청 기한: 30일' },
            { label: '이의신청 수신', description: '이의신청이 수신되었습니다. APT Insurance 법무팀 검토 중입니다.' },
            { label: '재검토 중', description: 'APT Insurance 법무팀이 이의신청을 재검토하고 있습니다. 추가 서류가 요청될 수 있습니다.' },
            { label: '최종 종결', description: '최종 종결 처리되었습니다. 청구인에게 최종 결정 통보가 발송되었습니다.' },
          ],
        },
      },
      aiReasons: {
        create: [
          { reasonText: '세탁기 배수 호스 연결부 이탈 흔적 확인', sortOrder: 0 },
          { reasonText: '외부 충격 없이 점유자 부주의로 인한 배수 불량 패턴', sortOrder: 1 },
          { reasonText: "민법 758조 공작물 책임 — '설치·관리 하자' 미충족", sortOrder: 2 },
        ],
      },
      precedents: {
        create: [
          { caseNumber: '서울중앙지법 2022가단52890', description: '세입자 과실로 인한 면책 판결', sortOrder: 0 },
        ],
      },
      documents: {
        create: [
          {
            docType: 'exemption_notice',
            title: '면책 통보서 — 잠실파크리오 세탁기 배수',
            content: '본 건은 보험약관 제4조 제2항 제3호에 따라 면책 대상으로 판단됩니다.',
            status: 'done',
            reviewedBy: 'APT Insurance 법무팀',
            reviewedAt: new Date('2026-03-13T15:22:00+09:00'),
          },
          { docType: 'civil_response', title: '민원 대응 요약서', status: 'done' },
          { docType: 'civil_response', title: '약관 조항 해석서', status: 'done' },
          { docType: 'civil_response', title: '유사 판례 패키지', status: 'done' },
        ],
      },
    },
  });

  // CLM-0243: 송도더샵 — Type A, transfer
  await prisma.claim.create({
    data: {
      id: 'CLM-0243',
      complexId: songdo.id,
      description: '시공 하자 — 바닥 침하',
      type: 'A',
      status: 'transfer',
      aiConfidence: 0.887,
      claimedAt: new Date('2026-03-12'),
      typeADetail: {
        create: {
          defectType: '바닥 침하',
          isExemption: true,
        },
      },
    },
  });

  // CLM-0242: 분당파크뷰 — Type B, done
  await prisma.claim.create({
    data: {
      id: 'CLM-0242',
      complexId: bundang.id,
      description: '바닥재 파손',
      type: 'B',
      status: 'done',
      aiConfidence: 0.931,
      claimedAt: new Date('2026-03-11'),
      documents: {
        create: [
          { docType: 'exemption_notice', title: '면책 통보서 — 분당파크뷰 바닥재 파손', status: 'done' },
        ],
      },
    },
  });

  // CLM-0241: 래미안 원베일리 — Type C, paid
  await prisma.claim.create({
    data: {
      id: 'CLM-0241',
      complexId: raemian.id,
      description: '욕실 배관 누수',
      type: 'C',
      status: 'paid',
      amount: 0,
      aiConfidence: 0.991,
      claimedAt: new Date('2026-03-10'),
    },
  });

  console.log('✅ Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
