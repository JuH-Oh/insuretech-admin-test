# CLAUDE.md — InsureTech Admin 개발 가이드

## 프로젝트 개요

아파트의 보험 피해 접수 현황을 확인하고 AI 기반 보험금 적산 결과를 받는 웹서비스.
피해 유형을 TYPE A / B / C로 자동 분류하고, TYPE C의 경우 보험금 예상액을 산출한다.

---

## 기술 스택

| 역할 | 기술 |
|------|------|
| UI 프레임워크 | React 19 |
| 언어 | TypeScript 5 (strict) |
| 번들러 | Vite 8 |
| 라우팅 | React Router DOM v7 (HashRouter) |
| 서버 상태 | TanStack React Query v5 |
| 클라이언트 상태 | Zustand v5 |
| HTTP 클라이언트 | fetch 래퍼 (`apiFetch`) |
| 스타일링 | Tailwind CSS v4 (@tailwindcss/vite) |
| 아이콘 | Lucide React |
| 조건부 클래스 | clsx |
| API 모킹 | MSW (Mock Service Worker) v2 |
| 패키지 매니저 | pnpm |
| 배포 | GitHub Pages (gh-pages) |

---

## 폴더 구조

### Container / Presenter 패턴

`src/pages/*/index.tsx` — **컨테이너 컴포넌트**
- React Query 훅, Zustand 스토어, API 함수 등 외부 데이터 의존성을 담당한다.
- 페이지의 1차 레이아웃(공통 래퍼, 애니메이션, 여백)을 설정한다.
- 데이터와 콜백을 props로 `components/pages/{페이지}/` 컴포넌트에 내려준다.

`src/components/pages/{페이지}/` — **프레젠테이션 컴포넌트**
- props만 받아서 UI를 렌더링한다.
- 로컬 UI 상태(폼 입력값, 토글, 모달 열림 등)는 가질 수 있다.
- 외부 훅(useQuery, useMutation, useAuthStore 등)을 직접 호출하지 않는다.

```
src/
├── App.tsx              # 라우팅 설정, auth 가드, BottomTabBar 가시성 제어
├── main.tsx             # 진입점 (QueryClient, Router, MSW 초기화)
├── index.css            # Tailwind CSS 진입점
│
├── pages/               # 컨테이너 컴포넌트 — 데이터 페칭 + 1차 레이아웃
│   └── {페이지}/
│       └── index.tsx    # 훅 호출 → 레이아웃 래퍼 → props 전달
│
├── components/          # UI 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트 (BottomTabBar, PageShell 등)
│   ├── common/          # 공유 원자 UI 컴포넌트 (2개 이상 페이지에서 재사용)
│   │   └── {컴포넌트}/
│   │       └── index.tsx
│   └── pages/           # 페이지 전용 프레젠테이션 컴포넌트
│       └── {페이지}/
│           ├── index.tsx      # 페이지 루트 프레젠테이션 컴포넌트 (props 받음)
│           ├── constants.ts   # 페이지 전체 공유 상수
│           ├── types.ts       # 페이지 전체 공유 타입
│           ├── utils.ts       # 페이지 전체 공유 유틸 함수
│           └── {기능}/
│               └── {컴포넌트}/
│                   ├── index.tsx
│                   ├── types.ts       # 이 컴포넌트 전용 타입 (필요 시)
│                   └── utils.ts       # 이 컴포넌트 전용 유틸 (필요 시)
│                   └── constants.ts   # 이 컴포넌트 전용 상수 (필요 시)
│
├── hooks/               # 전역 공유 훅 (2개 이상 페이지에서 사용)
│   └── use{기능}.ts
├── stores/              # Zustand 스토어
│   └── {도메인}Store.ts
├── lib/
│   ├── queryClient.ts
│   ├── queryKeys.ts
│   └── api/             # 도메인별 API 함수
│       ├── client.ts    # apiFetch 래퍼 + ApiError + token refresh
│       ├── types.ts     # 전역 API 요청/응답 타입 (ApiUser, ApiClaim 등)
│       └── {도메인}/
│           ├── index.ts
│           └── types.ts
└── mocks/               # MSW 목 설정
    ├── browser.ts
    ├── handlers/        # 도메인별 핸들러
    │   └── {도메인}.ts
    └── data/            # 목 데이터
        └── {도메인}.ts
```

---

## 개발 규칙

### 1. TypeScript

- `strict: true`를 유지한다.
- 전역 API 타입(ApiUser, ApiClaim 등)은 `src/lib/api/types.ts`에 정의한다. 단일 컴포넌트/파일에서만 쓰이는 타입은 해당 디렉터리의 `types.ts`에 선언한다.
- `any` 사용을 피한다. 불가피한 경우 `unknown` + 타입 가드를 사용한다.
- 경로 별칭 `@/*` → `src/*`를 항상 사용한다.
  ```typescript
  // Bad
  import { useAuthStore } from '../../../stores/authStore';
  // Good
  import { useAuthStore } from '@/stores/authStore';
  ```

### 2. API 호출

- 모든 HTTP 호출은 `src/lib/api/client.ts`의 `apiFetch` 함수를 사용한다. 직접 `fetch`를 호출하지 않는다.
- API 함수는 도메인별 디렉터리(`lib/api/{도메인}/index.ts`)에 모은다. 도메인별 타입은 같은 디렉터리의 `types.ts`에 정의한다.
- **에러 핸들링은 두 계층으로 분리한다.**
  - **API 레이어** (`src/lib/api/*.ts`): 에러를 catch하지 않고 그대로 throw한다.
  - **훅/핸들러** (`hooks/`, 컴포넌트 내 핸들러): `try/catch`로 `ApiError`를 받아 사용자에게 피드백한다.
- 파일 업로드가 필요하면 `FormData`를 body로 전달한다. `apiFetch`가 `FormData` 감지 시 `Content-Type`을 자동으로 제외한다.

### 3. 상태 관리

| 데이터 종류 | 관리 방법 |
|-----------|---------|
| API 응답 데이터 (목록, 상세) | React Query (`useQuery`) |
| 뮤테이션 (청구 생성 등) | React Query (`useMutation`) |
| 사용자 인증 정보 | Zustand (`stores/authStore.ts`) |
| 폼 입력값, 단계 상태, 모달 열림 상태 | `useState` (로컬) |

- 쿼리 키는 `src/lib/queryKeys.ts`의 팩토리 함수를 사용한다.
  ```typescript
  queryKey: queryKeys.claims({ status: 'pending' })
  ```
- `queryClient.invalidateQueries` 사용 시 구체적인 `queryKey`를 지정한다.

### 4. 피해 유형 / TYPE 분류

`src/components/common/ResultCard/constants.ts`에 정의된 상수를 사용한다. 하드코딩하지 않는다.

```typescript
// 피해 유형 → TYPE 매핑
TYPE_MAP: { injury: 'A', other: 'B', leak/fire/facility/property: 'C' }

// 피해 유형 → 한국어 레이블
DAMAGE_LABELS: Record<DamageType, string>

// TYPE C 보험금 예상액
AMOUNT_MAP: Record<DamageType, number>
```

- **TYPE A** (신체부상): 보험금 산정 없이 담당자 연결 안내
- **TYPE B** (기타): 면책 심사 필요 안내
- **TYPE C** (누수/화재/시설/가재): AI 보험금 적산 결과 표시

### 5. 컴포넌트 작성

- 함수형 컴포넌트 + `React.FC<Props>` 타입을 사용한다.
- 조건부 클래스는 `clsx`를 사용한다.
- 아이콘은 `lucide-react`에서 named import로 가져온다.

**파일 배치 기준:**

| 상황 | 위치 |
|------|------|
| 페이지 데이터 페칭·인증 컨테이너 | `pages/{페이지}/index.tsx` |
| 페이지 루트 프레젠테이션 컴포넌트 | `components/pages/{페이지}/index.tsx` |
| 특정 페이지에서만 쓰이는 하위 컴포넌트 | `components/pages/{페이지}/{기능}/{컴포넌트}/index.tsx` |
| 해당 컴포넌트에서만 쓰이는 타입 | 같은 디렉터리의 `types.ts` |
| 해당 컴포넌트에서만 쓰이는 유틸 함수 | 같은 디렉터리의 `utils.ts` |
| 페이지 전체가 공유하는 상수/타입/유틸 | `components/pages/{페이지}/constants.ts` / `types.ts` / `utils.ts` |
| 2개 이상 페이지에서 재사용되는 UI | `components/common/` |
| 2개 이상 페이지에서 재사용되는 훅 | `hooks/` |
| 전역 API 요청/응답 타입 | `lib/api/types.ts` |

**컨테이너 작성 예시 (`pages/{페이지}/index.tsx`):**

```tsx
// 1. 외부 데이터 훅 호출
// 2. 공통 레이아웃 래퍼 적용
// 3. props로 데이터·콜백 전달
export default function SomePage() {
  const user = useAuthStore(s => s.user);
  const { data, isLoading } = useSomeQuery();

  return (
    <PageShell>
      <SomeView user={user} data={data} isLoading={isLoading} />
    </PageShell>
  );
}
```

**신규 기능 추가 예시:**

```
components/pages/{페이지}/{기능}/{컴포넌트}/
├── index.tsx       # 프레젠테이션 컴포넌트 (props 받음)
├── types.ts        # 이 컴포넌트 전용 타입 (필요 시)
└── utils.ts        # 이 컴포넌트 전용 유틸 함수 (필요 시)
```

### 6. 스타일링

- 레이아웃·간격·색상은 **Tailwind CSS** 유틸리티 클래스를 사용한다.
- 설정 파일 없이 `@tailwindcss/vite` 플러그인으로 동작한다.
- 모바일 최적화: 최대 너비 `max-w-[430px]` 기준으로 디자인한다.
- 인라인 `style` 속성은 Tailwind로 표현이 어려울 때만 사용한다.

### 7. 라우팅

- **HashRouter** 사용 (GitHub Pages 배포 환경에서 새로고침 대응).
- 모든 인증 필요 라우트는 auth 가드로 보호한다 (`App.tsx` 참고).
- 탭 네비게이션은 `BottomTabBar`로 관리한다. 탭 목록: `home | claim | myclaims | more`.

### 8. 인증

- `access_token`은 쿠키에 저장한다 (MSW 환경에서는 `document.cookie`로 직접 설정).
- `refresh_token`은 HTTP-Only 쿠키로 관리하며, 모든 요청에 `credentials: 'include'`가 자동 포함된다.
- 토큰 갱신 로직은 `lib/api/client.ts`의 `tryRefresh()`에서만 처리한다.
- 세션 만료 시 `auth:logout` 커스텀 이벤트를 dispatch한다. 컴포넌트에서 이 이벤트를 리스닝해 authStore를 초기화한다.
- Zustand `authStore`의 `setUser` / `clearAuth`로만 인증 상태를 변경한다.

### 9. MSW 목 API

- `VITE_USE_MOCK=true`일 때 MSW 서비스 워커가 활성화된다.
- 핸들러는 `src/mocks/handlers/`에 도메인별로 분리한다.
- 목 데이터는 `src/mocks/data/`에 관리한다.
- 신규 엔드포인트 추가 시 핸들러와 목 데이터를 함께 작성한다.

### 10. Git 운영

- `.env.local`, 토큰, 개인 키 등 민감 정보는 절대 커밋하지 않는다.
- `.gitignore`에 경로를 추가할 때, 이미 추적 중인지 먼저 확인한다.
  ```bash
  git ls-files <path>   # 출력이 있으면 이미 추적 중
  git rm -r --cached <path>  # 추적 해제 후 커밋
  ```

### 11. 코드 품질

- 커밋 전 `pnpm lint`를 실행한다.
- `console.log`는 디버깅 완료 후 제거한다.
- 사용하지 않는 import는 제거한다.

---

## 안정성

- 성능보다 유지보수가 용이한 코드 구조를 우선한다.
- 변경사항에 보수적으로 접근한다. 신규 기능을 성능 있게 작성하는 것보다 기존 기능을 해치지 않는 것이 훨씬 중요하다.

---

## 개발 명령어

```bash
pnpm dev       # 개발 서버 시작 (host 모드)
pnpm build     # 타입 체크 후 프로덕션 빌드
pnpm lint      # ESLint 실행
pnpm preview   # 빌드 결과 미리보기
```

---

## 환경 변수

```bash
VITE_API_BASE_URL=https://api.example.com  # 백엔드 API 주소
VITE_USE_MOCK=true                          # MSW 목 API 활성화 여부
```

`.env.local` 파일을 생성해 로컬 환경 설정을 관리한다. `.env.local`은 Git에 커밋하지 않는다.

---

## 구현 전 체크리스트

상태·데이터 패칭 관련 코드를 수정할 때 먼저 다음을 확인한다.

1. **영향 범위 파악**: 수정하는 query/state를 소비하는 컴포넌트·훅을 나열한다.
2. **React Strict Mode**: `useEffect` 내 사이드 이펙트가 이중 실행되어도 안전한가? cleanup 함수를 작성한다.
3. **refetch 범위**: `invalidateQueries`가 의도한 쿼리만 무효화하는가?
4. **TYPE 분류 일관성**: 피해 유형 추가·변경 시 `components/common/ResultCard/constants.ts`의 `TYPE_MAP`, `AMOUNT_MAP`, `DAMAGE_LABELS` 세 곳을 모두 갱신한다.
5. **타입 정확성**: 라이브러리 옵션 객체의 타입이 정확히 맞는가?

---

## 주요 주의사항

- **HashRouter**: GitHub Pages 배포 특성상 BrowserRouter 대신 HashRouter를 사용한다. 절대 경로 링크(`/`) 대신 해시 경로(`/#/`)를 사용한다.
- **Tailwind CSS v4**: 설정 파일(`tailwind.config.js`) 없이 `@tailwindcss/vite` 플러그인으로 동작한다.
- **React 19**: `use` 훅 등 React 19 전용 API 사용 가능. React 18과의 차이점에 주의한다.
- **MSW 서비스 워커**: `public/mockServiceWorker.js`는 자동 생성 파일이므로 수동 편집하지 않는다.
- **ClaimPage**: 3단계 폼 + AI 분석 + 결과 표시를 오케스트레이션하는 복잡한 마법사. 진입점은 `pages/claim/index.tsx`, 컴포넌트는 `components/pages/claim/` 아래에 위치한다. 수정 시 관련 단계 디렉터리(`step1-*`, `step2-*`, `step3-*`)만 신중히 편집한다.
