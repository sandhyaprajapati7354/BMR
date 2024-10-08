const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "quality@vidyagxp.com",
    pass: "iwhh mwod abrj ilbs",
  },
});

const createEmailTemplate = (type, data) => {
  switch (type) {
    case "assignReviewer":
      return {
        subject: "You have been assigned as a reviewer",
        html: `
            <html>
              <body>
                <p>Dear ${data.reviewerName},</p>
                <p>You have been assigned as the reviewer for the following BMR form:</p>
                <table>
                  <tr>
                    <td><strong>BMR:</strong></td>
                    <td>${data.bmrName}</td>
                  </tr>
                  <tr>
                    <td><strong>Initiator:</strong></td>
                    <td>${data.initiator}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Initiation:</strong></td>
                    <td>${data.dateOfInitiation}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>${data.status}</td>
                  </tr>
                </table>
                <p>Please review the BMR form, when it's in review stage.</p>
                <p>Best regards,<br>Your Team</p>
              </body>
            </html>
          `,
      };

    case "assignApprover":
      return {
        subject: "You have been assigned as an approver",
        html: `
            <html>
              <body>
                <p>Dear ${data.approverName},</p>
                <p>You have been assigned as the approver for the following BMR form:</p>
                <table>
                  <tr>
                    <td><strong>BMR:</strong></td>
                    <td>${data.bmrName}</td>
                  </tr>
                  <tr>
                    <td><strong>Initiator:</strong></td>
                    <td>${data.initiator}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Initiation:</strong></td>
                    <td>${data.dateOfInitiation}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>${data.status}</td>
                  </tr>
                </table>
                <p>Please approve the BMR form, when it's in approval stage.</p>
                <p>Best regards,<br>Your Team</p>
              </body>
            </html>
          `,
      };

    case "reminderReviewer":
      return {
        subject: "Reminder: BMR form under review",
        html: `
            <html>
              <body>
                <p>Dear ${data.reviewerName},</p>
                <p>This is a reminder that the following BMR form is under review:</p>
                <table>
                  <tr>
                    <td><strong>BMR:</strong></td>
                    <td>${data.bmrName}</td>
                  </tr>
                  <tr>
                    <td><strong>Initiator:</strong></td>
                    <td>${data.initiator}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Initiation:</strong></td>
                    <td>${data.dateOfInitiation}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>${data.status}</td>
                  </tr>
                </table>
                <p>Please review the BMR form at your earliest convenience.</p>
                <p>Best regards,<br>Your Team</p>
              </body>
            </html>
          `,
      };

    case "reminderApprover":
      return {
        subject: "Reminder: BMR form under approval",
        html: `
            <html>
              <body>
                <p>Dear ${data.approverName},</p>
                <p>This is a reminder that the following BMR form is under approval:</p>
                <table>
                  <tr>
                    <td><strong>BMR:</strong></td>
                    <td>${data.bmrName}</td>
                  </tr>
                  <tr>
                    <td><strong>Initiator:</strong></td>
                    <td>${data.initiator}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Initiation:</strong></td>
                    <td>${data.dateOfInitiation}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>${data.status}</td>
                  </tr>
                </table>
                <p>Please approve the BMR form at your earliest convenience.</p>
                <p>Best regards,<br>Your Team</p>
              </body>
            </html>
          `,
      };

    case "reminderInitiator":
      return {
        subject: "Reminder: BMR form back to initiation",
        html: `
                <html>
                  <body>
                    <p>Dear ${data.initiatorName},</p>
                    <p>This is a reminder that the following BMR form is under initiation:</p>
                    <table>
                      <tr>
                        <td><strong>BMR:</strong></td>
                        <td>${data.bmrName}</td>
                      </tr>
                      <tr>
                        <td><strong>Initiator:</strong></td>
                        <td>${data.initiator}</td>
                      </tr>
                      <tr>
                        <td><strong>Date of Initiation:</strong></td>
                        <td>${data.dateOfInitiation}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>${data.status}</td>
                      </tr>
                    </table>
                    <p>Please check the BMR form details carefully again.</p>
                    <p>Best regards,<br>Your Team</p>
                  </body>
                </html>
              `,
      };

    default:
      return {
        subject: "",
        html: "",
      };
  }
};

exports.sendEmail = (type, data) => {
  const { subject, html } = createEmailTemplate(type, data);

  const mailOptions = {
    from: "quality@vidyagxp.com",
    to: data.recipients, // Multiple recipients can be separated by commas
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending mail", error);
    }
    console.log("Email sent: %s", info.messageId);
  });
};
