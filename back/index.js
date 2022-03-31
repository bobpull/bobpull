import 'dotenv/config'
import { app } from "./src/app";


const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {

  console.log(`프론트엔드 여러분 오늘도 화이팅!! (ง •̀_•́)ง by 백엔드 :) \n정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);

});
