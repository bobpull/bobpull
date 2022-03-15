# 포트폴리오 공유 서비스 프론트엔드 코드

## 실행 방법

## 1. react-srcipts start 실행

> yarn은 사실 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략)

> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. 즉, 라이브러리 설치 커맨드입니다.

> yarn 입력 시 자동으로, package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

```bash
npm install --global yarn
yarn
yarn start
```

## 파일 구조 설명

1. src폴더는 아래와 같이 구성됩니다.

- components 폴더:

  - Header.js: 네비게이션 바
  - Porfolio.js: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트
    - **현재는 User MVP만 포함**되어 있습니다.
  - award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들 -> **현재 없습니다.**
  - certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들 -> **현재 없습니다.**
  - education 폴더: 포트폴리오 중 학력 관련 컴포넌트들 -> **현재 없습니다.**
  - project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들 -> **현재 없습니다.**
  - user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들

- api.js:
  - axios를 사용하는 코드가 있습니다.
  - delete 함수는 코드는 작성되어 있지만, 쓰이지고 있지는 않습니다. -> **사용하는 기능을 추가해 보세요!**
- App.js:
  - SPA 라우팅 코드가 있습니다.
- reducer.js:
  - 로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.

2. 전체적인 로직은 아래와 같습니다. 예를 들어 Award MVP 기준입니다 (**물론 현재는 코드는 없습니다. 여러분들이 개발해야 하기 때문입니다. 우선 로직만 참고해 주세요. 나머지 MVP도 비슷합니다**)

- 포트폴리오 컴포넌트는 Awards 컴포넌트를 사용함.
- Awards는 수상이력 **목록**으로, 여러 개의 Award 컴포넌트+ (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.
- 각 Award 컴포넌트는 **isEditing 상태에 따라**, false면 AwardCard, true면 AwardEditForm이 됩니다.
- **isEditable**(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
- Awards는 **isAdding**이 true면 AwardAddForm, false면 그냥 Award들의 모음이 됩니다.
