# 초기세팅


우선, VSCode의 확장프로그램(extension)인 eslint, prettier, stylelint를 설치합니다.
그 후 다음의 두 가지 명령을 입력합니다. 


1. git clone https://github.com/Ogoo-ChatDiaryAI/Ogoo-WEB-CLIENT.git
2. (프로젝트 디렉토리로 이동 후) yarn install


이후, VSCode상 오른쪽 아래에 있는 톱니바퀴(관리) 클릭 -> 설정 으로 들어간 후,

"setting.json" 을 검색합니다.
![image](https://github.com/user-attachments/assets/fb22635b-68ed-486d-849f-80cc076e2d99)

그럼 위의 사진과 같은 창이 뜰텐데, 빨간색 네모박스를 클릭합니다. 
그 후, 기존에 있던 내용은 전부 지우고(특히 schemas 어쩌구 되어있는건 필수로 지워야함) 아래의 내용을 복사해서 붙여넣으면 끝!
```json
{
  "stylelint.enable": true, 
  "css.validate": false, 
  "scss.validate": false, 
  "stylelint.configFile": ".stylelintrc.json", 
  "stylelint.packageManager": "yarn",
  "stylelint.validate": ["css","scss","postcss", "typescript", "typescriptreact"], 

  "editor.fontFamily": "D2Coding",
  "editor.tabSize": 2,
  "prettier.requireConfig": true, 

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "editor.formatOnSave": true, 
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
}
```


정상적으로 설정됐다면, App.jsx 파일과 App.css 파일에서 다음과 같은 모습이 보입니다.
![image](https://github.com/user-attachments/assets/d939d406-382b-4bfe-ab12-fd27619ffbb7)
![image](https://github.com/user-attachments/assets/06617060-5695-4104-995d-487172728d4f)


특히, App.css 파일에서 Ctrl + S (저장 커맨드)를 클릭시 

![image](https://github.com/user-attachments/assets/1c03d311-0aa6-47dd-9e1c-75917961c71e)
이렇게 자동으로 css 속성들의 위치가 변환되는 모습을 볼 수 있어야 합니다.


사진과 동일하게 작동되고, 저장 시 css 정렬도 적용된다면 초기세팅 진짜 끝! 
