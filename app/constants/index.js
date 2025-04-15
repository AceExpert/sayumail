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
<!--[if !mso]><!-->
<div style="display: none; max-height: 0px; overflow: hidden;">Important Login Details for your VPS Hosting Plan&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
<!--<![endif]-->
<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2">
<tbody>
<tr>
<td style="background: #F2F2F2;" align="center" bgcolor="#F2F2F2"><!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" bgcolor="#F2F2F2" width="660">
                <tr>
                    <td align="center" valign="top" width="660">
            <![endif]-->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">
<tbody>
<tr>
<td align="center" bgcolor="#F2F2F2">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="logo-padding" style="padding: 20px 0px 18px 5px;" align="left"><a href="https://www.namecheap.com?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=header_logo&amp;utm_campaign=hostvpswelcome_ur" target="_blank"><img class="logo" style="color: #de3723; font-family: Helvetica, Arial, sans-serif; font-size: 16px; display: block; text-align: left;" src="http://mktg.namecheap.com/assets/common/logos/Namecheap-Logo-240x40px.png" alt="Namecheap" width="220" height="40" border="0" /></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- HERO START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="text-align: center; background-image: url('http://mktg.namecheap.com/product/shared_hosting/welcome/assets/img_hosting_bg.jpg'); background-color: #000634; background-position: center !important; background-size: cover !important;" valign="middle"><!--[if gte mso 9]>
                        <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
                                 style="border: 0; display: inline-block; width: 660px; height: 122px;"
                                 src="http://mktg.namecheap.com/product/shared_hosting/welcome/assets/img_hosting_bg.jpg"/>
                        <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
                                style="border: 0; display: inline-block; position: absolute; width: 660px; height: 122px;">
                            <v:fill opacity="0%" color="#FFFFFF"/>
                        <![endif]-->
<div><!--[if mso]>
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center"
                                   width="660">
                                <tr>
                                    <td align="center" valign="top" width="660">
                            <![endif]-->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0">
<tbody>
<tr>
<td class="header" style="color: #ffffff; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 600; padding: 40px 0px 40px 0px;" align="center"><span class="fo">Welcome to Namecheap Hosting</span></td>
</tr>
</tbody>
</table>
<!--[if mso]>
                            </td>
                            </tr>
                            </table>
                            <![endif]--></div>
<!--[if gte mso 9]>
                        </v:fill>
                        </v:rect>
                        </v:image>
                        <![endif]--></td>
</tr>
</tbody>
</table>
<!-- INTRO START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 30px 40px 20px 40px;" align="left">Hi Anshul,</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 30px 40px;" align="left">Great news! Your VPS (Virtual Private Server) with Namecheap has been activated and is currently being set up. The following email contains all of the information you need to access and start using your VPS. Happy&nbsp;Hosting!</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- PACKAGE START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 30px 40px 0px 40px;" align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 25px 25px 0px 25px;" bgcolor="#EEEEEE">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-bottom: 1px solid #DDDDDD; color: #333333; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 600; line-height: 24px; margin: 0; text-align: center; padding: 0px 0px 15px 0px;" align="center"><span class="fo">Hosting package details</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center"></td>
</tr>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 25px 0px 10px 0px;" align="left" width="35%">Hosting plan</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 25px 0px 10px 10px;" align="left" width="65%">VPS Pulsar</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Management</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">User-Responsible</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Host Name</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">sayutel.com</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Start date</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">April 5, 2025</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">IP addresses</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">209.74.79.245</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Operating system</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">AlmaLinux 8 Blank 64 Bit</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Control panel</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">None</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 25px 0px;" align="left" width="35%">Softaculous license</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 25px 10px;" align="left" width="65%">None</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 25px 40px 25px 40px;" align="left">You can manage your hosting package in your Namecheap <a style="color: #dd3826; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; text-decoration: none;" href="https://ap.www.namecheap.com/?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_account&amp;utm_campaign=hostvpswelcome_ur" target="_blank">Account Panel</a>.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
<!-- MANAGEMENT PLATFORM START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 30px 40px 30px 40px;" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 25px 25px 0px 25px;" align="center" bgcolor="#EEEEEE">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-bottom: 1px solid #DDDDDD; color: #333333; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 600; line-height: 24px; margin: 0; text-align: center; padding: 0px 0px 15px 0px;" align="center"><span class="fo">VPS management platform</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0; vertical-align: top; width: 35%; padding: 25px 0px 10px 0px;" align="left" width="35%">URL</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0; vertical-align: top; width: 65%; padding: 25px 0px 10px 10px;" align="left" width="65%"><a style="color: #666666; text-decoration: none;" href="https://vpspanel.web-hosting.com">https://vpspanel.web-hosting.com</a></td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Username</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">u_2066016</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; width: 35%; vertical-align: top; padding: 10px 0px 25px 0px;" align="left" width="35%">Password</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 25px 10px;" align="left" width="65%">X2FtDBJsR1DwlDdaSz</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- SSH START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-weight: bold; line-height: 28px; padding: 30px 40px 30px 40px;" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 25px 25px 0px 25px;" align="center" bgcolor="#EEEEEE">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-bottom: 1px solid #DDDDDD; color: #333333; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 600; line-height: 24px; margin: 0; text-align: center; padding: 0px 0px 15px 0px;" align="center"><span class="fo">SSH login (root&nbsp;access)</span></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0; padding: 25px 0px 0px 0px;" align="left"><strong>Note:</strong> This is a temporary root password, meaning you must change it when you first log in. We strongly recommend that you change your passwords on a regular basis to keep your account safe and secure.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0; vertical-align: top; width: 35%; padding: 25px 0px 10px 0px;" align="left" width="35%">IP address</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0; vertical-align: top; width: 65%; padding: 25px 0px 10px 10px;" align="left" width="65%">209.74.79.245</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Port</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">22</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 10px 0px;" align="left" width="35%">Username</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 10px 10px;" align="left" width="65%">root</td>
</tr>
<tr>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 26px; margin: 0px; vertical-align: top; width: 35%; padding: 10px 0px 25px 0px;" align="left" width="35%">Password</td>
<td style="color: #666666; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 300; line-height: 26px; margin: 0px; vertical-align: top; width: 65%; padding: 10px 0px 25px 10px;" align="left" width="65%">ZI9gLfmj426o2UPJa9</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
 <!-- WEBUZO START --> <!--  --> <!-- Interworx START -->  <!-- QUESTIONS DETAILS -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-weight: bold; line-height: 28px; padding: 30px 40px 20px 40px;" align="left">Have questions or need support?</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left">Our VPS customers with User-Responsible Management have access to a wide range of guides and tutorials, designed to help you run and manage your VPS:</td>
</tr>
<tr>
<td style="padding: 0px 40px 0px 40px;" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #dd3826; font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 30px; padding: 0px 0px 0px 0px; width: 25px;" align="left" valign="top">&bull;</td>
<td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; line-height: 28px; padding: 0px 0px 5px 0px;" align="left" valign="top"><a style="color: #6d6e70; font-weight: 500; text-decoration: none;" href="https://www.namecheap.com/support/knowledgebase/article.aspx/917/50/vps-quick-start-guide?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_vpsstartguide&amp;utm_campaign=hostvpswelcome_ur" target="_blank">VPS Getting Started Guide&nbsp;&rarr;</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 0px 40px 0px 40px;" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #dd3826; font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 30px; padding: 0px 0px 0px 0px; width: 25px;" align="left" valign="top">&bull;</td>
<td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; line-height: 28px; padding: 0px 0px 5px 0px;" align="left" valign="top"><a style="color: #6d6e70; font-weight: 500; text-decoration: none;" href="https://www.namecheap.com/support/knowledgebase/article.aspx/9974/48/how-to-manage-your-vps-with-solusvm-for-kvm?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_solusvmguide&amp;utm_campaign=hostvpswelcome_ur" target="_blank">SolusVM Guide&nbsp;&rarr;</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 0px 40px 0px 40px;" align="left">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #dd3826; font-family: Arial, Helvetica, sans-serif; font-size: 30px; line-height: 30px; padding: 0px 0px 0px 0px; width: 25px;" align="left" valign="top">&bull;</td>
<td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; line-height: 28px; padding: 0px 0px 20px 0px;" align="left" valign="top"><a style="color: #6d6e70; font-weight: 500; text-decoration: none;" href="https://www.namecheap.com/support/knowledgebase/subcategory.aspx/48/vps?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_vpskbarea&amp;utm_campaign=hostvpswelcome_ur" target="_blank">VPS Knowledgebase Area&nbsp;&rarr;</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left">As a VPS customer with User-Responsible Management, you are entirely responsible for maintaining and supporting your own VPS. If you require any technical assistance, please create a ticket through our <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="https://support.namecheap.com/index.php?/Tickets/Submit&amp;utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_support&amp;utm_campaign=hostvpswelcome_ur" target="_blank">Support Portal</a> using the Hosting <strong>(VPS and Dedicated Servers)</strong> category. Please note that any technical service will include a fee. To learn more about the different types of Server Management we offer, please view <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="https://www.namecheap.com/support/knowledgebase/article.aspx/9304/48/what-vps-management-options-do-you-provide?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_planoption&amp;utm_campaign=hostvpswelcome_ur" target="_blank">our&nbsp;options</a>.</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left">Keep in mind that we will announce any maintenance (scheduled or emergency) on our <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="https://www.namecheap.com/status-updates/?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_status&amp;utm_campaign=hostvpswelcome_ur" target="_blank">status blog</a>. To stay up-to-date with the most recent news, we advise you to subscribe to one of our categories (for example, Web&nbsp;Hosting).</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left">We also suggest you familiarize yourself with our <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="http://www.namecheap.com/legal/hosting/aup.aspx?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_accusepol&amp;utm_campaign=hostvpswelcome_ur" target="_blank">Acceptable Use Policy</a> and <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="https://www.namecheap.com/support/knowledgebase/subcategory/7/billing-faq?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=link_billingpol&amp;utm_campaign=hostvpswelcome_ur" target="_blank">Hosting Billing Policies</a>.</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 30px 40px;" align="left">If you have any feedback or suggestions, please contact us at <a style="color: #dd3826; font-weight: bold; text-decoration: none;" href="mailto:hostingfeedback@namecheap.com" target="_blank">hostingfeedback@namecheap.com</a>. Additionally, feel free to refer to this email if you are unable to find an answer through our regular support channels or if you need to quickly escalate a ticket or issue.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
<!-- CHAT START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#FFFFFF">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-weight: bold; line-height: 28px; padding: 30px 40px 20px 40px;" align="left">Need more help?</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left">If you have any questions about your new hosting package, or if you'd like to discuss anything else, our 24/7 Customer Service Team is here to help.</td>
</tr>
<tr>
<td class="button" style="padding: 0px 20px 30px 20px;" align="center">
<table border="0" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td style="-webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;" align="center" bgcolor="#FD4F00"><a style="background: #FD4F00; background-image: linear-gradient(to bottom, #FD4F00, #E03821); -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; border: 1px solid #E0452F; color: #ffffff; display: inline-block; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-weight: 500; text-decoration: none; padding: 10px 18px 10px 18px;" href="https://www.namecheap.com/support/live-chat/hosting.aspx?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=butt_chat&amp;utm_campaign=hostvpswelcome_ur" target="_blank">Chat with a Live Person</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td style="padding: 4px 4px 4px 4px;" align="center" bgcolor="#F2F2F2">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!-- SIGNATURE START -->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" bgcolor="#F2F2F2">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 20px 40px;" align="left" bgcolor="#F2F2F2">We thank you for choosing Namecheap for all your hosting needs. We wish you a smooth start!</td>
</tr>
<tr>
<td style="color: #6d6e70; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-weight: 500; line-height: 28px; padding: 0px 40px 40px 40px;" align="left" bgcolor="#F2F2F2">Best regards<br />Team Namecheap</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]--> <!-- FOOTER START -->
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-top: 1px dotted #DADADA;" align="center" bgcolor="#F2F2F2"><!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="660">
                            <tr>
                                <td align="center" valign="top" width="660">
                        <![endif]-->
<table class="fluid" style="max-width: 660px;" width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="footer" style="color: #7f8c8d; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 18px; padding: 25px 20px 0px 40px;" align="left" bgcolor="#F2F2F2">
<table class="fluid" border="0" cellspacing="0" cellpadding="0" align="left">
<tbody>
<tr>
<td align="left" valign="top"><a href="https://www.namecheap.com?utm_source=ubersmith&amp;utm_medium=email&amp;utm_content=footer_logo&amp;utm_campaign=hostvpswelcome_ur" target="_blank"><img style="color: #6d6e70; display: block; font-family: Arial, Helvetica, sans-serif; font-size: 16px; height: 36px; width: 200px;" src="http://mktg.namecheap.com/newsletter/2017/may/assets/nc-logo-footer.png" alt="Namecheap" width="200" height="36" border="0" /></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="footer" style="padding: 20px 40px 20px 40px;" align="center" bgcolor="#F2F2F2">
<table class="fluid" border="0" cellspacing="0" cellpadding="0" align="left">
<tbody>
<tr>
<td style="color: #979797; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 300; line-height: 16px; text-align: left; padding: 0px 0px 0px 0px;" align="left" valign="top"><a style="color: #999999; text-decoration: none;">4600 East Washington Street, Suite 305, Phoenix, AZ 85034, USA</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]--></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>

<img src="http://mailtrackemailout1.namecheap.com/wf/open?upn=u001.0D4uYOvNJPqCOK0MGUBfZRh8XncH5BNg0fhV-2BURT-2Bp3Y9Id-2BQOfuv09nc6fquca5UJFWajKUWHGArd2JDP1Vj9nBGVYwWQQGGoxlpIlk55k-2BIFPkwPXdtjRHBmcxmfehqBK6st-2BuybJ5rJmkfJ4UO57cypaz1crHvY5bDBQA8HjdW5Nrg1Z0SZmznEWtkAZjQSMLJxtDR6HCtGHLTwHGsA-3D-3D" alt="" width="1" height="1" border="0" style="height:1px !important;width:1px !important;border-width:0 !important;margin-top:0 !important;margin-bottom:0 !important;margin-right:0 !important;margin-left:0 !important;padding-top:0 !important;padding-bottom:0 !important;padding-right:0 !important;padding-left:0 !important;"/>
`

export {publicKey, symm, symmRev, emailPat, testHTML};