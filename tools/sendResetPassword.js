const sendEmail = require("./emailSender");

const sendResetPasswordEmail = async (url, email) => {
  try {
    const emailOptions = {
      from: `"FactuGen " <${process.env.SENDER_EMAIL}> `,
      to: email,
      subject: "Definir un nouveau mot de passe",
      html: `
    <div style= "max-width:600px; margin: 0 auto;">
      <h1 style="text-align: center;
    color: #5f6368;
        padding-bottom: 20px;
   ">Réinitialiser le nouveau mot de passe</h1>


    <p style="
        margin: 0;
        font-size: 16px;
        ">
        Il ne reste que quelques étapes supplémentaires pour que vous puissiez définir votre nouveau mot de passe. Appuyez simplement sur le bouton ci-dessous et vous serez redirigé vers un formulaire pour saisir votre nouveau mot de passe.

        </p>
     <div  style="width: fit-content;
margin: 40px auto;
    " ><a href="${url}" target="_blank" style=" font-size: 16px;
    font-family: Helvetica,Arial,sans-serif;
    color: #222;
    cursor:pointer;
    text-decoration: none;
    padding: 10px 20px;
  border: 2px solid #202124;
    background: #fcba1c;
    font-weight: 600;
    display: inline-block;">Changer le mot de passeChanger</a></div>

      <p style="  margin-bottom:0;   font-size: 16px;">Si cela ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur: </p>

      <p style="text-align:center; margin:10px 0;  font-size: 16px;"><a href="#" target="_blank" style="color: #FFA73B;">${url}</a></p>

  <div>

`,
    };

    await sendEmail(emailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendResetPasswordEmail;