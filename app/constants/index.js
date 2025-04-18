const privateKey = [];

const publicKey = [
    4, 215,  34, 141,  61, 219, 104,  34,  71, 141,  85,
  228,  22,  52, 223,   0, 150, 149, 166,  49, 122, 255,
   51, 214,  67, 155, 118,  32,  88,  53, 201,  11,  33,
  115, 105, 230, 103, 106,  67, 117,  21, 221, 248,  39,
   95,  71, 230, 164, 241,  90, 222,  49, 136, 249,  98,
  125, 108,  98, 239, 193,  69,   7, 119, 159, 159
];

const symm = {
    '0': '3',
    '1': 'p',
    '2': 'P',
    '3': 'o',
    '4': 'O',
    '5': '6',
    '6': '1',
    '7': '[',
    '8': ']',
    '9': '0',
    '[': '2',
    ']': '5',
    ',': '4',
    ' ': '8'
};

const symmRev = {
    '0': '9',
    '1': '6',
    '2': '[',
    '3': '0',
    '4': ',',
    '5': ']',
    '6': '5',
    '8': ' ',
    p: '1',
    P: '2',
    o: '3',
    O: '4',
    '[': '7',
    ']': '8'
};

const emailPat =  /[a-zA-Z0-9\$%\-#&\.]+@(?:[a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(?:[a-zA-Z0-9\-]+\.)?[a-zA-Z0-9\-]+/;

const testHTML = `

<!DOCTYPE html>
<html>
<head> 
	<meta http-equiv="Content-Type" content="text/html charset=UTF-8"/> 
	<link href="https://fonts.googleapis.com/css?family=Roboto:light,regular" rel="stylesheet"> 
	<style>
		.ExternalClass{width: 100%}
        .rc-2fa-email-content{width: 100%; background-color: #ffffff; font-family: Helvetica, Arial, sans-serif; font-size: 24px; letter-spacing: 0.48px; line-height:36px; color: #f0f0f0}
        .rc-2fa-header{height: 25px}
        .rc-2fa-main{height: 0}
        .rc-2fa-main-container{background-color: white; margin: 0; overflow: auto}
        .rc-2fa-main-content{margin: 0}
        .rc-2fa-main-content h1{font-family:  Helvetica, Arial, sans-serif; font-size: 38px; letter-spacing: -0.94px; line-height: 42px; color: #ffffff;}
        .rc-2fa-pre-code-instruction-line{margin: 0}
        .rc-2fa-post-code-instruction-line{font-size: 24px}
        .rc-2fa-code{font-size: 24px; margin: 0}
        .rc-2fa-footer{height: 25px}body{margin: 0; padding: 0}
        h1{margin: 0; font-family:  Helvetica, Arial, sans-serif; font-size: 38px; letter-spacing: -0.94px; line-height: 42px; color: #ffffff;}
        .rc-2fa-header.rc-2fa-header-override{background: #fff;}
        .rc-2fa-email-content.rc-2fa-email-content-override{max-width: 600px; background-color: #000; font-family: Helvetica, Arial, sans-serif; color: #fff; border: 0; border-top: none; border-spacing: 0; margin: auto}
        .rc-2fa-main-container.rc-2fa-main-container-override{margin: 0}
        .rc-2fa-code.rc-2fa-code-override{font-family:  Helvetica, Arial, sans-serif; font-size: 58px; letter-spacing: 0px; line-height: 64px; color: #ffffff;font-weight:bold; margin: 0;}
        .rc-2fa-footer.rc-2fa-footer-override{height: 0}
	</style>


</head>
<body id="body" style="padding:0; margin:0; word-wrap: normal; word-spacing:normal;" bgcolor="#ffffff">

<!-- Preview Copy -->
<div style="display:none;">740947</div>
    
	<table style="width:100%; background-color: #ffffff; font-family: Helvetica, Arial, sans-serif; color: #000; border: 0; border-top: none; border-spacing: 0; margin: auto" width="100%" role="presentation"> 
		<tr class="rc-2fa-header rc-2fa-header-override"> 
        <td align="center" valign="top" width="100%">
            <center>
            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                    <td style="font-size: 1px; line-height: 1px" height="24"></td>
                </tr>
            </table>

            <!-- Container -->
            <table cellspacing="0" cellpadding="0" border="0" role="presentation" style="background-color:#000000; width: 600px; min-width: 600px;" width="600" bgcolor="#000000" align="center" >
                <tr>
                    <td style="width:72px; font-size: 1px; line-height: 1px" width="72"></td>
                    <td style="width:456px; text-align:left;" width="456" align="left">

                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td style="font-size: 1px; line-height: 1px" height="72"></td>
                            </tr>
                        </table>
                        
                        <!-- Rockstar ID -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td>
                                    <a href="https://www.rockstargames.com/" style="text-decoration: none;" target="_blank" alias="mainImage"><img src="http://media.rockstargames.com/service/common/rockstargames.png" height="72" width="78" style="display: block; color: #f0f0f0; font-size:24px; font-family:  Helvetica, Arial, sans-serif;" alt="Rockstar Games" /></a>
                                </td>
                            </tr>           
                        </table>
                        
                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td style="font-size: 1px; line-height: 1px" height="96"></td>
                            </tr>
                        </table>
                        
                        <!-- Start Body Content -->
                        <h1 style="color:#ffffff; font-weight:bold; font-size:38px; line-height: 42px; letter-spacing: -0.94px;">Email Verification Code</h1>

                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 1px; line-height: 1px" height="48"></td></tr></table>
                        <span style="color: #f0f0f0; font-size:24px; font-family: Helvetica, Arial, sans-serif; line-height: 36px; letter-spacing:0.48px;">
                        Enter this code on the identity verification screen:</span>
                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 1px; line-height: 1px" height="48"></td></tr></table>
                        <span class="rc-2fa-code rc-2fa-code-override" style="font-family: Helvetica, Arial, sans-serif; font-size: 58px; letter-spacing: 0px; line-height: 64px; color: #ffffff;font-weight:bold; margin: 0;">740947</span>
                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 1px; line-height: 1px" height="48"></td></tr></table>
                        <span style="color: #f0f0f0; font-size:24px; font-family: Helvetica, Arial, sans-serif; line-height: 36px; letter-spacing:0.48px;">
                        This code will expire shortly. If you can’t find the identity verification screen, try logging in again.
                        <br /><br />
                        If you didn’t try to log in to your Rockstar Games account, we recommend that you reset your password now.
                        </span>

                        <!-- Spacer -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td style="font-size: 1px; line-height: 1px" height="72"></td>
                            </tr>
                        </table>
                        
                        <!-- End Body Content -->
                        
            <!-- START FOOTER -->
            <table cellspacing="0" cellpadding="0" border="0" role="presentation">
                <tr>
                    <td>

                        <!-- HR -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#a6a6a6" style="background-color:#a6a6a6; width:100%">
                            <tr>
                                <td style="font-size: 1px; line-height: 2px; background-color:#a6a6a6;" height="2" bgcolor="#a6a6a6"></td>
                            </tr>
                        </table>
                        <!-- END HR -->

                        <!-- SPACER -->
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td style="font-size: 1px; line-height: 1px" height="72"></td>
                            </tr>
                        </table>
                        <!-- END SPACER -->

                        <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tr>
                                <td style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: 0.3px; mso-line-height-rule:exactly; line-height:22px; color: #a6a6a6; color: #a6a6a6;">

                                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: 0.3px; mso-line-height-rule:exactly; line-height:22px; color: #a6a6a6; color: #a6a6a6;">
                                        This administrative email is being sent to you from Rockstar Games, 622 Broadway, NY, NY 10012. If you want the early word on all Rockstar game announcements, official launches, contest, special events, and more subscribe to the  <a href="https://socialclub.rockstargames.com/settings/email?lang=en-US" alias="footerPreferences"><span style="color: #a6a6a6; text-decoration: underline;">Rockstar Games Mailing List</span></a>.
                                        <br />
                                        <br />
                                        &copy; 2024 Rockstar Games. All Rights Reserved.
                                        <br />
                                        <br />
                                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; border-spacing: 0; " role="presentation">
                                            <tr>
                                                <td style="padding: 0;mso-line-height-rule: exactly; line-height: 24px; font-size: 16px;">
                                                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: 0.3px; mso-line-height-rule:exactly; line-height:22px; color: #a6a6a6; color: #a6a6a6;"><a href="https://www.rockstargames.com/legal" alias="footerTerms"><span style="color: #a6a6a6; text-decoration: underline;">Terms of Service</span></a></span>
                                                    <br />
                                                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: 0.3px; mso-line-height-rule:exactly; line-height:22px; color: #a6a6a6; color: #a6a6a6;"><a href="https://www.rockstargames.com/privacy" alias="footerPrivacy"><span style="color: #a6a6a6; text-decoration: underline;">Privacy Policy</span></a></span>
                                                    <br />
                                                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; letter-spacing: 0.3px; mso-line-height-rule:exactly; line-height:22px; color: #a6a6a6; color: #a6a6a6;"><a href="https://support.rockstargames.com/" alias="footerSupport"><span style="color: #a6a6a6; text-decoration: underline;">Support</span></a></span>
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- SPACER -->
                                        <table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 1px; line-height: 1px" height="60"></td></tr></table>
                                        <!-- END SPACER -->
            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                    <td><a href="https://www.rockstargames.com/" target="_blank"><img src="https://media.rockstargames.com/service/common/rockstarbug.png" width="24" height="24" border="0"></a></td>
                </tr>
            </table>
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 1px; line-height: 1px" height="72"></td></tr></table> 
                    </td>
                </tr>
            </table>


            
            <!-- End Content -->
                    </td>
                    <td style="width:72px; font-size: 1px; line-height: 1px" width="72"></td>
                </tr>
            </table>
            
            <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                <tr>
                    <td style="font-size: 1px; line-height: 1px" height="24"></td>
                </tr>
            </table>
                </center>
            </td>
    </tr>
</table>
</body>`

export {publicKey, symm, symmRev, emailPat, testHTML};