const EmailTemplate = (email, domainUrl, userId) => {
    return `
    <html>
    <body>
      <div style="width: 500px; text-align: center; padding: 20px;">
        <h1>Welcome to Protoflow!</h1>
        <h3>We are happy to welcome you onboard</h3>
        <p>You have received an invitation from ${email}</p>
        <a
          style="
            background-color: #4285f4;
            border: 0.5px;
            outline: none;
            padding: 7px 20px;
            color: white;
            border-radius: 12px;
            cursor: pointer;
            text-decoration: none;
          "
          href="${domainUrl}/invited/${userId}"
        >
          Accept Invitation
        </a>
      </div>
    </body>
  </html>
    `;
}

export default EmailTemplate;