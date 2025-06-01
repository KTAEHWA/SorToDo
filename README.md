# 📝 SorToDo

이 프로젝트는 이정환님의 "한 입 크기로 씹어먹는 리액트" 강의에서 다룬 TodoList 예제를 기반으로 시작하였습니다.

이후 개인 학습 목적으로 **타입스크립트 마이그레이션**, **TailwindCSS UI 리팩토링**, **소셜 로그인 및 그룹화 기능**등을 추가하며 점차 기능을 확장해 나가고 있습니다.

## 주요 기능

- JavaScript → TypeScript로 전체 마이그레이션
- CSS → TailwindCSS로 UI 리팩토링
- Todo 그룹화 기능 (사용자 정의 그룹별 분류)
- 전역 상태 관리를 통한 기능 구조화

## 개발 진행 단계

### Step 1. CSS → TailwindCSS 리팩토링

**주요 내용**

- 기존 `*.css` 파일 제거, TailwindCSS utility class 적용

**변경 전 (JS + 컴포넌트별 CSS 파일)**

```src/
├─ App.jsx
├─ main.jsx
├─ index.css
├─ App.css
├─ components/
│ ├─ Editor.jsx
│ ├─ Editor.css
│ ├─ Header.jsx
│ ├─ Header.css
│ ├─ List.jsx
│ ├─ List.css
│ ├─ TodoItem.jsx
│ ├─ TodoItem.css
├─ assets/
```

**변경 후 (JS + TailwindCSS 구조)**

```
src/
├─ App.jsx
├─ main.jsx
├─ index.css // Tailwind 지시문 포함
├─ components/
│ ├─ Editor.jsx
│ ├─ Header.jsx
│ ├─ List.jsx
│ ├─ TodoItem.jsx
├─ assets/
```

> 💡 **결과**: 코드 간결성 + 직관성 + 유지 보수성 향상

### Step 2. JavaScript → TypeScript

**주요 내용**

- 모든 컴포넌트를 `.tsx`로 변환
- `tsconfig.json` 파일 수정
- 명시적인 타입 정의

> 💡 **결과**: 타입을 명시해줌으로써 코드 안정성 확보

### Step 3. useReducer → Zustand

**주요 내용**

- `useReducer` 기반 상태 로직 제거
- `Zustand`를 사용한 전역 상태 관리 도입
- `useTodoStore.ts` 파일을 통해 상태와 액션을 모듈화
- `immer` 미들웨어로 상태 불변성 자동 처리
- 각 컴포넌트에서 `useTodoInfo`, `useTodoActions` 훅으로 상태와 함수 분리 사용

#### 어려웠던 점 & 해결 과정

1. **타입 추론 문제**

   - `Zustand + immer` 조합에서 `state`가 `any`로 추론되거나 복잡한 타입(`Draft<Exclude<...>>`)으로 인식됨
   - ✅ 타입을 분리(`Todos`, `TodoActions`, `TodoState`)하고 내부 함수에서도 명시적 타입 지정, constants/todoItem.ts의 명시적 타입 지정

2. **모듈 분리 후 경로 에러**
   - `Cannot find module` 오류 발생
   - ✅ `tsconfig.json` 수정 및 `vite-env.d.ts` 파일 생성하여 전역 타입 참조 선언

> 💡 **결과**: 처음부터 TypeScript로 시작한 프로젝트가 아니라 JavaScript로 완성된 상태에서 마이그레이션을 진행하다 보니, 예상치 못한 타입 오류가 끊임없이 발생했다.

### Step 4. 기능 확장: 그룹 관리

**주요 내용**

- Todo를 **사용자 정의 그룹**으로 묶어 관리할 수 있는 UI 및 로직 구현
- 그룹 생성 시 이름과 색상 지정 가능
- 그룹마다 할 일을 분리해 볼 수 있도록 필터링 적용
- `GroupTabs` 컴포넌트에서 현재 그룹을 선택, 삭제 가능
- 그룹별로 Todo 수, 완료 여부 등 개별 통계 제공
- 선택된 그룹에 따라 배경색 강조 및 텍스트 색상 자동 조절 (명도 기반)

> 💡 **결과**: 단일 Todo 리스트를 넘어서, 사용자가 원하는 주제별로 할 일을 분리하고 시각적으로도 구분할 수 있는 그룹 기반의 Todo 관리 시스템을 만들었다.

## 프로젝트 후 느낀점

이 프로젝트는 단순 Todo 예제에서 시작해, 프론트엔드 개발자로서의 역량을 확장하는 데 중점을 두었습니다.

워크북에서만 접했던 Zustand를 전역 상태 관리 도구로 직접 구성하고, immer와 함께 사용해 상태 불변성과 구조적 설계를 경험했습니다.

또한 기존 CSS 구조를 TailwindCSS로 전면 리팩토링하며, 웹페이지를 구조 분해하고 컴포넌트 단위로 재구성하는 과정을 통해 CSS와 스타일링에 대한 친숙도를 높여갈 수 있었습니다.

마지막으로 UI, UX 관점에서 컴포넌트 단위의 책임 분리, 동적 스타일링(HEX 밝기 기반 텍스트 색상 등)등의 디테일을 구현하고자 했습니다.

프로젝트를 진행하면서, 확실히 개발은 처음부터 새로 만드는 것보다 기존 코드를 분석하고 리팩토링하는 과정이 더 어렵고 복잡하다는 점을 실감했습니다. 하지만 그 과정을 거치며 코드의 흐름과 구조를 이해하기 위해 고심하다보니 React와 Typescript, tailwindCSS에 대한 이해도가 한층 높아진 것을 느낍니다.

차후에 기능을 추가한다면

1. 소셜 로그인 구현
2. DB 연동

을 위주로 작업할 계획입니다.
