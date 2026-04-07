# insuretech-admin PRD
## 아파트 보험 하자접수 AI 어드민 웹

> 기준 문서: https://aiconsilium-dev.github.io/insuretech-erd/
> 작성일: 2026-04-07

---

## 1. 서비스 개요

3개 앱 통합 시스템(입주민 앱 · 관리사무소 앱 · **어드민 웹**)의 어드민 클라이언트.
보험사/손해사정사 담당자가 아파트 보험 하자 접수건 전체를 관리하며 TYPE 분류 → 현장조사 배정 → AI 적산 확인·보정 → 보험금 승인·결재 → 면책 의견서 발송 → 이의신청 검토 → 구상권 관리까지 전 워크플로를 처리한다.

---

## 2. 사용자 역할

| Role | 설명 |
|------|------|
| `admin` | 어드민/보험사 담당자 — 모든 기능 사용 |
| `adjuster` | 손해사정사 — 적산 확인·보정, 승인 요청 |

---

## 3. 핵심 도메인 모델

### 3-1. Claims 상태 머신 (11단계)

```
submitted → classifying → field_check_pending → field_checking
→ estimating → estimated → approval_pending → approved → paid
                                                ↓
                                             denied → appealed
```

| 상태 | 한국어 표시 | 전이 주체 |
|------|------------|---------|
| submitted | 접수 | 시스템 |
| classifying | 분류대기 | 어드민 |
| field_check_pending | 현장조사대기 | 어드민 |
| field_checking | 현장조사중 | 관리사무소 |
| estimating | 산정중 | 시스템 |
| estimated | 산정완료 | 시스템 |
| approval_pending | 승인대기 | 어드민 |
| approved | 승인완료 | 어드민 |
| paid | 지급완료 | 어드민 |
| denied | 면책통보 | 어드민 |
| appealed | 이의신청 | 입주민 |

### 3-2. TYPE 분류 기준

| TYPE | 분류명 | 기준 | 처리 |
|------|--------|------|------|
| A | 시공사 하자 | 사용승인 5년 미만, 구조체·방수 결함 | 하자소송 연계 |
| B | 면책 | 면책사항 해당, 입주민 과실, 자연재해 | 면책 의견서 발송 |
| C | 보험금 산출 | 보험 보상 대상 | AI 적산 → 보험금 결재 → 지급 |

---

## 4. 페이지 목록 및 구현 현황

### ✅ 구현 완료

| 페이지 | 경로 | 주요 기능 |
|--------|------|---------|
| 대시보드 | `/` | KPI 카드, 최근 접수 테이블, 알림 |
| 전체 접수 목록 | `/claims` | 목록·필터·상세 패널 |
| TYPE A 관리 | `/type-a` | 시공사 하자 접수 목록·상세 |
| TYPE B 관리 | `/type-b` | 면책 접수 목록·면책 사유 분포 |
| TYPE C 관리 | `/type-c` | 보험금 산출 접수 목록·적산 요약 |
| 현장조사 | `/field` | 배정대기·진행중·완료 탭 |
| AI 적산 | `/estimation` | 공종별 항목 상세 |
| 승인·결재 | `/approve` | 대기·이력 탭 |
| 의견서 | `/opinion` | 면책의견서·이의신청검토 탭 |

### ❌ 미구현 페이지

| 페이지 | 경로 | 우선순위 |
|--------|------|---------|
| 이의신청 관리 | `/appeals` | 높음 |
| 구상권 관리 | `/indemnity` | 중간 |

### ⚠️ 기존 페이지 미비 기능

| 페이지 | 미비 기능 | API |
|--------|---------|-----|
| 전체 접수 목록 | TYPE A/B/C 분류 액션 버튼 | `PATCH /claims/:id/classify` |
| 현장조사 | 현장조사 배정 액션, 검토 완료 처리 | `POST /claims/:id/field-check`, `PATCH /field-checks/:id/review` |
| AI 적산 | 항목별 보정(수량·단가 수정), 적산 버전 관리 | `PATCH /estimations/:id` |
| 승인·결재 | 승인/반려/보완요청 액션 (버튼만 있고 API 미연결) | `PATCH /approvals/:id` |
| 의견서 | 의견서 신규 작성, 발송 처리 | `POST /claims/:id/opinions`, `PATCH /opinions/:id/send` |

---

## 5. API 연동 현황 (42개 엔드포인트)

### ✅ MSW 핸들러 구현 완료

| 메서드 | 경로 |
|--------|------|
| GET | /claims |
| GET | /claims/:id |
| POST | /claims/:id/approvals |
| GET | /dashboard/kpi |
| GET | /dashboard/stats |
| GET | /approvals |
| GET | /opinions |
| GET | /estimations |
| POST | /auth/login |
| POST | /auth/logout |

### ❌ MSW 핸들러 미구현

| 메서드 | 경로 | 연결 페이지 |
|--------|------|-----------|
| PATCH | /claims/:id/classify | 전체접수 → TYPE 분류 |
| POST | /claims/:id/field-check | 현장조사 → 배정 |
| PATCH | /field-checks/:id/review | 현장조사 → 검토완료 |
| PATCH | /estimations/:id | AI 적산 → 보정 |
| PATCH | /approvals/:id | 승인·결재 → 승인/반려 |
| POST | /claims/:id/opinions | 의견서 → 신규작성 |
| PATCH | /opinions/:id/send | 의견서 → 발송 |
| GET | /appeals | 이의신청 목록 |
| PATCH | /appeals/:id | 이의신청 검토 |
| GET | /indemnity-claims | 구상권 목록 |
| POST | /indemnity-claims | 구상권 등록 |
| PATCH | /indemnity-claims/:id | 구상권 상태변경 |
| GET | /notifications | 알림 목록 |
| PATCH | /notifications/:id/read | 읽음 처리 |
| GET | /dashboard/recent-claims | 최근 접수 (대시보드) |
| GET | /dashboard/notifications | 최근 알림 (대시보드) |

---

## 6. 데이터 모델 (ERD 기준)

### 핵심 테이블
- `claims` — 접수건 허브 (16개 테이블 중 핵심)
- `field_checks` — 현장조사 배정·수행·검토
- `estimations` + `estimation_items` — AI 적산 버전 관리
- `approvals` — 승인·결재 워크플로
- `opinions` — 면책의견서·변호사의견서
- `appeals` — 이의신청 (입주민 요청 → 어드민 검토)
- `indemnity_claims` — 구상권 (시공사 대상)
- `notifications` — 앱 내 알림

### 주요 ENUM

**claims.category:** `facility`(균열파손) | `leak`(누수침수) | `injury`(신체손해) | `fire`(화재폭발)

**claims.type_class:** `A` | `B` | `C`

**appeals.status:** `submitted` | `reviewing` | `accepted` | `rejected`

**indemnity_claims.status:** `identified` | `notified` | `negotiating` | `settled` | `litigation`

---

## 7. 개발 우선순위

### P0 — 핵심 워크플로 액션 (기존 페이지 미비 기능)
1. `ClaimsPage` — TYPE A/B/C 분류 버튼·모달
2. `FieldCheckPage` — 현장조사 배정 버튼·모달
3. `ApprovePage` — 승인/반려/보완요청 액션 API 연결
4. `OpinionPage` — 의견서 작성·발송 액션

### P1 — 신규 페이지
5. `AppealsPage` (`/appeals`) — 이의신청 목록·검토 처리
6. `IndemnityPage` (`/indemnity`) — 구상권 목록·상태 관리

### P2 — 보완
7. `EstimationPage` — 항목별 수량·단가 인라인 편집
8. Sidebar 네비게이션에 신규 메뉴 추가

---

## 8. 비기능 요구사항

- **인증**: Bearer Token, access_token 쿠키, refresh_token HTTP-Only
- **에러 처리**: `ApiError` 클래스, 토스트 피드백
- **반응형**: 데스크톱 중심 (어드민 웹), `max-w-[430px]` 모바일 제약 없음
- **MSW**: `VITE_USE_MOCK=true` 시 전체 API 인터셉트
- **라우팅**: HashRouter (GitHub Pages 배포)

---

## 9. 사이드바 네비게이션 (목표)

| 메뉴 | 경로 | 현황 |
|------|------|------|
| 대시보드 | `/` | ✅ |
| 전체 접수 | `/claims` | ✅ |
| TYPE A | `/type-a` | ✅ |
| TYPE B | `/type-b` | ✅ |
| TYPE C | `/type-c` | ✅ |
| 현장조사 | `/field` | ✅ |
| AI 적산 | `/estimation` | ✅ |
| 승인·결재 | `/approve` | ✅ |
| 의견서 | `/opinion` | ✅ |
| **이의신청** | `/appeals` | ❌ |
| **구상권** | `/indemnity` | ❌ |
