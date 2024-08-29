const EmailTemplate = (EmailId,OrgName,UserId,InvitationCode) => {
    return `
		<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Invitation to join the organization!</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }

        .btn-primary {
            color: #fff !important;
            background: rgb(108, 95, 252) !important;
            border-color: rgb(108, 95, 252) !important;
            padding: 10px 20px;
            outline: 0;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }

        .highlight {
            font-weight: bold;
        }
    </style>

</head>

<body>
    <div class="container">
        <img src="http://16.171.161.211:8080/health/apis/logo" class="logo"></img>
        <div class="message">Invitation to join the organization!</div>
        <div class="body">
            <p>Dear User,</p>
            <p> You have been invited by the admin of the <b>${OrgName}</b> to join their organization. Click below to
                accept the invitation.</p>
          <a href="${process.env.UI_URL}verifyinvitation?InvitationCode=${InvitationCode}&EmailId=${EmailId}&UserId=${UserId}" class="btn-primary">
  View Invitation
</a>
            <p>This invitation will expire in 30 days.
            </p>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:${process.env.EMAIL_ID}">${process.env.EMAIL_ID}</a>. We are here to help!</div>
    </div>
</body>

</html>
	`;
};

module.exports = EmailTemplate;