import { sendEmail } from "./sendEmail";
import env from "../env";

export const sendTeamInviteEmail = async (team: any, invitation: any) => {
  const invitationLink = `${env.appUrl}/invitations/${invitation.token}`;

  await sendEmail({
    to: invitation.email,
    subject: "Team Invitation",
    html: `You have been invited to join the team, ${team.name}.
    <br/><br/> Click the below link to accept the invitation and join the team. 
    <br/><br/> <a href="${invitationLink}">${invitationLink}</a>`,
  });
};
