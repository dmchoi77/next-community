import axios from 'axios';
import { connectToDatabase } from '../../lib/mongodb';
const jwt = require('jsonwebtoken');

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    body: {
      token_type,
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in,
      profile_nickname,
      profile_image,
    },
  } = req;
  // AccessToken 검증
  await axios
    .get('https://kapi.kakao.com/v1/user/access_token_info', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(async (res) => {
      const user = await db
        .collection('users')
        .find({ id: res.data.id })
        .toArray();
      const userInfo = {
        nickname: profile_nickname,
        id: res.data.id,
        role: 1,
        token: '',
        profileImage: profile_image,
      };
      // db에 회원 정보 없으면 새로 생성
      if (!user.length) {
        console.log('여기로왔음');
        db.collection('users').insert(userInfo);
      }
      // 사용자 정보 이미 있으면 바로 토큰 발급
      let token = jwt.sign(userInfo, process.env.NEXT_PUBLIC_SECRET_KEY, {
        expiresIn: '10m',
      });
      // db의 해당 사용자에게 토큰 저장
      db.collection('users').updateOne(
        { id: res.data.id },
        { $set: { token: token } }
      );
    });
};

// externalResolver
export const config = {
  api: {
    externalResolver: true,
  },
};
