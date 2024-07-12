// smtpConfig.jsx 파일

const smtpConfig = {
  smtpServer: 'email-smtp.ap-southeast-2.amazonaws.com',
  tls: true, // TLS 사용 여부 (true 또는 false)
  starttlsPort: 587, // STARTTLS를 사용할 때 포트 번호
  sslPort: 465, // SSL을 사용할 때 포트 번호
  auth: {
    user: 'AKIA3ANODXJF7UB2EJ6D', // SMTP 서버 인증을 위한 사용자 이름
    pass: 'BBSzdz7ZAXBeKsp7Qu3+eV9ZcWo9PtkZyxJFh4mXp4A+', // SMTP 서버 인증을 위한 비밀번호 또는 앱 비밀번호
  },
};

export default smtpConfig;
